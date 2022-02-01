# 基岩版命令编写助手 | MCBE Command Editer

## 制作中...

> 重要通知：**咕咕咕**

#### 目前进度：以下为部分未完成任务

- 主要html：
    - ~~编写 `div#option` 对应的设置列表~~
    - 暂时取消设置界面的 Web UI 计划
- 主要json：
    - 查看 [mcbelist-api](https://github.com/PFiS1737/mcbelist-api)
- 主要js：
    - 框架化（基本完成）
        - 部分逻辑关系有待优化
    - 有关「加载列表时的重命名」、「正在输入的变量的类型的判断」的函数，以及这些内容的联动
    - 加载列表时，支持
        - 传入 `string` 作为列表索引名，查找并加载列表
        - 传入 `List`，以加载动态生成的列表
    - 更好的语法提示及自动补全模块
        - 对目标选择器的自动补全仍有些问题
            - `x`, `y`, `z` 等涉及坐标的参数
            - `scores`, `hasitem` 等涉及 `{}` 块的参数
        - 使用 `@option <option name> [value]` 快捷更改设置
            - 可用上述第三项优化
        - `execute` 命令还不能嵌套...（相当于不能用）
        - ...
    - 更多可由用户设置和在 `config` 中自定义的内容
        - ~~基于 `IndexedDB` 重新设计的 `WebOption` 类~~
        - 暂时取消该计划，继续用 `localStorage`
    - 长列表优化
        - 完善 `虚拟滚动（Virtual Scroll）`
            - 看不到滚动条
            - 滑到两头会卡住
            - 缓慢滑动时有隐约的抖动感
    - ...
- 优化：
    - 自动滚动的语法提示栏
    - 桌面端tab键支持
    - 移动端布局优化
    - 多语言优化
    - 长列表加载优化（暂时完成）
    - 穷举助手
    - JSON 编辑器
    - ...
- 后端
    - ~~cookie~~
        - ~~使可以通过 GET 中的 cookie, 按需进行 SSR~~
    - ~~ES Module~~
        - ~~由于 vercel 会将 esm 的文件自动编译成 commonjs, 导致部分无法正常导入~~
        - ~~正在研究解决方法~~
        - 暂时取消对 vercel 的支持
- 后期计划
    - 等有时间和设备的支持后，会视实际情况再决定要不要做
    - 使用 `webpack` 打包 `public/js/core` 及涉及的 `scss` 部分