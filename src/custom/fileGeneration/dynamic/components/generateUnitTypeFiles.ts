const {unitTypes} = require('magicalstrings').constants
import {NsInfo}  from 'magicalstrings'
import {Schema} from 'magicalstrings'
import {generateFilesForType} from './generateFilesForType'
import {Configuration} from 'cogs-box'

export async function generateUnitTypeFiles(
  source: string,
  userClass: string,
  appInfo: NsInfo,
  stackInfo: Schema,
  templateDir: string,
  compDir: string,
  config: Configuration
) {
  const sources = stackInfo.sources
  const sourceInfo = sources[source]

  // const {owner} = sourceInfo
  // if (owner !== userClass) return

  try {
    const highestLevel = 'highestLevel'
    const selectedTree = {...sourceInfo.selectedTree}
    const highestLevelList = selectedTree[highestLevel]
    let selectionRoot = highestLevelList[0]
    const root = sourceInfo.root
    if (!root) throw new Error(`no root for source ${sourceInfo.name}`)
    if (highestLevelList.length > 1) {
      selectedTree[root] = highestLevelList
      sourceInfo.selectedTree[root] = highestLevelList
      selectionRoot = root
    }
    // @ts-ignore
    delete selectedTree[highestLevel]

    if (sourceInfo.unitType === unitTypes.DATA_SOURCE) return

    const selectedTreeTypes = Object.keys(selectedTree)

    let j
    for (j = 0; j < selectedTreeTypes.length; j++) {
      const type = selectedTreeTypes[j]
      // eslint-disable-next-line no-await-in-loop
      await generateFilesForType(
        appInfo,
        stackInfo,
        type,
        source,
        selectionRoot,
        root,
        sourceInfo,
        highestLevel,
        templateDir,
        compDir,
        config,
      )
    }

    // const joins = sourceInfo.joins;
    // if (joins) {
    //   for (j = 0; j < Object.keys(joins).length; j++) {
    //     const joinName = Object.keys(joins)[j];
    //     eslint - disable - next - line;
    //     no - await - in -loop;
    //     await generateFilesForType(currentStack, type, source, selectionRoot, root, sourceInfo, highestLevel);
    //   }
    // }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error(`error creating unit ${source}: ${error}`)
  }
}
