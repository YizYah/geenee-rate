// const {removeNpmDependencyPrefix} = require('magicalstrings').removeNpmDependencyPrefix

const fs = require('fs-extra')
const merge = require('deepmerge')
// const semverGt = require('semver/functions/gt')

export async function updatePackageJson(
  codeDir: string, starter: string, packageInfoJson: any
) {
  const codePackageJsonPath = `${codeDir}/package.json`

  if (await fs.pathExists(codePackageJsonPath)) {
    const codePackageJson = await fs.readJson(codePackageJsonPath)
    //
    // const starterPackageJsonPath = `${starter}/package.json`
    // const starterPackageJson = await fs.readJson(starterPackageJsonPath)
    //
    // const codeDependencies = codePackageJson.dependencies
    // const starterDependencies = starterPackageJson.dependencies
    // Object.keys(starterDependencies).map(dependencyFile => {
    //   const starterDependency = removeNpmDependencyPrefix(starterDependencies[dependencyFile])
    //   const codeDependency = removeNpmDependencyPrefix(codeDependencies[dependencyFile])
    //   if (codeDependency === '*') return
    //   if (!codeDependency || semverGt(starterDependency, codeDependency)) {
    //     codeDependencies[dependencyFile] = starterDependencies[dependencyFile]
    //   }
    // })
    //
    // const codeDevDependencies = codePackageJson.devDependencies
    // const starterDevDependencies = starterPackageJson.devDependencies
    // Object.keys(starterDevDependencies).map(dependencyFile => {
    //   const starterDependency = removeNpmDependencyPrefix(starterDevDependencies[dependencyFile])
    //   const codeDependency = removeNpmDependencyPrefix(codeDevDependencies[dependencyFile])
    //   if (codeDependency === '*') return
    //   if (!codeDependency || semverGt(starterDependency, codeDependency)) {
    //     codeDevDependencies[dependencyFile] = starterDevDependencies[dependencyFile]
    //   }
    // })

    const finalPackageJson = merge(codePackageJson, packageInfoJson)
    await fs.writeJson(
      codePackageJsonPath, finalPackageJson, {spaces: 2}
    )
    return finalPackageJson
  }
  await fs.writeJson(
    codePackageJsonPath, packageInfoJson, {spaces: 2}
  )
}
