<script setup lang="ts">
import { useContentPreview } from '#imports'

type Article = {
  _path: string
  title: string
  date: string
  description: string
  badges?: { bg: string, text: string, content: string }[]
}

const props = defineProps({
  article: {
    type: Object,
    required: true,
    validator: (value: Article) => {
      if (value?._path && value.title) {
        return true
      }
      return false
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
})

const id = computed(() => {
  return (import.meta.dev || useContentPreview()?.isEnabled()) ? props.article?._id : undefined
})
</script>

<template>
  <article
    v-if="article._path && article.title"
    class="flex flex-col gap-4 "
    :class="{ 'featured': featured, '@md:flex-row': featured, 'gap-8': featured }"
    :data-content-id="id"
  >
    <div v-if="article.cover" class="flex">
      <div v-if="article?.badges" class="absolute flex flex-wrap gap-2 mt-2 ml-2">
        <span
          v-for="(badge, index) in article.badges"
          :key="index"
          class="p-1 rounded-sm text-xs font-bold"
          :style="{
            backgroundColor: badge?.bg || 'rgba(0, 0, 0, 0.3)',
            color: badge?.color || 'white',
          }"
        >
          {{ typeof badge === 'string' ? badge : badge.content }}
        </span>
      </div>
      <NuxtLink :to="article._path">
        <NuxtImg
          class="rounded-md w-full aspect-video object-cover"
          :src="article.cover"
          :alt="article.title"
        />
      </NuxtLink>
    </div>

    <div class="flex flex-col flex-1">
      <NuxtLink
        :to="article._path"
        class="text-sm mb-2 font-semibold line-clamp-2"
        :class="{ 'text-2xl line-clamp-3': featured }"
      >
        <h1>
          {{ article.title }}
        </h1>
      </NuxtLink>

      <p class="mb-4 line-clamp-2" :class="{ 'line-clamp-4': featured }">
        {{ article.description }}
      </p>
      <time class="text-sm text-gray-500">
        {{ formatDate(article.date) }}
      </time>
    </div>
  </article>
</template>
