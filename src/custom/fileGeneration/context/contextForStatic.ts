import {Configuration} from 'cogs-box'
import {NsInfo}  from 'magicalstrings'
const {pluralLowercaseName, pluralName, singularName} = require('magicalstrings').inflections
const {links} = require('magicalstrings').constants

import {createGeneralInfo} from './createGeneralInfo'

const Handlebars = require('handlebars')
const fileInfoString = Handlebars.compile('unit: {{unitName}}, comp: {{component}}')

export const contextForStatic = async (
  staticType: string,
  specs: any,
  slug: string,
  instance: string,
  fileName: string,
  nsInfo: NsInfo,
  config: Configuration,
  codeDir: string,
) => {
  const names = {
    singular: singularName(instance),
    singularLowercase: instance,
    plural: pluralName(instance),
    pluralLowercase: pluralLowercaseName(instance),
    staticType,
    component: fileName,
  }

  const fileInfo = fileInfoString({
    unitName: `static-${staticType}`,
    component: names.component,
  })

  const general = await createGeneralInfo(nsInfo, codeDir)

  const nsFlipDocumentation = links.DOCUMENTATION

  return {
    nsFlipDocumentation,
    specs,
    slug,
    names,
    fileInfo,
    nsInfo,
    config,
    general,
  }
}
