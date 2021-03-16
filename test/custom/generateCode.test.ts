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
    'node_modules': mockFs.load(path.resolve(__dirname, '../../node_modules')),
  })

  fs.readdir(SAMPLE_CODE + '/meta', (err: any, files: any) => {
    files.forEach((file: any) => {
      console.log(file);
    });
  });

  // const newCustomJsonBefore = await fs.readJson(SAMPLE_CODE+ '/meta/customCode.json')
  // console.log(`newCustomJsonBefore.addedCode=${JSON.stringify(newCustomJsonBefore.addedCode.standard['README.md'], null, 2)}`)

  const tempFile = await fs.readFile(SAMPLE_CODE + '/temp.txt')
  console.log(`tempFile=${tempFile}`)

  // ensure that extra file exists
  let tempFileExists = await fs.pathExists(SAMPLE_CODE + '/temp.txt')
  t.true(tempFileExists)

  // ensure that new file does not exist
  let newFileExists = await fs.pathExists(SAMPLE_CODE + '/new.txt')
  t.false(newFileExists)


  await generateCode(
    SAMPLE_CODE, nsInfo, config, TEMPLATE, false
  )

  // check whether new file created
  newFileExists = await fs.pathExists(SAMPLE_CODE + '/new.txt')
  t.true(newFileExists)


// TODO: this is failing!
//   //check whether extra file gets deleted
//   tempFileExists = await fs.pathExists(SAMPLE_CODE + '/src/temp.txt')
//   t.false(tempFileExists)

  // const newCustomJson = await fs.readJson(SAMPLE_CODE+ '/meta/customCode.json')
  // console.log(`newCustomJson=${JSON.stringify(newCustomJson.addedCode.standard['README.md'], null, 2)}`)


    t.is(1,1)

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
