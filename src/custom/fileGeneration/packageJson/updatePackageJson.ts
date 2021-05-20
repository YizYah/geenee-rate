import {mergePackageJsons} from "./mergePackageJsons";
const fs = require('fs-extra')

export async function updatePackageJson(
  codeDir: string, starter: string, packageInfoJson: any
) {
  const codePackageJsonPath = `${codeDir}/package.json`
  let codePackageJson: any = {}
  if (await fs.pathExists(codePackageJsonPath)) {
    codePackageJson = await fs.readJson(codePackageJsonPath)
  }

  const starterPackageJsonPath = `${starter}/package.json`
  let starterPackageJson: any = {}
  if (await fs.pathExists(starterPackageJsonPath)) {
    starterPackageJson = await fs.readJson(starterPackageJsonPath)
  }

  const finalPackageJson = mergePackageJsons(
      codePackageJson,
      starterPackageJson,
      packageInfoJson
  )

  await fs.writeJson(
      codePackageJsonPath, finalPackageJson, {spaces: 2}
  )

  return finalPackageJson
}
