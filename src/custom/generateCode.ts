import {NsInfo, Schema} from 'magicalstrings'
import {Configuration} from 'cogs-box'

import {getPackageInfoJson} from './fileGeneration/packageJson/getPackageInfoJson'
import {configuredDirs} from './fileGeneration/configuredDirs'
import {dynamicFiles} from './fileGeneration/dynamic/dynamicFiles'
import {standardFiles} from './fileGeneration/standard/standardFiles'
import {staticFiles} from './fileGeneration/static/staticFiles'
import {generateAppTypeFiles} from './fileGeneration/dynamic/components/generateAppTypeFiles'
import {updatePackageJson} from './fileGeneration/packageJson/updatePackageJson'
import {buildSchema} from './schema/buildSchema'
import * as path from 'path';

const createStarter = require('head-starter')
const {getConfig} = require('cogs-box')

export async function generateCode(
  codeDir: string,
  nsInfo: NsInfo,
  config: Configuration,
  templateDir: string,
  addStarter = true,
  sessionIn: any = {},
) {
  const session = { ...sessionIn, codeDir}
  const {userClass, units} = nsInfo

  const stackInfo: Schema = await buildSchema(nsInfo, config)
  const finalTemplateDir = path.resolve(templateDir)

  if (addStarter) {
    const config: Configuration = await getConfig(templateDir)
    const {setupSequence} = config
    await createStarter(
      setupSequence, codeDir, session
    )
  }

  console.log('running locally geenee-rate...')

  try {
    await standardFiles(
      finalTemplateDir, codeDir, nsInfo, stackInfo
    )
  } catch (error) {
    throw new Error(`error in creating standard files: ${error}`)
  }

  try {
    if (units) {
      await configuredDirs(
        config, codeDir, Object.keys(units)
      )
    }
  } catch (error) {
    throw new Error(`error in creating configured dirs: ${error}`)
  }

  // mapObject
  if (units) {
    await dynamicFiles(
      config, nsInfo, codeDir
    )
  }

  const compDir = `${codeDir}/${config.dirs.components}`

  try {
    await generateAppTypeFiles(
      userClass,
      nsInfo,
      stackInfo,
      finalTemplateDir,
      compDir,
      config
    )
  } catch (error) {
    throw error
  }

  try {
    await staticFiles(
      finalTemplateDir,
      codeDir,
      nsInfo,
      stackInfo,
      config,
    )
  } catch (error) {
    throw error
  }

  try {
    // const stackInfo: Schema = await buildSchema(nsInfo, config)
    const packageInfoJson = await getPackageInfoJson(
      finalTemplateDir,
      codeDir,
      nsInfo,
      config,
    )
    await updatePackageJson(
      codeDir, codeDir, packageInfoJson
    )
  } catch (error) {
    throw new Error(`could not build json: ${error}`)
  }


  // // '--end-of-line auto',
  // // '--trailing-comma es5',
  // const prettierArgs = [
  //   'prettier',
  //   '--single-quote',
  //   '--jsx-single-quote',
  //   // '--trailing-comma es5',
  //   '--write',
  //   `${codeDir}/src/**/*.{js,jsx}`,
  // ]
  //
  // try {
  //   await execa('npx', prettierArgs)
  // } catch (error) {
  //   throw error
  // }
}
