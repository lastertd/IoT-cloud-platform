declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    env: "TEST" | "PRE" | "PROD";
  }
}
declare global {
  interface Window {
    pandoraInstance: any;
    ___is__client: boolean;
  }
}

export {};
