# geenee-rate

[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )
![geenee-rate](images/geenee-rate-new.gif)

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )

code generator based on geenee metadata.

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )

[![codecov](https://codecov.io/gh/YizYah/geenee-rate/branch/main/graph/badge.svg?token=019QO4XK1Z)](https://codecov.io/gh/YizYah/geenee-rate)
[![Version](https://img.shields.io/npm/v/geenee-rate.svg)](https://npmjs.org/package/geenee-rate)
[![Downloads/week](https://img.shields.io/npm/dw/geenee-rate.svg)](https://npmjs.org/package/geenee-rate)
[![License](https://img.shields.io/npm/l/geenee-rate.svg)](https://github.com/YizYah/geenee-rate/blob/master/package.json)

[![Geenee](https://img.shields.io/badge/maintained%20by-geenee-brightgreen)](https://npmjs.org/package/geenee)
[![Template](https://img.shields.io/badge/template-ts--packrat-blue)](https://npmjs.org/package/ts-packrat)

<!-- toc -->

- [geenee-rate](#geenee-rate)
  - [<a name="clipboard-why"></a>:clipboard: Why](#clipboard-why)
  - [<a name="white-check-mark-what"></a>:white_check_mark: What](#white_check_mark-what)
  - [<a name="wrench-usage"></a>:wrench: Usage](#wrench-usage)
  - [<a name="bulb-example"></a>:bulb: Example](#bulb-example)
  - [<a name="zap-creating-templates"></a>:zap: Creating Templates](#zap-creating-templates)
  - [package.json files](#packagejson-files)
  - [Related project](#related-project)
  - [<a name="ledger-api"></a>:ledger: API](#ledger-api)
    - [arguments](#arguments)
  <!-- tocstop -->

## <a name="clipboard-why"></a>:clipboard: Why

File generation consists of three types of files. Each requires different context to generate:

1. standard files that never change.  These require no context.
2. static files--they vary from project to project, but do not receive dynamic content.  These require a static specification of info for each example in a particular generated code base.
3. dynamic files--they contain dynamic content.  These require specification for whatever query is required.

## <a name="white-check-mark-what"></a>:white_check_mark: What

A single async function that generates code from a specified geenee template and settings, handling the context of all three types of files above.  See [Context in geenee-rate](https://github.com/YizYah/geenee-rate/wiki/Context-in-Geenee-Rate) for details about the context.

`geenee-rate` ignores anything in the directory of the package, with the exception on a [`package.json file`](#packagejson-files).

It will overwrite any files with the same path and name.

Because it leaves everything else, you can apply a starter first.  That is useful because you can use [head-starter](https://www.npmjs.com/package/head-starter) with your same geenee template.

## <a name="wrench-usage"></a>:wrench: Usage

Import the package:

```console
npm i geenee-rate
```

Set the following in your code:

- __codeDir__: path to your codeBase to generate
- __nsInfo__: json containing [settings for the generated code](https://geenee.nostack.net/NS-Files)
- __config__: json containing the [configuration from the template](https://geenee.nostack.net/NS-Files)
- __templateDir__: the directory of the template

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

If you need to get the config, you can use [magicalstrings](https://www.npmjs.com/package/magicalstrings#config-files).  Here's an example using TypeScript:

```
const {getConfig} = require('magicalstrings').configs
import {Configuration} from 'magicalstrings'

let config: Configuration
...
config = await getConfig(templateDir)

```

## <a name="bulb-example"></a>:bulb: Example

Check out the [usage in geenee-spell](https://github.com/YizYah/geenee-spell/blob/main/src/custom/regenerateCode.ts).

## <a name="zap-creating-templates"></a>:zap: Creating Templates

You can create such a template easily from a code base using [copykat](https://www.npmjs.com/package/copykat).

Once you have created a basic template, geenee-rate has a [built-in context](https://github.com/YizYah/geenee-rate/wiki/Context-in-Geenee-Rate) to make the job much simpler. See the documenation of [barbells](https://www.npmjs.com/package/barbells) for treatment of handlebars helpers and partials.  You may find that you don't need to add any custom helpers.

Also, check out the [Creating Templates](https://geenee.nostack.net/Creating-Templates) on the
[geenee](https://www.npmjs.com/package/geenee) documentation.

## package.json files

The biggest gotcha with `geenee-rate` is the `package.json` files.

It's not complicated, but you have to understand two things:

1. package.json files are the one exception to the rule that geenee-rate doesn't know or care what was in your project directory--it will simply overwrite or ignore existing files.  But the legacy package.json is updated rather than replaced;
2. That said, what's in the template file `general/packageinfo.json.hbs`, takes precendence over what was in the legacy `package.json`.  That is to say that *any value for keys generated by that file will replace the values that you had before*. That will be based upon what's in the `ns.yml` specs file.  So in practice you will need to update the `ns.yml` file with the latest information.  We may replace that with a different behavior in the future, such as an option not to regenerate the json.

Note that dependency versioning is not relevant to geenee-rate.  Whatever you had before should stay the same.

[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )

[//]: # ( ns__start_section api )

[//]: # ( ns__custom_start APIIntro )

## Related project

A [geenee](https://www.npmjs.com/package/geenee) template is normally used for multiple generation of code. To do that, [geenee-spell](https://www.npmjs.com/package/geenee-spell) stores a `meta` directory within the generated code base to allow for regeneration.

But `geenee` templates are a very powerful tool for one-time creation as well.  For instance, you may not want to include a `meta` directory in your code.  That is the reason for `geenee-rate` existing separately.

## <a name="ledger-api"></a>:ledger: API

```typescript
async function generateCode(
  codeDir: string,
  nsInfo: NsInfo,
  config: Configuration,
  templateDir: string,
  addStarter: boolean = true,
  sessionIn: any = {},
)
```

The `NsInfo` and `Configuration` types are exposed in [magicalstrings](https://www.npmjs.com/package/magicalstrings).

### arguments

- codeDir: string telling the directory where you want the code to generate.
- nsInfo: NsInfo telling about
- config: Configuration,
- templateDir: string,
- addStarter: boolean set by default to true.  It means that if the code contains a [head-starter](https://www.npmjs.com/package/head-starter) startup sequence, it will be executed.
- sessionIn: object, by default empty.  It lets you apply a [dynamapping](https://www.npmjs.com/package/dynamapping) session to change the values of a startup sequence dynamically if you like.  `codeDir` is added to the session automatically, so you can insert `$codeDir` into your startup sequence already.

[//]: # ( ns__custom_end APIIntro )

[//]: # ( ns__custom_start constantsIntro )

[//]: # ( ns__custom_end constantsIntro )

[//]: # ( ns__start_section types )

[//]: # ( ns__end_section types )

[//]: # ( ns__end_section api )
