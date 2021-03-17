import {NsInfo}  from 'magicalstrings'
import {Schema} from 'magicalstrings'
const {loadFileTemplate} = require('barbells')
import {Configuration} from 'cogs-box'
const {placeholders} = require('magicalstrings').constants
import {contextForStatic} from '../../context/contextForStatic'
import {replaceCommentDelimiters} from '../delimiters/replaceCommentDelimiters'
const {prepareHandlebars} = require('barbells')

const fs = require('fs-extra')

export async function staticFiles(
  templateDir: string,
  codeDir: string,
  nsInfo: NsInfo,
  stackInfo: Schema,
  config: Configuration,
) {
  const staticInfo = nsInfo.static
  if (!staticInfo) return
  const staticTypesWithFiles = Object.keys(staticInfo)
  const Handlebars = await prepareHandlebars(templateDir)

  await Promise.all(staticTypesWithFiles.map(async (staticType: string) => {
    const staticTypeInfo = config.static[staticType]
    if (!staticTypeInfo) throw new Error(`app.yml refers to static type ${staticType} ` +
      'not defined in the template')
    const fileTypeList = Object.keys(staticTypeInfo.files)

    const instancesForType = staticInfo[staticType]
    const instanceNamesForType = Object.keys(instancesForType)

    instanceNamesForType.map(async instance => {
      const instanceInfo = instancesForType[instance]
      fileTypeList.map(async (fileType: string) => {
        const fileTypeInfo: any = staticTypeInfo.files[fileType]
        const {name, suffix, directory} = fileTypeInfo

        const pathString = `${templateDir}/static/${fileType}.hbs`

        try {
          const fileTemplate = await loadFileTemplate(pathString, Handlebars, config.format.customFileFilter)

          const {slug, specs} = instanceInfo
          const fileName = name.replace(placeholders.SLUG, slug) + suffix
          const fullFilePath = `${codeDir}/${directory}/${fileName}`

          const context = await contextForStatic(
            staticType, specs, slug, instance, fileName, nsInfo, config, codeDir
          )
          const fileText = await fileTemplate(context)
          const finalFileText = replaceCommentDelimiters(
            pathString, config, fileText
          )

          await fs.outputFile(fullFilePath, finalFileText)
        } catch (error) {
          throw new Error(`with pathString ${pathString}, could not generate static file: ${error}`)
        }
      })
    })
  }))
}
