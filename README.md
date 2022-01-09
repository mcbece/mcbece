# 基岩版命令编写助手 | MCBE Command Editer

## 制作中...

> 重要通知：
> > 咕咕咕

### 目前进度：以下为部分未完成任务

- 主要html：
    - 编写 div#option 对应的设置列表
    - 其他优化
- 主要json：
    - 查看 [mcbelist-api](https://github.com/PFiS1737/mcbelist-api)
- 优化：
    - 桌面端tab键支持
    - 移动端布局优化
    - 多语言优化
    - 长列表加载优化（暂时完成）
    - 穷举助手
    - JSON 编辑器
    - ...
- 后端
    - cookie
        - 使可以通过 GET 中的 cookie, 按需进行 SSR
    - ES Module
        - 由于 vercel 会将 esm 的文件自动编译成 commonjs, 导致 json 部分无法正常导入
        - 正在研究解决方法
        - 待 [mcbelist-api](https://github.com/PFiS1737/mcbelist-api) 制作完成，则可在服务器层面生成全部 json, 可解决此问题
        - 此问题暂时搁置