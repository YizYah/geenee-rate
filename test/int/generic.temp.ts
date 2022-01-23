import test from 'ava'
const generate = require('../../src');
import { Configuration, getConfig } from 'cogs-box'

import {nsInfo} from '../custom/data/nsInfo' 

const finalCodeDir = '/home/yisroel/temp/tempCodeDir'
const templateDir = '/home/yisroel/projects/backend/exporter3/src'



test('generic', async t => {
    const config: Configuration = await getConfig(templateDir)
    const result = await generate(
        finalCodeDir, nsInfo, config, templateDir
    )

    t.true(true)
})