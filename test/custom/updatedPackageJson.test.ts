import test from 'ava';

import { updatePackageJson } from '../../src/custom/fileGeneration/packageJson/updatePackageJson';
import { mergePackageJsons } from '../../src/custom/fileGeneration/packageJson/mergePackageJsons';

const codeDir = __dirname + '/../sampleCodeDir'
const starter = __dirname + '/../sampleStarter'

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

const codePackageJson = {
  "dependencies": {
    "older": "^1.0.1",
    "same": "^1.1.1",
    "newer": "^1.1.1",
    "onlyCode": "^10.1.1",
  },
  "devDependencies": {
    "devOlder": "^1.0.1",
    "devSame": "^1.1.1",
    "devNewer": "^2.1.1",
    "devOnlyCode": "^10.1.1",
  },
  "keywords": [
    "both",
    "onlyCode"
  ],
  "config": {
    "commitizen": {
      "path": "currentPath"
    },
  },
  "files": [
    "lib/**/*"
  ],
}

const starterPackageJson = {
  "dependencies": {
    "older": "^2.0.0",
    "same": "^1.1.1",
    "newer": "^1.0.0",
    "onlyStarter": "^10.1.1",
  },
  "devDependencies": {
    "devOlder": "^2.0.1",
    "devSame": "^1.1.1",
    "devNewer": "^1.1.1",
    "devOnlyStarter": "^10.1.1",
  },
}


// expected results
const expectedDependencies = {
  "newer": "^1.1.1",
  "onlyCode": "^10.1.1",
  "older": "^2.0.0",
  "same": "^1.1.1",
  "onlyStarter": "^10.1.1",
}

const expectedDevs = {
  "devNewer": "^2.1.1",
  "devOnlyCode": "^10.1.1",
  "devOlder": "^2.0.1",
  "devSame": "^1.1.1",
  "devOnlyStarter": "^10.1.1",
}

const expectedKeywords = [
  "both",
  "onlyCode",
  "onlyInfo"
]


test('mergePackageJsons with empty codePackage and starterPackage', async t => {
  const json = mergePackageJsons({}, {}, packageJsonInfo)
  t.deepEqual(json.ava, avaInfo )
});

test('mergePackageJsons with empty codePackage and existing starterPackage', async t => {
  const json = mergePackageJsons({}, starterPackageJson, packageJsonInfo)
  t.deepEqual(json.ava, avaInfo )
  t.deepEqual(json.devDependencies, starterPackageJson.devDependencies )
});

test('mergePackageJsons with exiting codePackage and starterPackage', async t => {
  const json = mergePackageJsons(codePackageJson, starterPackageJson, packageJsonInfo)
  t.deepEqual(json.ava, avaInfo )
  t.deepEqual(json.devDependencies, expectedDevs )
  t.deepEqual(json.dependencies, expectedDependencies )
  t.deepEqual(json.keywords.sort, expectedKeywords.sort )
  t.deepEqual(json.config, packageJsonInfo.config )
  t.deepEqual(json.files, packageJsonInfo.files )

});

test('updatePackageJson', async t => {
  const mockFs = require('mock-fs');
  const path = require('path');
  const fs = require('fs-extra');

  mockFs({
    [codeDir]: {/* empty directory */},
    'node_modules': mockFs.load(path.resolve(__dirname, '../../node_modules')),
  })

  const json = await updatePackageJson(codeDir, starter, packageJsonInfo)
  t.deepEqual(json.ava, avaInfo )
  mockFs.restore()
});
