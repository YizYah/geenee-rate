import test from 'ava'
import {contextForStandard} from "../../src/custom/fileGeneration/context/contextForStandard";

const {nsInfo} = require('./data/nsInfoStatic')
const {config} = require('./data/configStatic')
const {schema} = require('./data/schemaStandard')
import {Configuration} from "cogs-box";

test('static context lowercase instance', async t => {
    const component = 'myComponent'
    const codeDir = '/path/to/code'

    const staticContext = await contextForStandard(
        nsInfo,
        schema,
        component,
        codeDir,
        config,
    )

    const expectedNames = {
        "singular": "MyComponent",
        "singularLowercase": "myComponent",
        "plural": "MyComponents",
        "pluralLowercase": "myComponents",
        "component": "myComponent"
    }
    t.deepEqual(staticContext.names, expectedNames)
})


test('static context upppercase instance', async t => {
    const component = 'MyComponent'
    const codeDir = '/path/to/code'

    const staticContext = await contextForStandard(
        nsInfo,
        schema,
        component,
        codeDir,
        config,
    )

    const expectedNames = {
        "singular": "MyComponent",
        "singularLowercase": "myComponent",
        "plural": "MyComponents",
        "pluralLowercase": "myComponents",
        "component": "MyComponent"
    }
    t.deepEqual(staticContext.names, expectedNames)
})
