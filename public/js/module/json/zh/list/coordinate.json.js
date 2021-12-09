export var json = {
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
                    }
                },
                {
                    "name": "demo"
                }
            ]
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
                    "template": {}
                }
            ]
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
                    "template": {}
                }
            ]
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