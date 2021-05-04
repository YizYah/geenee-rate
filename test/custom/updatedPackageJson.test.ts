import test from 'ava';

import { updatePackageJson } from '../../src/custom/fileGeneration/packageJson/updatePackageJson';

const starter = __dirname + '/../sampleStarter'
const codeDir = __dirname + '/../sampleCodeDir'

const avaInfo = {
  "files": [
    "test/**/*.test.ts"
  ],
    "extensions": [
    "ts"
  ],
    "require": [
    "ts-node/register"
  ]
}

const packageJsonInfo = {
  "name": "bash-fool",
  "description": "run a sequence of bash commands as specified by a json",
  "author": "YizYah",
  "bugs": "https://github.com/YizYah/bash-fool/issues",
  "engines": {
    "node": ">=8.0.0"
  },
  "files": [
    "lib/**/*"
  ],
  "homepage": "https://github.com/YizYah/bash-fool",
  "keywords": [
    "ts-packrat",
    "geenee"
  ],
  "license": "MIT",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "repository": "YizYah/bash-fool",
  "scripts": {
    "build": "tsc",
    "commit": "git-cz",
    "lint": "eslint \"src/**/*.ts\"",
    "lintfix": "eslint \"src/**/*.ts\" --fix",
    "test": "ava",
    "posttest": "npm run view-coverage && npm run report && npm run lint",
    "prepack": "rm -rf lib && tsc -b",
    "report": "nyc report --reporter=json",
    "semantic-release": "semantic-release",
    "view-coverage": "nyc --extension .ts ava --forbid-only"
  },
  "ava": avaInfo,
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    },
    "ghooks": {
      "pre-commit": "npm run test"
    }
  }
}


test('general', async t => {
  const json = await updatePackageJson(codeDir, starter, packageJsonInfo)
  t.deepEqual(json.ava, avaInfo )
});
