<template>
  <article ref="article" class="max-w-prose mx-auto py-4 sm:py-12">
    <!-- TODO: could be refactored as a transparent ButtonLink -->
    <NuxtLink
      :to="parentPath"
      class="inline-flex items-center text-lg border-b border-solid"
    >
      <Icon name="ph:arrow-left" class="w-4 h-4 mr-2" />
      <span>
        Back
      </span>
    </NuxtLink>
    <header class="mt-16 mb-12">
      <h1
        v-if="page?.title"
        class="text-5xl font-semibold mb-4"
      >
        {{ page.title }}
      </h1>
      <time
        v-if="page?.date"
        class="text-gray-500"
        :datetime="page.date"
      >
        {{ formatDate(page.date) }}
      </time>
    </header>

    <div class="prose">
      <slot />
      <div class="flex justify-end items-center w-full">
        <ProseA class="cursor-pointer text-lg" @click.prevent.stop="onBackToTop">
          Back to top
          <Icon name="material-symbols:arrow-upward" />
        </ProseA>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const { page } = useContent()
const route = useRoute()

const article = ref<HTMLElement | null>(null)

if (page.value) {
  const linkArray = []
  const metaArray = []

  if (page.value.cover) {
    metaArray.push({ property: 'og:image', content: page.value.cover })
  }
  if (page.value.canonical) {
    linkArray.push({ rel: 'canonical', href: page.value.canonical })
  }
  useHead({
    meta: metaArray,
    link: linkArray,
  })
}

const parentPath = computed(
  () => {
    const pathTabl = route.path.split('/')
    pathTabl.pop()
    return pathTabl.join('/')
  },
)

const onBackToTop = () => {
  article.value?.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>
