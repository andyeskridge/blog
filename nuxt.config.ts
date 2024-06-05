import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  extends: ['@nuxt-themes/typography', '@nuxt-themes/elements'],

  runtimeConfig: {
    public: {
      FORMSPREE_URL: process.env.FORMSPREE_URL,
    },
  },

  pages: true,
  modules: [
    '@nuxt-themes/tokens',
    '@nuxthq/studio',
    '@nuxt/content',
    '@nuxthub/core',
  ],

  components: [
    { path: resolve('./components'), global: true },
    { path: resolve('./components/content'), global: true },
    { path: resolve('./components/data-entry'), global: true },
  ],

  css: [resolve('./assets/main.css')],

  colorMode: {
    classSuffix: '',
  },

  pinceau: {
    studio: true,
  },

  content: {
    documentDriven: true,
    navigation: {
      fields: ['navTitle'],
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: [
        'json',
        'js',
        'ts',
        'html',
        'css',
        'vue',
        'diff',
        'shell',
        'markdown',
        'yaml',
        'bash',
        'ini',
        'c',
        'cpp',
      ],
    },
  },

  typescript: {
    includeWorkspace: true,
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
    prerender: {
      ignore: [
        '/__pinceau_tokens_config.json',
        '/__pinceau_tokens_schema.json',
      ],
    },
  },

  devtools: {
    timeline: {
      enabled: true,
    },
  },

  hub: {
    cache: true,
  },
})
