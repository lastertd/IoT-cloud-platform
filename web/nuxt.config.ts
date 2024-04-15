const config233 = defineNuxtConfig({
  // ssr: false,
  devtools: { enabled: false },
  // @ts-ignore
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-plugin-filter", "@element-plus/nuxt"],
  pageFilter: { regs: [/\/types\//, /\/css\//, /\/src\//, /\/components\//] },
  elementPlus: {
    importStyle: false
  },
  postcss: {
    plugins: {
      autoprefixer: {},
      cssnano: {},
      // https://github.com/cuth/postcss-pxtorem
      "postcss-pxtorem": {
        // 根元素（html）字体大小
        rootValue: 100,
        // 保留几位小数点后几位
        unitPrecision: 3,
        // 哪些css规则需要被转化，“!border-radius“ 这种则是不转化
        propList: ["*"],
        // 哪些特例选择器不需要被转化, 支持vue中scoped; 如果特例很多, 此规则可能会非常长
        selectorBlackList: ["--nopx"],
        // 转化后的css规则是替换原规则还是额外添加
        replace: true,
        // 是否媒体查询中的单位也被转化
        mediaQuery: false,
        // 最小需要替换的值， 小于此值的值不会被转化
        minPixelValue: 0,
        // 需要转化的单位，默认为px
        unit: "rpx"
      }
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 3090
  },
  // 全局样式引入， 需要注意的是nuxt引入全局样式有三处地方可以配置， app.head.styles, vite.??.scss也可以配置
  // 后两者一能引入css,二会存在重复引入问题
  css: ["assets/styles/index.scss"],
  app: {
    head: {
      script: [
        {
          src: "//unpkg.com/@element-plus/icons-vue"
        }
      ]
    }
  }
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default config233;
