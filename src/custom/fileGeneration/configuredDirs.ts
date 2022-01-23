import {unitNameFromSpec} from './unitNameFromSpec'
import {Configuration} from 'cogs-box'
const {fileOptions} = require('magicalstrings').constants.fileOptions

const fs = require('fs-extra')

export async function configuredDirs(
  config: Configuration,
  codeDir: string,
  units: string[],
) {
  const {dirs} = config
  await Promise.all(Object.keys(dirs).map(async name => {
    const dir = `${codeDir}/${dirs[name]}`
    try {
      await fs.ensureDir(dir, fileOptions)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },))

  await Promise.all(units.map(async function (unitKey) {
    const unit = unitNameFromSpec(unitKey)
    const dir = `${codeDir}/${config.dirs.components}/${unit}`
    try {
      await fs.ensureDir(dir, fileOptions)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },))
}
