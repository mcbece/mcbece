# 基岩版命令编写助手 | MCBE Command Editer

## 制作中...

> 重要通知：**咕咕咕**

### 近期计划

- feat
    - mcbelist-api
        - 优化后端获取列表内容的模块
        - 见 [mcbelist-api](https://github.com/PFiS1737/mcbelist-api)
    - mcbewscc
        - 支持使用 `WebSocket` 连接至游戏并直接执行命令
        - 见 [mcbewscc](https://github.com/PFiS1737/mcbewscc)
    - core
        - list
            - 支持 Sprite 插入
            - CSS 优化，加载内容较长的列表项时会出现换行，而不是截住或出现滚动条
                - 可以输入 '@list _command ' 看一下是什么意思
        - input
            - 优化（甚至重构）自动补全逻辑
                - 支持已用已输入的内容替换语法提示的相关内容
                - 坐标及角度
                - 目标选择器
                    - `scores`, `hasitem` 等涉及 `{}` 块的参数
                - 命令嵌套
        - grammar
            - 自动滚动的语法提示栏
            - 全面改进 `grammar` 数据的读取逻辑以适应更复杂的语法及其他模块的调用需求
                - 可自选的三种数据结构...
        - i18n
            - 完善多语言优化
        - custom
            - 写入功能，及可随时向正在加载的列表中增添已输入的内容
    - `Service Worker` 的相关文件由服务器打包生成
    - 穷举助手
    - JSON 编辑器
- docs
    - 编写 `core:custom` 的用户文档
    - 编写 `core` 核心的 `api` 文档
- ci
    - 适配 `vercel` 等部署平台
