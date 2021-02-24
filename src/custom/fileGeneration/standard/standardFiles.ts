const {standardIgnored} = require('magicalstrings').constants
import {NsInfo}  from 'magicalstrings'
import {Schema} from 'magicalstrings'
import {contextForStandard} from './contextForStandard'
import {loadFileTemplate} from '../../handlebars/loadFileTemplate'
import {registerHelpers} from '../../handlebars/registerHelpers'
import {registerPartials} from '../../handlebars/registerPartials'
import {replaceCommentDelimiters} from '../delimiters/replaceCommentDelimiters'
const getConfig = require('magicalstrings').configs.getConfig
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

  try {
    await registerPartials(`${templateDir}/partials`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    throw new Error(`error registering the partials at ${templateDir}.
It may be that the template location is faulty, or that the template is not
correctly specified:
${error}`)
  }

  try {
    await registerHelpers(`${templateDir}/helpers`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    throw new Error(`error registering the helpers at ${templateDir}.
It may be that the template location is faulty, or that the template is not
correctly specified:
${error}`)
  }

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

    const fileTemplate = await loadFileTemplate(pathString, config)
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
