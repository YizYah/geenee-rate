const {loadFileTemplate} = require('barbells')
const {fileNames} = require('magicalstrings').constants
import {contextForStandard} from '../../context/contextForStandard'
import {NsInfo}  from 'magicalstrings'
import {Schema} from 'magicalstrings'
import {Configuration} from 'cogs-box'

const {prepareHandlebars} = require('barbells')
const fs = require('fs-extra')

export async function getPackageInfoJson(
  templateDir: string,
  codeDir: string,
  nsInfo: NsInfo,
  // stackInfo: Schema,
  config: Configuration,
) {
  const Handlebars = await prepareHandlebars(templateDir)
  const packageInfoJsonFile = `${templateDir}/general/${fileNames.PACKAGE_INFO}`
  if (!await fs.pathExists(packageInfoJsonFile)) return {}
//   try {
//     await registerPartials(`${templateDir}/partials`)
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log(error)
//     throw new Error(`error registering the partials at ${templateDir}.
// It may be that the template location is faulty, or that the template is not
// correctly specified:
// ${error}`)
//   }

  const emptyStackInfo: Schema = {
    topSource: '',
    userClasses: {},
    sources: {},
    types: {},
    actions: {},
  }

//   try {
//     await registerHelpers(`${templateDir}/helpers`)
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log(error)
//     throw new Error(`error registering the helpers at ${templateDir}.
// It may be that the template location is faulty, or that the template is not
// correctly specified:
// ${error}`)
//   }

  const fileTemplate = await loadFileTemplate(
    packageInfoJsonFile, Handlebars, config.format.customFileFilter, true,
  )

  const fileText = await fileTemplate(await contextForStandard(
    nsInfo,
    emptyStackInfo,
    'package.json',
    codeDir,
    config,
  ))
  return JSON.parse(fileText)
}
