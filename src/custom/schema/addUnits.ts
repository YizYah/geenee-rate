import {newUnit} from './newUnit'
import {Schema, Units} from 'magicalstrings'
import {Configuration} from 'cogs-box'

export function addUnits(
  units: Units, schema: Schema, config: Configuration
) {
  if (units) {
    Object.keys(units).map(unitString => {
      const unitInfo = units[unitString]
      newUnit(
        schema, unitString, unitInfo, config
      )
    })
  }
  return schema
}
