import {NsInfo, Schema} from 'magicalstrings'
import {Configuration} from 'cogs-box'

import {configuredDirs} from './fileGeneration/configuredDirs'
import {dynamicFiles} from './fileGeneration/dynamic/dynamicFiles'
import {standardFiles} from './fileGeneration/standard/standardFiles'
import {staticFiles} from './fileGeneration/static/staticFiles'
import {generateAppTypeFiles} from './fileGeneration/dynamic/components/generateAppTypeFiles'
const buildSchema = require('create-stack-info')
import * as path from 'path';
import {getPackageInfoJson} from './fileGeneration/packageJson/getPackageInfoJson'
import {updatePackageJson} from './fileGeneration/packageJson/updatePackageJson'

const createStarter = require('head-starter')
const {getConfig} = require('cogs-box')
const execa = require('execa')
const fs = require('fs-extra')

export async function generateCode(
  codeDir: string,
  nsInfo: NsInfo,
  config: Configuration,
  templateDir: string,
  addStarter = true,
  sessionIn: any = {},
  removeExistingStarter=true
) {
  const session = { ...sessionIn, codeDir}
  const {userClass, units} = nsInfo

  const stackInfo: Schema = await buildSchema(nsInfo, config)
  const finalTemplateDir = path.resolve(templateDir)

  if (addStarter) {
    const config: Configuration = await getConfig(templateDir)
    const {setupSequence} = config
    await createStarter(
      setupSequence, codeDir, session, removeExistingStarter
    )
  }

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
  try {
    if (await fs.pathExists(codeDir + '/package.json'))
      await execa('npm', ['install', '--prefix', codeDir])
  } catch (error) {
    throw error
  }
}
