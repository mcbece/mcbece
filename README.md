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
        - 框架化
        - input
            - 优化（甚至重构）自动补全逻辑
                - 支持已用已输入的内容替换语法提示的相关内容
                - 坐标及角度
                - 目标选择器
                    - `scores`, `hasitem` 等涉及 `{}` 块的参数
                - 命令嵌套
            - 桌面端tab键支持
        - list
            - vs
                - 完善 `Virtual Scroll`
                    - 滑到两头会卡住
                    - 支持加载不同高度的列表项
                    - 使用 `IntersectionObserver` 优化虚拟滚动
        - grammar
            - 自动滚动的语法提示栏
            - 全面改进 `grammar` 数据的读取逻辑以适应更复杂的语法及其他模块的调用需求
                - 可自选的三种数据结构...
        - i18n
            - 完善多语言优化
        - event
            - 添加更多精细化的事件，以实现更精细的扩展
        - plugins
            - option
                - 完善及优化 `WebOption` 模块
                    - 支持使用键值对预定设置内容
                - 增加历史记录及收藏功能
        - custom
            - 支持修改已经定义的部分
    - `Service Worker` 的相关文件由服务器打包生成
    - 穷举助手
    - JSON 编辑器
- docs
    - 编写 `core:custom` 的用户文档
    - 编写 `core` 核心的 `api` 文档
- ci
    - 适配 `vercel` 等部署平台
