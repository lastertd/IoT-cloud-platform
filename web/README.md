# admin-template

用于提供给不太注重性能的基础 vue + vite 的模板架子。比如各种管理平台(admin)系统

# 模板提供的开箱即用的功能如下:

1. tailwindcss 支持, 为了支持手机端 rem 布局默认去掉了所有跟 rem 相关的单位, 可以根据需要自行修改配置文件
2. 基于 vscode 的插件模块，保存代码自动执行 eslint fix 配置
3. eslint 提供了跟服务端一致的 rules
4. 提供了 alova, 并有基础代码组织结构模板
8. 提供了初始的 crs init config --openCheckCommits 命令。可以检测 git log 是否正确。需要放开 .husky/commit-msg 的最后一行话
9. 支持 git commit 的时候格式化代码样式
10. 支持了 nginx 的 history 的路由模式支持
11. pandora 集成，需要自己补全参数
12. @metaapp/amp-performance 集成
13. 添加 rpx 转化为 rem 的插件
14. 支持打包之后的代码兼容到谷歌 50+ 的版本

## TODO
1. vue-i18n 支持
2. .env 配置文件动态支持
3. eslint 跟服务端一致的 rules 补全
4. log-report 集成
6. APM 集成

# 发版

由于 nuxt3 需要使用 node 18+, 目前的 base 任务还是用的是 16+ 会导致发版失败。因此发版需要创建自定义任务，docker 文件已经放到了目录里面

## 自定义打包命令

创建任务的时候可以指定发版任务和发版参数，步骤如下:

1. 发版参数: Env={x} // 对应关系: docker:build:{x}
2. dockerfile 中做如下修改

```
ARG Env
RUN yarn docker:build:${Env}
# RUN yarn docker:build
```