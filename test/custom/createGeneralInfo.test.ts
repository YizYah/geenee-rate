import test from 'ava'

import { createGeneralInfo } from '../../src/custom/fileGeneration/context/createGeneralInfo'

const codeDir = "foo"
import { nsInfo } from './data/nsInfo'
// import { generalInfo } from './data/generalInfo'


test('createGeneralInfo', async t => {
    const result = await createGeneralInfo(nsInfo, codeDir)
    t.is(result.settings.static.userType[1].slug, "1")

})