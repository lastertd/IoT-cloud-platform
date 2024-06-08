

## project of web

web端代码

技术栈: vue3、nuxt3、element plus、tailwind css、vueuse...



初始化

 ~~~
  npm install
 ~~~

启动项目
 ~~~
  npm run dev 
 ~~~

ps: 注意设置env环境文件


## project of server

后端代码

技术栈: nest.js、typerOrm、mysql2、class-validator...

初始化

 ~~~
  npm install
 ~~~

启动主项目
 ~~~
  npm run dev 
 ~~~
启动mqtt微服务
 ~~~
  npm run dev  mqtt
 ~~~

ps: 注意设置env环境文件

## project of test

测试文件

## project of filter

用于nuxt3页面过滤

1. 安装

    ~~~
     npm i nuxt-plugin-filter -D
    ~~~

2. 使用

    ~~~ 
    // nuxt.config.ts
     
    export default defineNuxtConfig({
      modules: [ "nuxt-plugin-filter"],
      pageFilter: { regs: [/\/types\//, /\/css\//, /\/components\//] },
    });
    
    
    ~~~



