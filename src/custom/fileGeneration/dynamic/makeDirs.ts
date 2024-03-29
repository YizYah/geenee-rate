const {dirOptions} = require('magicalstrings').dirOptions

const fs = require('fs-extra')

async function makeDir(dirName: string) {
  try {
    await fs.ensureDir(dirName, dirOptions)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export async function makeDirs(dirList: string[]) {
  await Promise.all(dirList.map(item => makeDir(item)))
}
