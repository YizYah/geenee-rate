
[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )
![](src/custom/images/onewayticket.gif)

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )

code generator based on geenee metadata.

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )

[![Version](https://img.shields.io/npm/v/one-way-ticket.svg)](https://npmjs.org/package/one-way-ticket)
[![Downloads/week](https://img.shields.io/npm/dw/one-way-ticket.svg)](https://npmjs.org/package/one-way-ticket)
[![License](https://img.shields.io/npm/l/one-way-ticket.svg)](https://github.com/YizYah/one-way-ticket/blob/master/package.json)

[![Geenee](https://img.shields.io/badge/maintained%20by-geenee-brightgreen)](https://npmjs.org/package/geenee)
[![Template](https://img.shields.io/badge/template-ts--packrat-blue)](https://npmjs.org/package/ts-packrat)

# Why
A [geenee](https://www.npmjs.com/package/geenee) template is normally used for multiple generation of code. To do that, [geenee-spell](https://www.npmjs.com/package/geenee-spell) stores a `meta` directory within the generated code base to allow for regeneration.

But sometimes you want to use a geenee template without creating a meta file in the code.

# What
A single async function that generates from a specified geenee template and settings.

You can create such a template easily from a code base using [copykat](https://www.npmjs.com/package/copykat), or just by following the [steps for creating templates](https://geenee.nostack.net/Creating-Templates).

# Usage
Import the package:
```console
npm i one-way
```

Set the following in your code:
* __codeDir__: path to your codeBase to generate
* __nsInfo__: json containing [settings for the generated code](https://geenee.nostack.net/NS-Files)
* __config__: json containing the [configuration from the template](https://geenee.nostack.net/NS-Files)
* __templateDir__: the directory of the template

Then you can call:

```typescript
const generateCode = require('one-way-ticket')

try {
    await generateCode(
      codeDir, nsInfo, config, templateDir
    )
  } catch (error) {
    throw new Error(`could not generate the code: ${error}`)
  }
```

# Example
Check out the [usage in geenee-spell](https://github.com/YizYah/geenee-spell/blob/main/src/custom/generateCode.ts).

[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )


[//]: # ( ns__start_section api )


[//]: # ( ns__custom_start APIIntro )
# API

[//]: # ( ns__custom_end APIIntro )


[//]: # ( ns__custom_start constantsIntro )
## General Constants and Commands

[//]: # ( ns__custom_end constantsIntro )



[//]: # ( ns__start_section types )


[//]: # ( ns__end_section types )


[//]: # ( ns__end_section api )

