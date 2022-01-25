import {NsInfo}  from 'magicalstrings'

const fs = require('fs-extra')

export async function createGeneralInfo(nsInfo: NsInfo, codeDir: string) {
  let general: any = {}
  if (nsInfo.general)
    general = {...nsInfo.general}

  const codePackageJsonPath = `${codeDir}/package.json`
  if (await fs.pathExists(codePackageJsonPath)) {
    const codePackageJson = await fs.readJson(codePackageJsonPath)
    general.json = codePackageJson
  }

  general.static = nsInfo.static
  general.codeDir = codeDir
  return general
}
