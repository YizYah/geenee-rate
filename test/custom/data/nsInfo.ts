import { NsInfo } from 'magicalstrings'

export const nsInfo: NsInfo = {
    userClass: "user",
    starter: "n/a",
    codeName: "MyApp",
    template: {
        dir: "/home/yisroel/projects/backend/export-server-all/export-server/src/custom/commands/../../node_modules/@nostackapp/exporter",
        name: "exporter",
        version: "0",
    },
    general: {
        units: [
            {
                unit: "AddUnit",
                role: "DemoDelete",
                queryString: "MATCH (AddRootType:AddRootType)\nOPTIONAL MATCH (AddRootType)-[:test]->(AddSubRootType:AddSubRootType)\nOPTIONAL MATCH (AddRootType)-[:test]->(AddSubType:AddSubType)\nWITH \n    COLLECT ({\n        id: AddSubRootType.id,\n        value: AddSubRootType.value\n    }) as AddSubRootTypes, \n    COLLECT ({\n        id: AddSubType.id,\n        value: AddSubType.value\n    }) as AddSubTypes, AddRootType\n\nRETURN AddRootType.id as id, AddRootType.value as value, AddSubRootTypes, AddSubTypes\n    ",
                shownTypes: [
                ],
                parentList: [
                    {
                        unit: "AddUnit",
                        parent: "AddRootType",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "Yj7EsRtrd_8_XNKMUwFLK",
                                name: "AddSubRootType",
                                kind: "multiple",
                            },
                            {
                                assn: "3Xuo520mTAKV_rf44VC-6",
                                name: "AddSubType",
                                kind: "multiple",
                            },
                        ],
                    },
                ],
            },
            {
                unit: "UnitLoripam",
                role: "loripamClass",
                queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                shownTypes: [
                ],
                parentList: [
                ],
            },
            {
                unit: "PaulineUnit",
                role: "PaulineClass",
                queryString: "MATCH (paulineRootType:PaulineRootType)\n\nWHERE paulineRootType.value like \"Testing\"\n     AND paulineRootType.value = \"Testing\"\nOPTIONAL MATCH (paulineRootType)-[:SampleAssnName]->(PaulineSubType:PaulineSubType)\nWITH \n    COLLECT ({\n        id: PaulineSubType.id,\n        value: PaulineSubType.value\n    }) as PaulineSubTypes, paulineRootType\n\nRETURN paulineRootType.id as id, paulineRootType.value as value, PaulineSubTypes\n    ",
                shownTypes: [
                ],
                parentList: [
                    {
                        unit: "PaulineUnit",
                        parent: "paulineRootType",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "ZCJj1tEbuDO_nT4XzkQCk",
                                name: "PaulineSubType",
                                kind: "multiple",
                            },
                        ],
                    },
                ],
            },
            {
                unit: "aaaa",
                role: "ThabungUCv1",
                queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                shownTypes: [
                ],
                parentList: [
                ],
            },
            {
                unit: "UnitInfo",
                role: "ThabungUCv1",
                queryString: "MATCH (Type9991:Type9991)\n\nWHERE Type9991.value > \"123\"\n     AND Type9991.value > \"hello\"\nOPTIONAL MATCH (Type9991)-[:testing]->(SubType9123:SubType9123)\nWITH \n    COLLECT ({\n        id: SubType9123.id,\n        value: SubType9123.value\n    }) as SubType9123s, Type9991\n\nRETURN Type9991.id as id, Type9991.value as value, SubType9123s\n    ",
                shownTypes: [
                ],
                parentList: [
                    {
                        unit: "UnitInfo",
                        parent: "Type9991",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "VWXu8IDOLBvPSkblKkr91",
                                name: "SubType9123",
                                kind: "multiple",
                            },
                        ],
                    },
                ],
            },
            {
                unit: "YisUnit2",
                role: "YisroelClassv1",
                queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                shownTypes: [
                ],
                parentList: [
                ],
            },
            {
                unit: "YisUnit1",
                role: "YisroelClassv1",
                queryString: "MATCH (YisUnit1Root1:YisUnit1Root1)\n\nWHERE YisUnit1Root1.value = \"Test\"\n     AND YisUnit1Root1.value = \"Hello\"\n     AND YisUnit1Root1.value = \"Testing\"\nOPTIONAL MATCH (YisUnit1Root1)-[:test]->(YisChild2:YisChild2)\nOPTIONAL MATCH (YisChild2)-[:test]->(YisGrandChild2:YisGrandChild2)\nOPTIONAL MATCH (YisGrandChild2)-[:Test]->(GGrandChild1:GGrandChild1)\nOPTIONAL MATCH (YisUnit1Root1)-[:test]->(YisChild1:YisChild1)\nOPTIONAL MATCH (YisChild1)-[:test]->(YosGransCHild1:YosGransCHild1)\nWITH \n    COLLECT ({\n        id: GGrandChild1.id,\n        value: GGrandChild1.value\n    }) as GGrandChild1s, YisGrandChild2, YosGransCHild1, YisChild2, YisChild1, YisUnit1Root1\nWITH \n    COLLECT ({\n        id: YisGrandChild2.id,\n        value: YisGrandChild2.value,\nGGrandChild1s: GGrandChild1s\n    }) as YisGrandChild2s, \n    COLLECT ({\n        id: YosGransCHild1.id,\n        value: YosGransCHild1.value\n    }) as YosGransCHild1s, YisChild2, YisChild1, YisUnit1Root1\nWITH \n    COLLECT ({\n        id: YisChild2.id,\n        value: YisChild2.value,\nYisGrandChild2s: YisGrandChild2s\n    }) as YisChild2s, \n    COLLECT ({\n        id: YisChild1.id,\n        value: YisChild1.value,\nYosGransCHild1s: YosGransCHild1s\n    }) as YisChild1s, YisUnit1Root1\n\nRETURN YisUnit1Root1.id as id, YisUnit1Root1.value as value, YisChild2s, YisChild1s\n    ",
                shownTypes: [
                ],
                parentList: [
                    {
                        unit: "YisUnit1",
                        parent: "YisGrandChild2",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "JRsm75aC6Icr_4nkmX_Ra",
                                name: "GGrandChild1",
                                kind: "single",
                            },
                        ],
                    },
                    {
                        unit: "YisUnit1",
                        parent: "YisChild2",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "GlwwIzuYMFdl6QyUV3RTP",
                                name: "YisGrandChild2",
                                kind: "single",
                            },
                        ],
                    },
                    {
                        unit: "YisUnit1",
                        parent: "YisChild1",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "Wym_YNpuvcIwUp-Oi4ryo",
                                name: "YosGransCHild1",
                                kind: "multiple",
                            },
                        ],
                    },
                    {
                        unit: "YisUnit1",
                        parent: "YisUnit1Root1",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "EBP1WsJotuKZ2O0rSVSpM",
                                name: "YisChild2",
                                kind: "multiple",
                            },
                            {
                                assn: "8qy_DfFJzT7nTgvyMFk8M",
                                name: "YisChild1",
                                kind: "single",
                            },
                        ],
                    },
                ],
            },
            {
                unit: "YisroelUnit1",
                role: "sampleForYisroel",
                queryString: "MATCH (YisRoot1:YisRoot1)\nOPTIONAL MATCH (YisRoot1)-[:test]->(child2:Child2)\n\nWHERE child2.value = \"fritz\"\n     AND child2.value = \"New York\"\n     AND child2.value = \"New York\"\n     AND child2.value = \"New York\"\n     AND child2.value = \"New York\"\nOPTIONAL MATCH (child2)-[:test]->(grandchild2_dot_1:Grandchild2_dot_1)\nWITH \n    COLLECT ({\n        id: grandchild2_dot_1.id,\n        value: grandchild2_dot_1.value\n    }) as grandchild2_dot_1s, child2, YisRoot1\nWITH \n    COLLECT ({\n        id: child2.id,\n        value: child2.value,\ngrandchild2_dot_1s: grandchild2_dot_1s\n    }) as child2s, YisRoot1\n\nRETURN YisRoot1.id as id, YisRoot1.value as value, child2s\n    ",
                shownTypes: [
                ],
                parentList: [
                    {
                        unit: "YisroelUnit1",
                        parent: "child2",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "dM-iuakIIkdXll20jdaGO",
                                name: "grandchild2_dot_1",
                                kind: "single",
                            },
                        ],
                    },
                    {
                        unit: "YisroelUnit1",
                        parent: "YisRoot1",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "e9pAb-GVGrVQasmty8kCM",
                                name: "child2",
                                kind: "multiple",
                            },
                        ],
                    },
                ],
            },
            {
                unit: "sampSource",
                role: "sampUctest",
                queryString: "MATCH (sampType1:SampType1)\n\nWHERE sampType1.value > \"ValueTwo\"\n     AND sampType1.value > \"ValueOne\"\nOPTIONAL MATCH (sampType1)-[:assnName]->(sampType2:SampType2)\nWITH \n    COLLECT ({\n        id: sampType2.id,\n        value: sampType2.value\n    }) as sampType2s, sampType1\n\nRETURN sampType1.id as id, sampType1.value as value, sampType2s\n    ",
                shownTypes: [
                ],
                parentList: [
                    {
                        unit: "sampSource",
                        parent: "sampType1",
                        labels: [
                        ],
                        children: [
                            {
                                assn: "-sR9T3xhRd8_owSkwd8-E",
                                name: "sampType2",
                                kind: "MULTIPLE",
                            },
                        ],
                    },
                ],
            },
            {
                unit: "UnitInfoP1",
                role: "p1",
                queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                shownTypes: [
                ],
                parentList: [
                ],
            },
            {
                unit: "uitm-1-1-1-2-2-3",
                role: "ThabungUC",
                queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                shownTypes: [
                ],
                parentList: [
                ],
            },
            {
                unit: "fooUnit",
                role: "changedName",
                queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                shownTypes: [
                ],
                parentList: [
                ],
            },
            {
                unit: "fooUnit",
                role: "changedName",
                queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                shownTypes: [
                ],
                parentList: [
                ],
            },
        ],
        types: [
            {
                singular: "AddRootType",
                capitalized: "AddRootType",
                children: [
                    {
                        name: "AddSubRootType",
                        fieldName: "AddUnitAddSubRootTypes",
                        relationDirective: "@relation(name: \"Yj7EsRtrd_8_XNKMUwFLK\", direction: OUT)",
                    },
                    {
                        name: "AddSubType",
                        fieldName: "AddUnitAddSubTypes",
                        relationDirective: "@relation(name: \"3Xuo520mTAKV_rf44VC-6\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "AddSubRootType",
                capitalized: "AddSubRootType",
                children: [
                ],
            },
            {
                singular: "AddSubType",
                capitalized: "AddSubType",
                children: [
                ],
            },
            {
                singular: "GGrandChild1",
                capitalized: "GGrandChild1",
                children: [
                ],
            },
            {
                singular: "PaulineSubType",
                capitalized: "PaulineSubType",
                children: [
                ],
            },
            {
                singular: "SubType9123",
                capitalized: "SubType9123",
                children: [
                ],
            },
            {
                singular: "Type71.3",
                capitalized: "Type71.3",
                children: [
                ],
            },
            {
                singular: "Type71.4",
                capitalized: "Type71.4",
                children: [
                ],
            },
            {
                singular: "Type89.1",
                capitalized: "Type89.1",
                children: [
                ],
            },
            {
                singular: "Type89.2",
                capitalized: "Type89.2",
                children: [
                ],
            },
            {
                singular: "Type9991",
                capitalized: "Type9991",
                children: [
                    {
                        name: "SubType9123",
                        fieldName: "SubType9123s",
                        relationDirective: "@relation(name: \"VWXu8IDOLBvPSkblKkr91\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "YisChild1",
                capitalized: "YisChild1",
                children: [
                    {
                        name: "YosGransCHild1",
                        fieldName: "YosGransCHild1s",
                        relationDirective: "@relation(name: \"Wym_YNpuvcIwUp-Oi4ryo\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "YisChild2",
                capitalized: "YisChild2",
                children: [
                    {
                        name: "YisGrandChild2",
                        fieldName: "YisGrandChild2s",
                        relationDirective: "@relation(name: \"GlwwIzuYMFdl6QyUV3RTP\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "YisGrandChild2",
                capitalized: "YisGrandChild2",
                children: [
                    {
                        name: "GGrandChild1",
                        fieldName: "GGrandChild1s",
                        relationDirective: "@relation(name: \"JRsm75aC6Icr_4nkmX_Ra\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "YisRoot1",
                capitalized: "YisRoot1",
                children: [
                    {
                        name: "child2",
                        fieldName: "child2s",
                        relationDirective: "@relation(name: \"e9pAb-GVGrVQasmty8kCM\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "YisUnit1Root1",
                capitalized: "YisUnit1Root1",
                children: [
                    {
                        name: "YisChild2",
                        fieldName: "YisUnit1YisChild2s",
                        relationDirective: "@relation(name: \"EBP1WsJotuKZ2O0rSVSpM\", direction: OUT)",
                    },
                    {
                        name: "YisChild1",
                        fieldName: "YisUnit1YisChild1s",
                        relationDirective: "@relation(name: \"8qy_DfFJzT7nTgvyMFk8M\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "YosGransCHild1",
                capitalized: "YosGransCHild1",
                children: [
                ],
            },
            {
                singular: "child2",
                capitalized: "Child2",
                children: [
                    {
                        name: "grandchild2_dot_1",
                        fieldName: "grandchild2_dot_1s",
                        relationDirective: "@relation(name: \"dM-iuakIIkdXll20jdaGO\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "grandchild1.1",
                capitalized: "Grandchild1.1",
                children: [
                ],
            },
            {
                singular: "grandchild2.1",
                capitalized: "Grandchild2.1",
                children: [
                ],
            },
            {
                singular: "item",
                capitalized: "Item",
                children: [
                ],
            },
            {
                singular: "paulineRootType",
                capitalized: "PaulineRootType",
                children: [
                    {
                        name: "PaulineSubType",
                        fieldName: "PaulineSubTypes",
                        relationDirective: "@relation(name: \"ZCJj1tEbuDO_nT4XzkQCk\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "sampType1",
                capitalized: "SampType1",
                children: [
                    {
                        name: "sampType2",
                        fieldName: "sampType2s",
                        relationDirective: "@relation(name: \"-sR9T3xhRd8_owSkwd8-E\", direction: OUT)",
                    },
                ],
            },
            {
                singular: "sampType2",
                capitalized: "SampType2",
                children: [
                ],
            },
            {
                singular: "type1002",
                capitalized: "Type1002",
                children: [
                ],
            },
        ],
        roles: [
            {
                singular: "1",
                capitalized: "1",
            },
            {
                singular: "123",
                capitalized: "123",
            },
            {
                singular: "321",
                capitalized: "321",
            },
            {
                singular: "654",
                capitalized: "654",
            },
            {
                singular: "DemoDelete",
                capitalized: "DemoDelete",
            },
            {
                singular: "Moderator",
                capitalized: "Moderator",
            },
            {
                singular: "PaulineClass",
                capitalized: "PaulineClass",
            },
            {
                singular: "TEST",
                capitalized: "TEST",
            },
            {
                singular: "TESTING REFETCH",
                capitalized: "TESTING REFETCH",
            },
            {
                singular: "Test",
                capitalized: "Test",
            },
            {
                singular: "ThabungUC",
                capitalized: "ThabungUC",
            },
            {
                singular: "ThabungUCv1",
                capitalized: "ThabungUCv1",
            },
            {
                singular: "YisroelClassv1",
                capitalized: "YisroelClassv1",
            },
            {
                singular: "changedName",
                capitalized: "ChangedName",
            },
            {
                singular: "eeeee",
                capitalized: "Eeeee",
            },
            {
                singular: "loripamClass",
                capitalized: "LoripamClass",
            },
            {
                singular: "p1",
                capitalized: "P1",
            },
            {
                singular: "sampUctest",
                capitalized: "SampUctest",
            },
            {
                singular: "sampleForYisroel",
                capitalized: "SampleForYisroel",
            },
        ],
        stackInfo: {
            stackId: "us-east-1_kYI8RNIb1",
            aws: {
                region: "us-east-1",
                access: "AGEKFSGLLBBdEE",
                secret: "8fEqkc5EWze09W9ymFQYjmVsY8BWkxPQ//bA232jjj",
            },
            neo4j: {
                URI: "neo4j+s://8e153e87.databases.neo4j.io",
                USER: "neo4j",
                PASSWORD: "7rBKRxO8QGKLOGEOOOOOOOOOOOOOOOOOOyt0",
            },
            cognito: {
                CLIENT: "32die49k9pojqu6r3eb8evuq37",
                POOL: "us-east-1_2AZlWz0sY",
            },
            lambda: "us-glelasf33lkj323243",
            uri: "osc6oeg32a.execute-api.us-east-1.amazonaws.com",
        },
    },
    units: {
    },
    topUnits: [
    ],
    static: {
        userType: {
            "1": {
                slug: "1",
            },
            "123": {
                slug: "123",
            },
            "321": {
                slug: "321",
            },
            "654": {
                slug: "654",
            },
            demoDelete: {
                slug: "Demodelete",
            },
            loripamClass: {
                slug: "Loripamclass",
            },
            paulineClass: {
                slug: "Paulineclass",
            },
            thabungUCv1: {
                slug: "Thabungucv1",
            },
            yisroelClassv1: {
                slug: "Yisroelclassv1",
            },
            sampleForYisroel: {
                slug: "Sampleforyisroel",
            },
            sampUctest: {
                slug: "Sampuctest",
            },
            p1: {
                slug: "P1",
            },
            test: {
                slug: "Test",
            },
            eeeee: {
                slug: "Eeeee",
            },
            "tESTING REFETCH": {
                slug: "Testing refetch",
            },
            tEST: {
                slug: "Test",
            },
            thabungUC: {
                slug: "Thabunguc",
            },
            changedName: {
                slug: "Changedname",
            },
        },
        unit: {
            AddUnit: {
                slug: "AddUnit",
                specs: {
                    name: "AddUnit",
                    queryString: "MATCH (AddRootType:AddRootType)\nOPTIONAL MATCH (AddRootType)-[:test]->(AddSubRootType:AddSubRootType)\nOPTIONAL MATCH (AddRootType)-[:test]->(AddSubType:AddSubType)\nWITH \n    COLLECT ({\n        id: AddSubRootType.id,\n        value: AddSubRootType.value\n    }) as AddSubRootTypes, \n    COLLECT ({\n        id: AddSubType.id,\n        value: AddSubType.value\n    }) as AddSubTypes, AddRootType\n\nRETURN AddRootType.id as id, AddRootType.value as value, AddSubRootTypes, AddSubTypes\n    ",
                },
            },
            UnitLoripam: {
                slug: "UnitLoripam",
                specs: {
                    name: "UnitLoripam",
                    queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                },
            },
            PaulineUnit: {
                slug: "PaulineUnit",
                specs: {
                    name: "PaulineUnit",
                    queryString: "MATCH (paulineRootType:PaulineRootType)\n\nWHERE paulineRootType.value like \"Testing\"\n     AND paulineRootType.value = \"Testing\"\nOPTIONAL MATCH (paulineRootType)-[:SampleAssnName]->(PaulineSubType:PaulineSubType)\nWITH \n    COLLECT ({\n        id: PaulineSubType.id,\n        value: PaulineSubType.value\n    }) as PaulineSubTypes, paulineRootType\n\nRETURN paulineRootType.id as id, paulineRootType.value as value, PaulineSubTypes\n    ",
                },
            },
            aaaa: {
                slug: "aaaa",
                specs: {
                    name: "aaaa",
                    queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                },
            },
            UnitInfo: {
                slug: "UnitInfo",
                specs: {
                    name: "UnitInfo",
                    queryString: "MATCH (Type9991:Type9991)\n\nWHERE Type9991.value > \"123\"\n     AND Type9991.value > \"hello\"\nOPTIONAL MATCH (Type9991)-[:testing]->(SubType9123:SubType9123)\nWITH \n    COLLECT ({\n        id: SubType9123.id,\n        value: SubType9123.value\n    }) as SubType9123s, Type9991\n\nRETURN Type9991.id as id, Type9991.value as value, SubType9123s\n    ",
                },
            },
            YisUnit2: {
                slug: "YisUnit2",
                specs: {
                    name: "YisUnit2",
                    queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                },
            },
            YisUnit1: {
                slug: "YisUnit1",
                specs: {
                    name: "YisUnit1",
                    queryString: "MATCH (YisUnit1Root1:YisUnit1Root1)\n\nWHERE YisUnit1Root1.value = \"Test\"\n     AND YisUnit1Root1.value = \"Hello\"\n     AND YisUnit1Root1.value = \"Testing\"\nOPTIONAL MATCH (YisUnit1Root1)-[:test]->(YisChild2:YisChild2)\nOPTIONAL MATCH (YisChild2)-[:test]->(YisGrandChild2:YisGrandChild2)\nOPTIONAL MATCH (YisGrandChild2)-[:Test]->(GGrandChild1:GGrandChild1)\nOPTIONAL MATCH (YisUnit1Root1)-[:test]->(YisChild1:YisChild1)\nOPTIONAL MATCH (YisChild1)-[:test]->(YosGransCHild1:YosGransCHild1)\nWITH \n    COLLECT ({\n        id: GGrandChild1.id,\n        value: GGrandChild1.value\n    }) as GGrandChild1s, YisGrandChild2, YosGransCHild1, YisChild2, YisChild1, YisUnit1Root1\nWITH \n    COLLECT ({\n        id: YisGrandChild2.id,\n        value: YisGrandChild2.value,\nGGrandChild1s: GGrandChild1s\n    }) as YisGrandChild2s, \n    COLLECT ({\n        id: YosGransCHild1.id,\n        value: YosGransCHild1.value\n    }) as YosGransCHild1s, YisChild2, YisChild1, YisUnit1Root1\nWITH \n    COLLECT ({\n        id: YisChild2.id,\n        value: YisChild2.value,\nYisGrandChild2s: YisGrandChild2s\n    }) as YisChild2s, \n    COLLECT ({\n        id: YisChild1.id,\n        value: YisChild1.value,\nYosGransCHild1s: YosGransCHild1s\n    }) as YisChild1s, YisUnit1Root1\n\nRETURN YisUnit1Root1.id as id, YisUnit1Root1.value as value, YisChild2s, YisChild1s\n    ",
                },
            },
            YisroelUnit1: {
                slug: "YisroelUnit1",
                specs: {
                    name: "YisroelUnit1",
                    queryString: "MATCH (YisRoot1:YisRoot1)\nOPTIONAL MATCH (YisRoot1)-[:test]->(child2:Child2)\n\nWHERE child2.value = \"fritz\"\n     AND child2.value = \"New York\"\n     AND child2.value = \"New York\"\n     AND child2.value = \"New York\"\n     AND child2.value = \"New York\"\nOPTIONAL MATCH (child2)-[:test]->(grandchild2_dot_1:Grandchild2_dot_1)\nWITH \n    COLLECT ({\n        id: grandchild2_dot_1.id,\n        value: grandchild2_dot_1.value\n    }) as grandchild2_dot_1s, child2, YisRoot1\nWITH \n    COLLECT ({\n        id: child2.id,\n        value: child2.value,\ngrandchild2_dot_1s: grandchild2_dot_1s\n    }) as child2s, YisRoot1\n\nRETURN YisRoot1.id as id, YisRoot1.value as value, child2s\n    ",
                },
            },
            sampSource: {
                slug: "sampSource",
                specs: {
                    name: "sampSource",
                    queryString: "MATCH (sampType1:SampType1)\n\nWHERE sampType1.value > \"ValueTwo\"\n     AND sampType1.value > \"ValueOne\"\nOPTIONAL MATCH (sampType1)-[:assnName]->(sampType2:SampType2)\nWITH \n    COLLECT ({\n        id: sampType2.id,\n        value: sampType2.value\n    }) as sampType2s, sampType1\n\nRETURN sampType1.id as id, sampType1.value as value, sampType2s\n    ",
                },
            },
            UnitInfoP1: {
                slug: "UnitInfoP1",
                specs: {
                    name: "UnitInfoP1",
                    queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                },
            },
            "uitm-1-1-1-2-2-3": {
                slug: "uitm-1-1-1-2-2-3",
                specs: {
                    name: "uitm-1-1-1-2-2-3",
                    queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                },
            },
            fooUnit: {
                slug: "fooUnit",
                specs: {
                    name: "fooUnit",
                    queryString: "MATCH (undefined:)\n\n\n\nRETURN undefined",
                },
            },
        },
    },
}