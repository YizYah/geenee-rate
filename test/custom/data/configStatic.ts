import {Configuration} from "cogs-box";

export const config: Configuration = {
  "name": "null",
  "version": "1",
  "category": "apollo neo4j aura",
  "dirs": {
    "components": "src/components",
    "custom": "src/custom"
  },
  "format": {
    "customFileFilter": "*.{js,jsx,ts,tsx,md,yml}",
    "defaultOpenComment": "/*",
    "defaultCloseComment": "*/",
    "openComment": {
      ".md": "\n[//]: # (",
      ".yml": "#"
    },
    "closeComment": {
      ".md": ")",
      ".yml": "\n"
    }
  },
  "setupSequence": {
    "preCommands": [
      {
        "title": "run git",
        "file": "git",
        "arguments": [
          "init",
          "$codeDir"
        ]
      },
      {
        "title": "create package.json",
        "file": "npm",
        "arguments": [
          "init",
          "-y"
        ],
        "options": {
          "cwd": "$codeDir"
        }
      }
    ]
  },
  "static": {
    "userType": {
      "description": "a test",
      "files": {
        "deleteUser.js": {
          "name": "delete__slug__",
          "suffix": ".js",
          "directory": "src/auth"
        }
      },
      "specs": {
        foo: {
          type: "string",
          required: true,
        },
      }
    }
  },
  "componentTypes": {
    item: {
      singular: true,
    }
  },
  "ignore": [
    ".vscode/launch.json",
    ".env"
  ],
  general: {

  },
  dataFunctionTypes: {

  }
}
