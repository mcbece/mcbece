export var json = {
    "y": [
       {
            "template": {
                "input": {
                    "text": "{name} "
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
            "info": "相对角度",
            "input": {
                "text": "{name}"
            }
        },
        {
            "name": "-90.0",
            "info": "竖直向上"
        },
        {
            "name": "90.0",
            "info": "竖直向下"
        },
    ],
    "x": [
        {
            "template": {
                "input": {
                    "text": "{name} "
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
            "info": "相对角度",
            "input": {
                "text": "{name}"
            }
        },
        {
            "name": "-180.0",
            "info": "正北（与 180.0 重合）"
        },
        {
            "name": "-90.0",
            "info": "正东"
        },
        {
            "name": "0.0",
            "info": "正南"
        },
        {
            "name": "90.0",
            "info": "正西"
        }
    ]
}