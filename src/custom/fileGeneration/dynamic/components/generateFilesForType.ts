const {nodeTypes} = require('magicalstrings').constants
import {BoilerPlateInfoType, NsInfo, SourceInfo, Schema} from 'magicalstrings'
import {generateTypeFile} from './generateTypeFile'
import {Configuration} from 'cogs-box'

export async function generateFilesForType(
  appInfo: NsInfo,
  schema: Schema,
  type: string,
  unit: string,
  selectionRoot: string,
  root: string,
  sourceInfo: SourceInfo,
  highestLevel: string,
  templateDir: string,
  compDir: string,
  config: Configuration,
) {
  const {dataFunctionTypes} = config

  const typeInfo = schema.types[type]
  const typeUnitInfo = typeInfo.sources[unit]
  const {assnType, sourceUnit} = typeUnitInfo
  let {nodeType} = typeUnitInfo
  const {dataType} = typeInfo

  if (selectionRoot === type) nodeType = nodeTypes.ROOT

  const componentType = typeUnitInfo.assnType

  // NOTE: disabled for now.
  // if (type === root && type !== sourceInfo.selectedTree[highestLevel][0]) {
  //   // this is the root, being used as the highest level component even though
  //   // it is not selected.  Therefore, it must be treated as a grouping in order to
  //   // show a list of true highest level components.
  //   componentType = formTypes.SINGLE_INSTANCE
  //   dataType = dataTypes.GROUPING
  //   nodeType = nodeTypes.ROOT
  // }

  // TODO: need to confirm that this is correct.  Especially the component type.
  if (sourceUnit) {
    const selectionBoilerPlateInfo: BoilerPlateInfoType = {
      componentType,
      dataType,
      nodeType: nodeTypes.SELECTABLE,
    }
    await generateTypeFile(
      type,
      sourceUnit,
      selectionBoilerPlateInfo,
      appInfo,
      schema,
      templateDir,
      compDir,
      config,
    )
  }

  const {components} = dataFunctionTypes[assnType]
  if (!components) return

  await Promise.all(components.map(async (componentType: string) => {
    const boilerPlateInfo: BoilerPlateInfoType = {
      componentType,
      dataType,
      nodeType,
    }

    await generateTypeFile(
      type,
      unit,
      boilerPlateInfo,
      appInfo,
      schema,
      templateDir,
      compDir,
      config,
    )
  }))

  // await generateTypeFile(
  //   type,
  //   source,
  //   boilerPlateInfo,
  //   appInfo,
  //   schema,
  //   templateDir,
  //   compDir
  // )
  //
  // // if (assnType !== associationTypes.SINGLE_REQUIRED) {
  // //   const creationBoilerPlateInfo = {
  // //     formType: formTypes.CREATION,
  // //     dataType,
  // //     nodeType,
  // //   }
  // //
  //   await generateTypeFile(
  //     type,
  //     source,
  //     creationBoilerPlateInfo,
  //     appInfo,
  //     schema,
  //     templateDir,
  //     compDir
  //   )
  //
  //   const singularBoilerPlateInfo = {
  //     formType: formTypes.LIST,
  //     dataType,
  //     nodeType,
  //   }
  //   await generateTypeFile(
  //     type,
  //     source,
  //     singularBoilerPlateInfo,
  //     appInfo,
  //     schema,
  //     templateDir,
  //     compDir
  //   )
  // }
}
