export default {
    "x": [
        {
            "template": {
                "input": {
                    "text": "{name}"
                }
            },
            "value": [
                {
                    "extend": "next",
                    "template": {
                        "input": {
                            "replace": "none",
                            "text": "{name} "
                        }
                    },
                    "__app_list__": true,
                    "option": {
                        "searchable": false
                    }
                },
                {
                    "name": "test"
                }
            ],
            "__app_list__": true
        },
        {
            "name": "~",
            "info": "相对坐标"
        },
        {
            "name": "^",
            "info": "局部坐标"
        }
    ],
    "y": [
        {
            "template": {
                "input": {
                    "text": "{name}"
                }
            },
            "value": [
                {
                    "extend": "next",
                    "template": {},
                    "__app_list__": true,
                    "option": {
                        "searchable": false
                    }
                }
            ],
            "__app_list__": true
        },
        {
            "name": "~",
            "info": "相对坐标"
        },
        {
            "name": "^",
            "info": "局部坐标"
        }
    ],
    "z": [
        {
            "template": {
                "input": {
                    "text": "{name}"
                }
            },
            "value": [
                {
                    "extend": "next",
                    "template": {},
                    "__app_list__": true,
                    "option": {
                        "searchable": false
                    }
                }
            ],
            "__app_list__": true
        },
        {
            "name": "~",
            "info": "相对坐标"
        },
        {
            "name": "^",
            "info": "局部坐标"
        }
    ]
}