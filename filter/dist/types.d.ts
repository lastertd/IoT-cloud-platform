
import type { ModuleOptions } from './module'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['pageFilter']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['pageFilter']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['pageFilter']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['pageFilter']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module'
