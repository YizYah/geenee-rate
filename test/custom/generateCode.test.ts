import test from 'ava'

import {generateCode} from '../../src/custom/generateCode'
import {getConfig} from 'cogs-box'
const mockFs = require('mock-fs')
const {getNsInfo} = require('magicalstrings').nsFiles
const fs = require('fs-extra')
const path = require('path')

test('check Config', async t => {
  const SAMPLE_CODE = 'sampleCode'
  const TEMPLATE = 'template'
  const codeDir = __dirname + '/' + SAMPLE_CODE
  const nsInfo = await getNsInfo(codeDir)
  const templateDir = __dirname + '/' + TEMPLATE
  const extraPackageJson = __dirname + '/extraPackage.json'
  const config = await getConfig(templateDir)




  // let error = await t.throwsAsync(async () => {
  //   await getConfig(__dirname + 'faultyTemplate')
  // })
  // t.regex(error.message, /no such file/)
  //
  //
  //

  mockFs({
    [SAMPLE_CODE]: mockFs.load(codeDir),
    [TEMPLATE]: mockFs.load(templateDir),
    'extraPackage.json': mockFs.load(extraPackageJson),
    'node_modules': mockFs.load(path.resolve(__dirname, '../../node_modules')),
  })

  // fs.readdir(SAMPLE_CODE + '/meta', (err: any, files: any) => {
  //   files.forEach((file: any) => {
  //     console.log(file);
  //   });
  // });

  // const newCustomJsonBefore = await fs.readJson(SAMPLE_CODE+ '/meta/customCode.json')
  // console.log(`newCustomJsonBefore.addedCode=${JSON.stringify(newCustomJsonBefore.addedCode.standard['README.md'], null, 2)}`)

  // const tempFile = await fs.readFile(SAMPLE_CODE + '/temp.txt')
  // console.log(`tempFile=${tempFile}`)
  //

  // ensure that extra file exists
  let tempFileExists = await fs.pathExists(SAMPLE_CODE + '/temp.txt')
  t.true(tempFileExists)

  // ensure that new file does not exist
  let newFileExists = await fs.pathExists(SAMPLE_CODE + '/new.txt')
  t.false(newFileExists)

  await generateCode(
    SAMPLE_CODE, nsInfo, config, TEMPLATE,
  )

  // check whether new file created
  newFileExists = await fs.pathExists(SAMPLE_CODE + '/new.txt')
  t.true(newFileExists)

  // check whether json created
  newFileExists = await fs.pathExists(SAMPLE_CODE + '/package.json')
  t.true(newFileExists)

  // check whether the general package.json info copied over when there is no package.json
  let codeJson = await fs.readJson(SAMPLE_CODE + '/package.json')
  t.is(codeJson.addedKey, 'blah')

  // check whether the general package.json info replaces an existing one
  await fs.copy('extraPackage.json', SAMPLE_CODE + '/package.json')  //replace json file
  await generateCode(
    SAMPLE_CODE, nsInfo, config, TEMPLATE,
  )
  codeJson = await fs.readJson(SAMPLE_CODE + '/package.json')
  t.is(codeJson.addedKey, 'blah')
  t.is(codeJson.nonReplacedKey, 'nonReplacedValue')

  console.log(`final json is: ${JSON.stringify(codeJson, null, 2)}`)



  // const newCustomJson = await fs.readJson(SAMPLE_CODE+ '/meta/customCode.json')
  // console.log(`newCustomJson=${JSON.stringify(newCustomJson.addedCode.standard['README.md'], null, 2)}`)


  //
  // await setConfig(mockTemplateDir, config)
  // const config2 = await getConfig(mockTemplateDir)
  // t.is(config2.name, 'testConfig')
  //
  // error = await t.throwsAsync(async () => {
  //   const config3 = await getConfig(nonexistentDir)
  // })
  // t.regex(error.message, /no such file/)
  //
  // error = await t.throwsAsync(async () => {
  //   await setConfig(nonexistentDir, config)
  // })
  // t.regex(error.message, /no directory/)

  mockFs.restore()
});
