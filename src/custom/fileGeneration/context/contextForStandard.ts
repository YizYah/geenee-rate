import {NsInfo, BackendIdList} from 'magicalstrings'
import {Schema} from 'magicalstrings'
import {createGeneralInfo} from './createGeneralInfo'
import {Configuration} from 'cogs-box'

const {dataTypes, nodeTypes, magicStrings, links} = require('magicalstrings').constants
const {
  allCaps,
  pluralLowercaseName,
  singularLowercaseName,
  pluralName,
  singularName,
}  = require('magicalstrings').inflections
const Handlebars = require('handlebars')
const fileInfoString = Handlebars.compile('unit: {{unitName}}, comp: {{component}}')


export const contextForStandard = async (
  nsInfo: NsInfo,
  stackInfo: Schema,
  component: string,
  codeDir: string,
  config: Configuration,
) => {
  // stack data
  const unit = magicStrings.STANDARD_UNIT

  const names = {
    singular: singularName(component),
    singularLowercase: singularLowercaseName(component),
    plural: pluralName(component),
    pluralLowercase: pluralLowercaseName(singularLowercaseName(component)),
    component,
  }

  const sourceList = Object.keys(stackInfo.sources).map(sourceName => {
    const currentSourceInfo = stackInfo.sources[sourceName]
    return {
      sourceConst: currentSourceInfo.const,
      sourceId: currentSourceInfo.id,
    }
  })

  let typeIds: BackendIdList
  if (nsInfo.backend && nsInfo.backend.ids && nsInfo.backend.ids.types)
    typeIds = nsInfo.backend.ids.types
  const typesText = Object.keys(stackInfo.types).map(typeName => {
    return {
      typeConst: `TYPE_${allCaps(typeName)}_ID`,
      typeId: typeIds ? typeIds[typeName] : undefined,
    }
  })

  // previously hard-coded: const topUnit = singularName(appInfo.topUnits[0])
  const userClass = nsInfo.userClass
  const userTypeId = `TYPE_${allCaps(userClass)}_ID`

  // content
  const fileInfo = fileInfoString({
    unitName: unit,
    component: names.component,
  })

  // const tempDetails = fileInfoString({
  //   unitName: unit,
  //   component: names.component,
  // }) + ', loc:'
  let general: any = {}
  try {
    general = await createGeneralInfo(nsInfo, codeDir)

  } catch (error) {
    throw new Error(`couldn't create General Info: ${error}`)
  }

  const nsFlipDocumentation = links.DOCUMENTATION

  return {
    nsFlipDocumentation,
    nodeTypes,
    dataTypes,
    names,
    fileInfo,
    // topUnit,
    userTypeId,
    appName: nsInfo.codeName,
    sources: sourceList,
    types: typesText,
    actionTypes: stackInfo.context?.actionTypes,
    stackInfo,
    nsInfo,
    general,
    config,
  }
}
