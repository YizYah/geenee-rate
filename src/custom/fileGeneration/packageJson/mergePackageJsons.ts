const semverGt = require('semver/functions/gt')
const {removeNpmDependencyPrefix} = require('magicalstrings').removeNpmDependencyPrefix

export function mergePackageJsons(codePackageJson: any, starterPackageJson: any, packageInfoJson: any) {
    if (Object.keys(codePackageJson).length > 0) {
        const codeDependencies = codePackageJson.dependencies
        const starterDependencies = starterPackageJson.dependencies
        if (starterDependencies) {
            Object.keys(starterDependencies).map(dependencyFile => {
                const starterDependency = removeNpmDependencyPrefix(starterDependencies[dependencyFile])
                if (codeDependencies) {
                    const codeDependency = removeNpmDependencyPrefix(codeDependencies[dependencyFile])
                    if (codeDependency === '*') return
                    if (!codeDependency ||
                        semverGt(starterDependency, codeDependency)) {
                        codeDependencies[dependencyFile] = starterDependencies[dependencyFile]
                    }
                } else {
                    codePackageJson.dependencies = {...starterPackageJson.dependencies}
                }
            })
        }

        const codeDevDependencies = codePackageJson.devDependencies
        const starterDevDependencies = starterPackageJson.devDependencies
        if (starterDevDependencies) {
            Object.keys(starterDevDependencies).map(dependencyFile => {
                const starterDependency = removeNpmDependencyPrefix(starterDevDependencies[dependencyFile])
                if (codeDevDependencies) {
                    const codeDependency = removeNpmDependencyPrefix(codeDevDependencies[dependencyFile])
                    if (codeDependency === '*') return
                    if (!codeDependency || semverGt(starterDependency, codeDependency)) {
                        codeDevDependencies[dependencyFile] = starterDevDependencies[dependencyFile]
                    }
                } else {
                    codePackageJson.devDependencies = {...starterPackageJson.devDependencies}
                }
            })
        }
    } else {
        codePackageJson = {...starterPackageJson}
    }

    const finalPackageJson = {...codePackageJson, ...packageInfoJson}
    return finalPackageJson
}
