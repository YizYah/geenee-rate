import test from 'ava'
import {contextForDynamic} from "../../src/custom/fileGeneration/context/contextForDynamic";

const {nsInfo} = require('./data/nsInfoStatic')
const {config} = require('./data/configStatic')
const {schema} = require('./data/schemaDynamic')
import {BoilerPlateInfoType, NsInfo, Schema} from 'magicalstrings'

test('basic dynamic ', async t => {
    const staticType = 'myType'
    const slug = 'theSlug'
    const specs = {}
    const instance = 'myInstance'
    const fileName = 'sampleFile.js'
    const codeDir = '/path/to/code'

    const type = 'app'
    const unit = 'appSpec'

    const boilerPlateInfo: BoilerPlateInfoType = {
        componentType: 'item',
        dataType: 'string',
        nodeType: 'nonRoot'
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
        "singular": "App",
        "singularLowercase": "app",
        "plural": "Apps",
        "pluralLowercase": "apps",
        "parent": "customer",
        "component": "App",
        "source": {
            "name": "appSpec",
            "allCaps": "APP_SPEC",
            "constant": "SOURCE_APP_SPEC_ID",
            "typeSpecifier": "APP_FOR_APP_SPEC",
            "relationships": "APP_SPEC_RELATIONSHIPS",
            "query": "SOURCE_APP_SPEC_QUERY"
        }
    }
    // console.log(`dynamicContext = ${JSON.stringify(dynamicContext.names)}`)

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
