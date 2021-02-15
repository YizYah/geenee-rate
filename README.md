
[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )
![geenee-rate](src/custom/images/geenee-rate.gif)

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )

code generator based on geenee metadata.

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )

[![Version](https://img.shields.io/npm/v/geenee-rate.svg)](https://npmjs.org/package/geenee-rate)
[![Downloads/week](https://img.shields.io/npm/dw/geenee-rate.svg)](https://npmjs.org/package/geenee-rate)
[![License](https://img.shields.io/npm/l/geenee-rate.svg)](https://github.com/YizYah/geenee-rate/blob/master/package.json)

[![Geenee](https://img.shields.io/badge/maintained%20by-geenee-brightgreen)](https://npmjs.org/package/geenee)
[![Template](https://img.shields.io/badge/template-ts--packrat-blue)](https://npmjs.org/package/ts-packrat)

<!-- toc -->

* [:clipboard: Why](#why)
* [:white_check_mark: What](#what)
* [:wrench: Usage](#usage)
* [:bulb: Example](#example)
* [:zap: Creating Templates](#creating-templates)
* [:cyclone: API](#api)
  <!-- tocstop -->

# :clipboard: Why
A [geenee](https://www.npmjs.com/package/geenee) template is normally used for multiple generation of code. To do that, [geenee-spell](https://www.npmjs.com/package/geenee-spell) stores a `meta` directory within the generated code base to allow for regeneration.

But geenee templates are a very powerful tool for one-time creation as well.  For instance, you may not want to include a `meta` directory in your code.

# :white_check_mark: What
A single async function that generates code from a specified geenee template and settings.

# :wrench: Usage
Import the package:
```console
npm i geenee-rate
```

Set the following in your code:
* __codeDir__: path to your codeBase to generate
* __nsInfo__: json containing [settings for the generated code](https://geenee.nostack.net/NS-Files)
* __config__: json containing the [configuration from the template](https://geenee.nostack.net/NS-Files)
* __templateDir__: the directory of the template

Then you can call:

```typescript
const generate = require('geenee-rate')

try {
    await generate(
      codeDir, nsInfo, config, templateDir
    )
  } catch (error) {
    throw new Error(`could not generate the code: ${error}`)
  }
```

# :bulb: Example
Check out the [usage in geenee-spell](https://github.com/YizYah/geenee-spell/blob/main/src/custom/generateCode.ts).

# :zap: Creating Templates
You can create such a template easily from a code base using [copykat](https://www.npmjs.com/package/copykat), or just by following the [steps for creating templates](https://geenee.nostack.net/Creating-Templates).


[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )


[//]: # ( ns__start_section api )


[//]: # ( ns__custom_start APIIntro )
# :cyclone: API
```typescript
async function generateCode(
  codeDir: string,
  nsInfo: NsInfo,
  config: Configuration,
  templateDir: string,
)
```
The `NsInfo` and `Configuration` types are exposed in [magicalstrings](https://www.npmjs.com/package/magicalstrings).

[//]: # ( ns__custom_end APIIntro )


[//]: # ( ns__custom_start constantsIntro )

[//]: # ( ns__custom_end constantsIntro )



[//]: # ( ns__start_section types )


[//]: # ( ns__end_section types )


[//]: # ( ns__end_section api )

