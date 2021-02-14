import {Configuration, NsInfo, Schema} from 'magicalstrings'
import {getPackageInfoJson} from './fileGeneration/packageJson/getPackageInfoJson'
import {configuredDirs} from './fileGeneration/configuredDirs'
import {dynamicFiles} from './fileGeneration/dynamic/dynamicFiles'
import {standardFiles} from './fileGeneration/standard/standardFiles'
import {staticFiles} from './fileGeneration/static/staticFiles'
import {generateAppTypeFiles} from './fileGeneration/dynamic/components/generateAppTypeFiles'
import {updatePackageJson} from './fileGeneration/packageJson/updatePackageJson'
import {buildSchema} from './schema/buildSchema'

export async function generateCode(
  codeDir: string,
  nsInfo: NsInfo,
  config: Configuration,
  templateDir: string,
) {
  const {userClass, units} = nsInfo
  const starter = `${codeDir}.starter`

  const stackInfo: Schema = await buildSchema(nsInfo, config)

  // console.log(`stacklocation=${codeDir}/stack.json`)
  // const stackInfo: Schema = await fs.readJSON(jsonPath) // await generateJSON.bind(this)(template, codeDir)

  // const metaDir = `${codeDir}/${dirNames.META}`
  // const templateDir = `${metaDir}/${dirNames.TEMPLATE}`

  try {
    await standardFiles(
      templateDir, codeDir, nsInfo, stackInfo
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
      templateDir,
      compDir,
      config
    )
  } catch (error) {
    throw error
  }

  try {
    await staticFiles(
      templateDir,
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
      templateDir,
      codeDir,
      nsInfo,
      config,
    )
    await updatePackageJson(
      codeDir, starter, packageInfoJson
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
