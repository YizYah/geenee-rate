import test from 'ava'
import {contextForDynamic} from "../../src/custom/fileGeneration/context/contextForDynamic";

const {nsInfo} = require('./data/nsInfoStatic')
const {config} = require('./data/configStatic')
const {schema} = require('./data/schemaStandard')
import {BoilerPlateInfoType, NsInfo, Schema} from 'magicalstrings'

test('static context lowercase instance', async t => {
    const staticType = 'myType'
    const slug = 'theSlug'
    const specs = {}
    const instance = 'myInstance'
    const fileName = 'sampleFile.js'
    const codeDir = '/path/to/code'

    const type = 'item'
    const unit = 'list'

    const boilerPlateInfo: BoilerPlateInfoType = {
        componentType: 'myCompType',
        dataType: 'myDataType',
        nodeType: 'myNodeType'
    }
    const dynamicContext = await contextForDynamic(
      type,
      unit,
      nsInfo,
      schema,
      boilerPlateInfo,
      config,
    )

    const expectedNames = {
        "singular": "MyInstance",
        "singularLowercase": "myInstance",
        "plural": "MyInstances",
        "pluralLowercase": "myInstances",
        "component": "sampleFile.js",
        parent: "foo",
        source: {
            name: "foo",
            allCaps: "foo",
            constant: "foo",
            typeSpecifier: "foo",
            relationships: "foo",
            query: "foo",
        }
    }
    console.log(`dynamicContext = ${JSON.stringify(dynamicContext.names)}`)

    t.deepEqual(dynamicContext.names, expectedNames)
})


// test('static context upppercase instance', async t => {
//     const staticType = 'myType'
//     const slug = 'theSlug'
//     const specs = {}
//     const instance = 'MyInstance'
//     const fileName = 'sampleFile.js'
//     const codeDir = '/path/to/code'
//
//     const staticContext = await contextForStatic(
//         staticType,
//         specs,
//         slug,
//         instance,
//         fileName,
//         nsInfo,
//         config,
//         codeDir,
//     )
//
//     const expectedNames = {
//         "singular": "MyInstance",
//         "singularLowercase": "myInstance",
//         "plural": "MyInstances",
//         "pluralLowercase": "myInstances",
//         "staticType": "myType",
//         "component": "sampleFile.js"
//     }
//     console.log(`staticContext = ${JSON.stringify(staticContext.names)}`)
//     t.deepEqual(staticContext.names, expectedNames)
// })
