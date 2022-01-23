import test from 'ava'
import {contextForStatic} from "../../src/custom/fileGeneration/context/contextForStatic";

const {nsInfo} = require('./data/nsInfoStatic')
const {config} = require('./data/configStatic')
import {Configuration} from "cogs-box";

test('static context lowercase instance', async t => {
    const staticType = 'myType'
    const slug = 'theSlug'
    const specs = {}
    const instance = 'myInstance'
    const fileName = 'sampleFile.js'
    const codeDir = '/path/to/code'

    const staticContext = await contextForStatic(
        staticType,
        specs,
        slug,
        instance,
        fileName,
        nsInfo,
        config,
        codeDir,
    )

    const expectedNames = {
        "singular": "MyInstance",
        "singularLowercase": "myInstance",
        "plural": "MyInstances",
        "pluralLowercase": "myInstances",
        "staticType": "myType",
        "component": "sampleFile.js"
    }
    t.deepEqual(staticContext.names, expectedNames)
})


test('static context upppercase instance', async t => {
    const staticType = 'myType'
    const slug = 'theSlug'
    const specs = {}
    const instance = 'MyInstance'
    const fileName = 'sampleFile.js'
    const codeDir = '/path/to/code'

    const staticContext = await contextForStatic(
        staticType,
        specs,
        slug,
        instance,
        fileName,
        nsInfo,
        config,
        codeDir,
    )

    const expectedNames = {
        "singular": "MyInstance",
        "singularLowercase": "myInstance",
        "plural": "MyInstances",
        "pluralLowercase": "myInstances",
        "staticType": "myType",
        "component": "sampleFile.js"
    }
    t.deepEqual(staticContext.names, expectedNames)
})
