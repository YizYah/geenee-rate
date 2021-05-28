import {Schema} from 'magicalstrings'

export const schema: Schema = {
  "userClasses": {
    "moderator": {
      "topSource": "",
      "name": "moderator",
    },
    "user": {
      "name": "user",
      "topSource": "list",
    }
  },
  "sources": {
    "list": {
      "topSource": "",
      "const": "SOURCE_LIST_ID",
      "unitType": "interactive",
      "props": {
        "queryBody": "instance {\n      id\n      value\n    }",
        "typeRelationships": "item: null"
      },
      "name": "list",
      "tree": {
        "user": {
          "item": "multiple"
        },
        "item": {}
      },
      "selectedTree": {
        "highestLevel": [
          "item"
        ],
        "item": []
      },
      "selections": [
        "item"
      ],
      "constraints": {
        "list": {
          "constraintType": "ID",
          "typeName": "user",
          "constraintValue": "currentUser"
        }
      },
      "connections": {},
      "owner": "user",
      "selectionRoot": "item",
      "root": "user",
      "id": "0150200e-61dc-45d6-9bee-dd908334dd15",
      "depth": 1
    }
  },
  "types": {
    "moderator": {
      "name": "moderator",
      "dataType": "string",
      "sources": {},
    },
    "user": {
      "name": "user",
      "dataType": "string",
      "sources": {
        "list": {
          "parentType": "",
          "nodeType": "Root",
          "assnType": "viewable",
          "children": [
            "item"
          ],
        }
      },
    },
    "item": {
      "dataType": "string",
      "name": "item",
      "sources": {
        "list": {
          "parentType": "user",
          "nodeType": "nonRoot",
          "assnType": "multiple",
          "children": [],
          "sourceUnit": "null",
        }
      },
    }
  },
  "actions": {
    "CREATE_INSTANCE": {},
    "UPDATE_INSTANCE": {
      "list__item_update": {
        "const": "UPDATE_ITEM_FOR_LIST_ACTION_ID",
        "actionName": "update item for list",
        "userClass": "user",
        "actionType": "UPDATE_INSTANCE",
        "type": "item",
        "parentType": "user",
        "source": "list",
        "id": "f076119e-b81f-404e-88d9-043897e34235"
      }
    },
    "DELETE_INSTANCE": {
      "list__item_delete": {
        "const": "DELETE_ITEM_FOR_LIST_ACTION_ID",
        "actionName": "delete item for list",
        "userClass": "user",
        "actionType": "DELETE_INSTANCE",
        "type": "item",
        "parentType": "user",
        "source": "list",
        "id": "2c46559f-7997-4fc3-9164-62c9957a6320"
      }
    },
    "ADD_INSTANCE_ASSN": {},
    "UPDATE_INSTANCE_ASSN": {},
    "DELETE_INSTANCE_ASSN": {},
    "CREATE_INSTANCE_WITH_UNOWNED_PARENT": {
      "list__item_create": {
        "const": "CREATE_ITEM_FOR_LIST_ACTION_ID",
        "actionName": "create item for list",
        "userClass": "user",
        "actionType": "CREATE_INSTANCE_WITH_UNOWNED_PARENT",
        "type": "item",
        "parentType": "user",
        "source": "list",
        "id": "774c070a-c82c-4fed-b7bc-4a759e7ef4fb"
      }
    }
  },
  "topSource": "null",
}
