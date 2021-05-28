import {Configuration} from "cogs-box";

export const config = {
  "name": null,
  "version": 1,
  "category": "apollo neo4j aura",
  "dirs": {
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
      "files": {
        "deleteUser.js": {
          "name": "delete__slug__",
          "suffix": ".js",
          "directory": "src/auth"
        }
      }
    }
  },
  "ignore": [
    ".vscode/launch.json",
    ".env"
  ]
}
