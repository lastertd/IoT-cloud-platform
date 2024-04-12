import { defineNuxtModule, extendPages } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "page-filter",
    configKey: "pageFilter"
  },
  defaults: {
    regs: []
  },
  setup(options) {
    extendPages((pages) => {
      function removePagesMatching(pattern, pages2 = []) {
        const pagesToRemove = [];
        for (const page of pages2) {
          if (pattern.test(page.file ?? "")) {
            pagesToRemove.push(page);
          } else {
            removePagesMatching(pattern, page.children);
          }
        }
        for (const page of pagesToRemove) {
          pages2.splice(pages2.indexOf(page), 1);
        }
      }
      options.regs?.forEach((reg) => {
        removePagesMatching(reg, pages);
      });
    });
  }
});

export { module as default };
