const semverGt = require('semver/functions/gt')
const {removeNpmDependencyPrefix} = require('magicalstrings').removeNpmDependencyPrefix

export function mergePackageJsons(codePackageJson: any, starterPackageJson: any, packageInfoJson: any) {
  if (Object.keys(codePackageJson).length > 0) {
    const codeDependencies = codePackageJson.dependencies
    const starterDependencies = starterPackageJson.dependencies
    Object.keys(starterDependencies).map(dependencyFile => {
      const starterDependency = removeNpmDependencyPrefix(starterDependencies[dependencyFile])
      const codeDependency = removeNpmDependencyPrefix(codeDependencies[dependencyFile])
      if (codeDependency === '*') return
      if (!codeDependency || semverGt(starterDependency, codeDependency)) {
        codeDependencies[dependencyFile] = starterDependencies[dependencyFile]
      }
    })

    const codeDevDependencies = codePackageJson.devDependencies
    const starterDevDependencies = starterPackageJson.devDependencies
    Object.keys(starterDevDependencies).map(dependencyFile => {
      const starterDependency = removeNpmDependencyPrefix(starterDevDependencies[dependencyFile])
      const codeDependency = removeNpmDependencyPrefix(codeDevDependencies[dependencyFile])
      if (codeDependency === '*') return
      if (!codeDependency || semverGt(starterDependency, codeDependency)) {
        codeDevDependencies[dependencyFile] = starterDevDependencies[dependencyFile]
      }
    })
  } else {
    codePackageJson = {...starterPackageJson}
  }

  const finalPackageJson = {...codePackageJson, ...packageInfoJson}
  return finalPackageJson
}
