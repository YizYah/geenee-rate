import test from 'ava'

import {getConfig} from 'cogs-box'
const mockFs = require('mock-fs')
const {getNsInfo} = require('magicalstrings').nsFiles
const fs = require('fs-extra')
const path = require('path')
const proxyquire =  require('proxyquire')
const {nsInfo} = require('./data/nsInfoStatic')

const fakeInstalledPackages: string[] = []

const SAMPLE_CODE = 'sampleCode'
const TEMPLATE = 'template'
const codeDir = __dirname + '/' + SAMPLE_CODE
const templateDir = __dirname + '/' + TEMPLATE
const dataDir = __dirname + '/data'
const staticCodeDir = __dirname + '/staticCodeDir'
const extraPackageJson = __dirname + '/extraPackage.json'

const execaFake = async (file: string, args: string[]) => {
  if (file==='npm' && args[0]==='install' && args[1]==='--prefix') {
    const codeDir=args[2]
    fakeInstalledPackages.push(codeDir + ' packages')
  }
}

// const standardFilesFake = async (finalTemplateDir, codeDir, nsInfo, stackInfo)=>{
//   if (
//     finalTemplateDir !== templateDir &&
//     codeDir !== __dirname + '/' + SAMPLE_CODE
//   )
//   throw new Error("parameters wrong for standardFiles");
  
// }

// import {generateCode} from '../../src/custom/generateCode'
const {generateCode} = proxyquire('../../src/custom/generateCode', {
  execa: execaFake,
  // standardFiles: standardFilesFake,
})


test.beforeEach(t => {
  mockFs({
    [codeDir]: mockFs.load(codeDir),
    [staticCodeDir]: mockFs.load(codeDir),
    [templateDir]: mockFs.load(templateDir),
    [dataDir]: mockFs.load(dataDir),
    'extraPackage.json': mockFs.load(extraPackageJson),
    'node_modules': mockFs.load(path.resolve(__dirname, '../../node_modules')),
  })

})

test.skip('copies files and installs', async t => {
  const config = await getConfig(templateDir)

  // const newCustomJsonBefore = await fs.readJson(SAMPLE_CODE+ '/meta/customCode.json')

  // const tempFile = await fs.readFile(SAMPLE_CODE + '/temp.txt')

  // ensure that extra file exists
  let tempFileExists = await fs.pathExists(codeDir + '/temp.txt')
  t.true(tempFileExists)

  // ensure that new file does not exist
  let newFileExists = await fs.pathExists(codeDir + '/new.txt')
  t.false(newFileExists)

  await generateCode(
      codeDir, nsInfo, config, templateDir, true, {}, false
  )
  t.true(fakeInstalledPackages.includes(codeDir + ' packages'))
  const generatedDirContents = fs.readdirSync(codeDir).sort()
  // t.true(await fs.pathExists(codeDir + '/.git'))

  // check whether new file created
  newFileExists = await fs.pathExists(codeDir + '/new.txt')
  t.true(newFileExists)

  // check whether json created
  newFileExists = await fs.pathExists(codeDir + '/package.json')
  t.true(newFileExists)

  // check whether the general package.json info copied over when there is no package.json
  const codeJson = await fs.readJson(codeDir + '/package.json')
  t.is(codeJson.addedKey, 'blah')

});

test('static types', async t=>{
  const {nsInfo} = require('./data/nsInfoStatic')
  const {config} = require('./data/configStatic')

  await generateCode(
      staticCodeDir, nsInfo, config, templateDir, false, {}, false
  )

  const filesGenerated = fs.readdirSync(staticCodeDir + '/src/auth')
  t.true(filesGenerated.includes('deleteCustomer.js'))
  t.true(filesGenerated.includes('deleteSeller.js'))

  // json is showing
  const codeJson = await fs.readJson(staticCodeDir + '/package.json')
  t.is(codeJson.addedKey, 'blah')



});


test.skip('nonreplaced keys', async t => {
  const nsInfo = await getNsInfo(codeDir)
  const config = await getConfig(templateDir)

  // check whether the general package.json info replaces an existing one
  await fs.copy('extraPackage.json', codeDir + '/package.json')  //replace json file
  let codeJson = await fs.readJson(codeDir + '/package.json')

  t.is(codeJson.nonReplacedKey, 'nonReplacedValue')

  await generateCode(
    codeDir, nsInfo, config, templateDir, false,
  )
  codeJson = await fs.readJson(codeDir + '/package.json')

  t.is(codeJson.addedKey, 'blah')
  t.is(codeJson.name, 'NsName')
  t.is(codeJson.config.originalConfigKey, 'originalConfigValue')
  t.is(codeJson.nonReplacedKey, 'nonReplacedValue')
  t.is(codeJson.config.ghooks['pre-commit'], 'npm run test')

  // const newCustomJson = await fs.readJson(SAMPLE_CODE+ '/meta/customCode.json')


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
});

test.afterEach(t => {
  // mock.stop('execa')
  mockFs.restore()
})
