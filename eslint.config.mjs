import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}).override('nuxt/vue/rules', {
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
  },
})
