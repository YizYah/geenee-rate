import {Schema} from 'magicalstrings'
const {associationTypes} = require('magicalstrings').constants

export const schema: Schema = {
    "userClasses": {
        "moderator": {
            "topSource": "",
            "name": "moderator",
        },
        "customer": {
            "name": "customer",
            "topSource": "appSpec",
        }
    },
    "sources": {
        "appSpec": {
            "topSource": "null",
            "const": "SOURCE_APP_SPEC_ID",
            "unitType": "interactive",
            "props": {
                "queryBody": "\n        instance {\n            id\n            value\n        }\n        children {\n            typeId\n            instances {\n                \n\t\tinstance {\n\t\t    id\n\t\t    value\n\t\t}\n\t\tchildren {\n\t\t    typeId\n\t\t    instances {\n\t\t        \n\t\t\tinstance {\n\t\t\t    id\n\t\t\t    value\n\t\t\t}\n\t\t\tchildren {\n\t\t\t    typeId\n\t\t\t    instances {\n\t\t\t        \n\t\t\t\tinstance {\n\t\t\t\t    id\n\t\t\t\t    value\n\t\t\t\t}\n\t\t\t    }\n\t\t\t}\n\t\t    }\n\t\t}\n            }\n        }\n    ",
                "typeRelationships": "app: {\n        userType: {\n        screen: {\n        infoType: null\n    }\n    }, description: null\n    }"
            },
            "name": "appSpec",
            "tree": {
                "customer": {
                    "app": "multiple"
                },
                "app": {
                    "userType": "multiple",
                    "description": associationTypes.SINGLE_REQUIRED
                },
                "userType": {
                    "screen": "multiple"
                },
                "screen": {
                    "infoType": "multiple"
                },
                "infoType": {},
                "description": {}
            },
            "selectedTree": {
                "highestLevel": [
                    "app"
                ],
                "app": [
                    "userType",
                    "description"
                ],
                "userType": [
                    "screen"
                ],
                "screen": [
                    "infoType"
                ],
                "infoType": [],
                "description": []
            },
            "selections": [
                "app",
                "userType",
                "screen",
                "infoType",
                "description"
            ],
            "constraints": {
                "appSpec": {

                    "constraintType": "ID",
                    "typeName": "customer",
                    "constraintValue": "currentCustomer"
                }
            },
            "connections": {},
            "owner": "customer",

            "selectionRoot": "app",
            "root": "customer",
            "joins": {
                "hasParent": {
                    "fromType": "infoType",
                    "fromUnit": "appSpec",
                    "toUnit": "parent",
                    "toType": "infoType",
                    "assnType": "selectable",
                    "joinAssnId": "69faae49-f4ed-4cfa-b769-9c053885056d"
                }
            },
            "id": "e36aa4c6-8029-4969-b1fe-d659bdb9eb42",
            "depth": 4
        },
        "parent": {
            "topSource": "null",
            "const": "SOURCE_PARENT_ID",
            "unitType": "dataSource",
            "props": {
                "queryBody": "\n        instance {\n            id\n            value\n        }\n        children {\n            typeId\n            instances {\n                \n\t\tinstance {\n\t\t    id\n\t\t    value\n\t\t}\n            }\n        }\n    ",
                "typeRelationships": "infoType: {\n        screen: null\n    }"
            },
            "name": "parent",
            "tree": {
                "infoType": {
                    "screen": "viewable"
                },
                "screen": {}
            },
            "selectedTree": {
                "highestLevel": [
                    "infoType"
                ],
                "infoType": [
                    "screen"
                ],
                "screen": []
            },
            "selections": [
                "infoType",
                "screen"
            ],
            "constraints": {},
            "connections": {},
            "owner": "customer",
            "selectionRoot": "infoType",
            "root": "infoType",
            "id": "2bb38a1e-6802-4aa6-8c23-2ae8a7f1fe08",
            "depth": 2
        }
    },
    "types": {
        "moderator": {
            "name": "moderator",
            "dataType": "string",
            "sources": {},
        },
        "customer": {
            "name": "customer",
            "dataType": "string",
            "sources": {
                "appSpec": {
                    "parentType": 'null',
                    "nodeType": "Root",
                    "assnType": "viewable",
                    "children": [
                        "app"
                    ],
                }
            },
        },
        "app": {
            "dataType": "string",
            "name": "app",
            "sources": {
                "appSpec": {
                    "parentType": "customer",
                    "nodeType": "nonRoot",
                    "assnType": "multiple",
                    "children": [
                        "userType",
                        "description"
                    ],
                    "sourceUnit": 'null',
                }
            },
        },
        "userType": {
            "dataType": "string",
            "name": "userType",
            "sources": {
                "appSpec": {
                    "parentType": "app",
                    "nodeType": "nonRoot",
                    "assnType": "multiple",
                    "children": [
                        "screen"
                    ],
                }
            },
        },
        "screen": {
            "dataType": "string",
            "name": "screen",
            "sources": {
                "appSpec": {
                    "parentType": "userType",
                    "nodeType": "nonRoot",
                    "assnType": "multiple",
                    "children": [
                        "infoType"
                    ],
                },
                "parent": {
                    "parentType": "infoType",
                    "nodeType": "nonRoot",
                    "assnType": "viewable",
                    "children": [],
                    "sourceUnit": "appSpec",
                }
            },
        },
        "infoType": {
            "dataType": "string",
            "name": "infoType",
            "sources": {
                "appSpec": {
                    "parentType": "screen",
                    "nodeType": "nonRoot",
                    "assnType": "multiple",
                    "children": [],
                },
                "parent": {
                    "parentType": 'null',
                    "nodeType": "Root",
                    "assnType": "viewable",
                    "children": [
                        "screen"
                    ],
                }
            },
        },
        "description": {
            "dataType": "string",
            "name": "description",
            "sources": {
                "appSpec": {
                    "parentType": "app",
                    "nodeType": "nonRoot",
                    "assnType": associationTypes.SINGLE_REQUIRED,
                    "children": [],
                }
            },
        }
    },
    "actions": {
        "CREATE_INSTANCE": {
            "appSpec__userType_create": {
                "const": "CREATE_USER_TYPE_FOR_APP_SPEC_ACTION_ID",
                "actionName": "create userType for appSpec",
                "userClass": "customer",
                "actionType": "CREATE_INSTANCE",
                "type": "userType",
                "parentType": "app",
                "source": "appSpec",
                "id": "53a02af0-eaeb-40d5-84f3-cfe8cf9d23c1"
            },
            "appSpec__screen_create": {
                "const": "CREATE_SCREEN_FOR_APP_SPEC_ACTION_ID",
                "actionName": "create screen for appSpec",
                "userClass": "customer",
                "actionType": "CREATE_INSTANCE",
                "type": "screen",
                "parentType": "userType",
                "source": "appSpec",
                "id": "b79bf571-e364-40c4-bb48-3765d884161d"
            },
            "appSpec__infoType_create": {
                "const": "CREATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID",
                "actionName": "create infoType for appSpec",
                "userClass": "customer",
                "actionType": "CREATE_INSTANCE",
                "type": "infoType",
                "parentType": "screen",
                "source": "appSpec",
                "id": "a2962d65-f87b-47ee-8ff8-18f5e3650e69"
            },
            "appSpec__description_create": {
                "const": "CREATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID",
                "actionName": "create description for appSpec",
                "userClass": "customer",
                "actionType": "CREATE_INSTANCE",
                "type": "description",
                "parentType": "app",
                "source": "appSpec",
                "id": "b75bff3e-2090-4dd3-b076-c69e0ba5b467"
            }
        },
        "UPDATE_INSTANCE": {
            "appSpec__app_update": {
                "const": "UPDATE_APP_FOR_APP_SPEC_ACTION_ID",
                "actionName": "update app for appSpec",
                "userClass": "customer",
                "actionType": "UPDATE_INSTANCE",
                "type": "app",
                "parentType": "customer",
                "source": "appSpec",
                "id": "45a09731-793f-4b87-82bd-f6363546c191"
            },
            "appSpec__userType_update": {
                "const": "UPDATE_USER_TYPE_FOR_APP_SPEC_ACTION_ID",
                "actionName": "update userType for appSpec",
                "userClass": "customer",
                "actionType": "UPDATE_INSTANCE",
                "type": "userType",
                "parentType": "app",
                "source": "appSpec",
                "id": "fa9dd57a-6103-40be-8751-3421d120b3da"
            },
            "appSpec__screen_update": {
                "const": "UPDATE_SCREEN_FOR_APP_SPEC_ACTION_ID",
                "actionName": "update screen for appSpec",
                "userClass": "customer",
                "actionType": "UPDATE_INSTANCE",
                "type": "screen",
                "parentType": "userType",
                "source": "appSpec",
                "id": "feeb9777-0538-4f3a-8bbe-a907e84667ba"
            },
            "appSpec__infoType_update": {
                "const": "UPDATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID",
                "actionName": "update infoType for appSpec",
                "userClass": "customer",
                "actionType": "UPDATE_INSTANCE",
                "type": "infoType",
                "parentType": "screen",
                "source": "appSpec",
                "id": "c822a81e-a4ac-4e9a-9aab-9f59f777276a"
            },
            "appSpec__description_update": {
                "const": "UPDATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID",
                "actionName": "update description for appSpec",
                "userClass": "customer",
                "actionType": "UPDATE_INSTANCE",
                "type": "description",
                "parentType": "app",
                "source": "appSpec",
                "id": "2462c9aa-f377-48c0-9126-e52599c82f4a"
            },
            "parent__screen_update": {
                "const": "UPDATE_SCREEN_FOR_PARENT_ACTION_ID",
                "actionName": "update screen for parent",
                "userClass": "customer",
                "actionType": "UPDATE_INSTANCE",
                "type": "screen",
                "parentType": "infoType",
                "source": "parent",
                "id": "1c0d97b9-d0d7-4b8b-81a3-2c22b06768bc"
            }
        },
        "DELETE_INSTANCE": {
            "appSpec__app_delete": {
                "const": "DELETE_APP_FOR_APP_SPEC_ACTION_ID",
                "actionName": "delete app for appSpec",
                "userClass": "customer",
                "actionType": "DELETE_INSTANCE",
                "type": "app",
                "parentType": "customer",
                "source": "appSpec",
                "id": "9ad7799b-5946-4039-a8c9-e7e7395668ae"
            },
            "appSpec__userType_delete": {
                "const": "DELETE_USER_TYPE_FOR_APP_SPEC_ACTION_ID",
                "actionName": "delete userType for appSpec",
                "userClass": "customer",
                "actionType": "DELETE_INSTANCE",
                "type": "userType",
                "parentType": "app",
                "source": "appSpec",
                "id": "d399ef81-c0f0-495e-95f8-f63f132e2b28"
            },
            "appSpec__screen_delete": {
                "const": "DELETE_SCREEN_FOR_APP_SPEC_ACTION_ID",
                "actionName": "delete screen for appSpec",
                "userClass": "customer",
                "actionType": "DELETE_INSTANCE",
                "type": "screen",
                "parentType": "userType",
                "source": "appSpec",
                "id": "7496f085-7d3c-4739-b83d-de6efbcdcbd3"
            },
            "appSpec__infoType_delete": {
                "const": "DELETE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID",
                "actionName": "delete infoType for appSpec",
                "userClass": "customer",
                "actionType": "DELETE_INSTANCE",
                "type": "infoType",
                "parentType": "screen",
                "source": "appSpec",
                "id": "7f3d7add-28ec-4447-a91b-46b88b3203ee"
            },
            "appSpec__description_delete": {
                "const": "DELETE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID",
                "actionName": "delete description for appSpec",
                "userClass": "customer",
                "actionType": "DELETE_INSTANCE",
                "type": "description",
                "parentType": "app",
                "source": "appSpec",
                "id": "5e072d38-9314-4a2f-b3b2-476a0c89d288"
            },
            "parent__screen_delete": {
                "const": "DELETE_SCREEN_FOR_PARENT_ACTION_ID",
                "actionName": "delete screen for parent",
                "userClass": "customer",
                "actionType": "DELETE_INSTANCE",
                "type": "screen",
                "parentType": "infoType",
                "source": "parent",
                "id": "9949b22f-6e70-4346-b183-a53858cbe8a6"
            }
        },
        "ADD_INSTANCE_ASSN": {
            "parent__hasParent_add": {
                "const": "ADD_HAS_PARENT_FOR_PARENT_ACTION_ID",
                "actionName": "add hasParent for parent",
                "userClass": "customer",
                "actionType": "ADD_INSTANCE_ASSN",
                "type": "hasParent",
                "parentType": "infoType",
                "source": "parent",
                "id": "482d8179-eb4b-494b-80bc-02c1b8c43eef"
            }
        },
        "UPDATE_INSTANCE_ASSN": {
            "parent__hasParent_update": {
                "const": "UPDATE_HAS_PARENT_FOR_PARENT_ACTION_ID",
                "actionName": "update hasParent for parent",
                "userClass": "customer",
                "actionType": "UPDATE_INSTANCE_ASSN",
                "type": "hasParent",
                "parentType": "infoType",
                "source": "parent",
                "id": "086a5506-1da2-48da-901a-2ee8a5b3bacc"
            }
        },
        "DELETE_INSTANCE_ASSN": {
            "parent__hasParent_delete": {
                "const": "DELETE_HAS_PARENT_FOR_PARENT_ACTION_ID",
                "actionName": "delete hasParent for parent",
                "userClass": "customer",
                "actionType": "DELETE_INSTANCE_ASSN",
                "type": "hasParent",
                "parentType": "infoType",
                "source": "parent",
                "id": "3178abb9-757a-4849-a33b-0ad892b57a63"
            }
        },
        "CREATE_INSTANCE_WITH_UNOWNED_PARENT": {
            "appSpec__app_create": {
                "const": "CREATE_APP_FOR_APP_SPEC_ACTION_ID",
                "actionName": "create app for appSpec",
                "userClass": "customer",
                "actionType": "CREATE_INSTANCE_WITH_UNOWNED_PARENT",
                "type": "app",
                "parentType": "customer",
                "source": "appSpec",
                "id": "955e751c-cb97-4383-9eb3-eb4b9bc4e04e"
            },
            "parent__screen_create": {
                "const": "CREATE_SCREEN_FOR_PARENT_ACTION_ID",
                "actionName": "create screen for parent",
                "userClass": "customer",
                "actionType": "CREATE_INSTANCE_WITH_UNOWNED_PARENT",
                "type": "screen",
                "parentType": "infoType",
                "source": "parent",
                "id": "7287f58b-e9b6-4107-9c0d-76b6e6fcb17a"
            }
        }
    },
    "topSource": 'null',
}
