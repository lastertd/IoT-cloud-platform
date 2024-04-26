const config233 = defineNuxtConfig({
  // ssr: false,
  devtools: { enabled: false },
  // @ts-ignore
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-plugin-filter",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt"
  ],
  pageFilter: { regs: [/\/types\//, /\/css\//, /\/src\//, /\/components\//] },
  elementPlus: {
    importStyle: false
  },
  postcss: {
    plugins: {
      autoprefixer: {},
      cssnano: {}
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
