const {prepareHandlebars} = require('barbells')
import {NsInfo, Schema} from 'magicalstrings'
import {contextForStandard} from '../context/contextForStandard'
const {loadFileTemplate} = require('barbells')
import {replaceCommentDelimiters} from '../delimiters/replaceCommentDelimiters'

const {standardIgnored} = require('magicalstrings').constants
const {getConfig} = require('cogs-box')
const {fileOptions} = require('magicalstrings').constants.fileOptions

const fs = require('fs-extra')
const path = require('path')
const walk = require('walkdir')

export async function standardFiles(
  templateDir: string,
  codeDir: string,
  nsInfo: NsInfo,
  stackInfo: Schema,
) {
  const standardDir = `${templateDir}/standard`
  const config = await getConfig(templateDir)
  const Handlebars = await prepareHandlebars(templateDir)

  const paths = walk.sync(standardDir, {return_object: true})
  await Promise.all(Object.keys(paths).map(async pathString => {
    const stat = paths[pathString]

    const localPath = pathString.replace(standardDir, '')
    if (localPath in standardIgnored) return

    const newPath = `${codeDir}${localPath}`

    if (stat.isDirectory()) {
      try {
        await fs.ensureDir(newPath, fileOptions)
      } catch (error) {
        throw error
      }
      return
    }

    const parsed = path.parse(newPath)
    const {ext} = parsed

    if (ext !== '.hbs') {
      // a literal file.  E.g. README.md.
      try {
        fs.copy(pathString, newPath)
      } catch (error) {
        throw new Error(`couldn't copy over file ${pathString}: ${error}`)
      }
      return
    }

    const fileTemplate = await loadFileTemplate(
      pathString, Handlebars, config.format.customFileFilter
    )
    const newFileName = path.join(parsed.dir, parsed.name)
    const newLocalFileName = newFileName.replace(codeDir + '/', '')

    const fileText = await fileTemplate(await contextForStandard(
      nsInfo,
      stackInfo,
      newLocalFileName,
      codeDir,
      config,
    ))
    const finalFileText = replaceCommentDelimiters(
      pathString, config, fileText
    )
    await fs.outputFile(newFileName, finalFileText)
  }))
}
