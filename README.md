## files -> filter

用于nuxt3页面过滤

### 使用方式

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

## files -> web

web端代码
