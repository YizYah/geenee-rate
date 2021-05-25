import test from 'ava';

import { updatePackageJson } from '../../src/custom/fileGeneration/packageJson/updatePackageJson';

const mockFs = require('mock-fs');
const path = require('path');
const fs = require('fs-extra');

const codeDir = __dirname + '/sampleCode'
const starter = __dirname + '/sampleStarter'
const newCodeDir=__dirname + '/newSampleCode'

// input jsons
const avaInfo = {
  "extensions": [
    "ts"
  ],
  "files": [
    "test/**/*.test.ts"
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
    "both",
    "onlyInfo"
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
      "path": "infoPath"
    },
    "newConfigKey": {
      "value": "something"
    }
  },
}

const packageInfoJson={
  "name": "packackeInfoJson Sample",
  "description": "a profound leap",
  "author": "Stock",
  "addedKey": "blah",
  "bugs": "https://github.com/Frank/sample/issues",
  "engines": {
    "node": ">=8.0.0"
  },
  "files": [
    "lib/**/*"
  ],
  "homepage": "https://github.com/Frank/sample",
  "keywords": [
    "ts-packrat",
    "geenee"
  ],
  "license": "MIT",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "repository": "Frank/sample",
  "scripts": {
    "build": "tsc",
    "commit": "git-cz",
    "lint": "eslint \"src/**/*.ts\"",
    "lintfix": "eslint \"src/**/*.ts\" --fix",
    "test": "ava",
    "posttest": "npm run view-coverage && npm run lint",
    "prepack": "rm -rf lib && tsc -b",
    "semantic-release": "semantic-release",
    "view-coverage": "nyc --extension .ts ava --forbid-only"
  },
  "ava": {
    "files": [
      "test/**/*.test.ts"
    ],
    "extensions": [
      "ts"
    ],
    "require": [
      "ts-node/register"
    ]
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    },
    "ghooks": {
      "pre-commit": "npm run test"
    }
  },
  "dependencies": {
    "barbells": "^1.3.0"
  }
}

test.beforeEach(t => {
  mockFs({
    [codeDir]: mockFs.load(codeDir),
    [newCodeDir]: mockFs.load(codeDir),
    [starter]: mockFs.load(codeDir),
    'node_modules': mockFs.load(path.resolve(__dirname, '../../node_modules')),
  })
    }
)

test('updatePackageJson writes properly to file', async t => {
  const json = await updatePackageJson(codeDir, starter, packageJsonInfo)
  t.deepEqual(json.ava, avaInfo )
});


test('updatePackageJson use same dir for starter and code', async t => {
  const json = await updatePackageJson(newCodeDir, newCodeDir, packageJsonInfo)
  t.deepEqual(json.ava, avaInfo )
});


test.afterEach(t => {
  mockFs.restore()
})
