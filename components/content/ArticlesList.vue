<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const props = defineProps({
  path: {
    type: String,
    default: 'articles',
  },
})

const { data: _articles } = await useAsyncData(props.path, async () => await queryContent(withTrailingSlash(props.path)).sort({ date: -1 }).find())

const articles = computed(() => _articles.value || [])
</script>

<template>
  <div v-if="articles?.length" class="sm:px-12 md:px-0">
    <div class="my-12 md:my-8">
      <ArticlesListItem :article="articles[0]" :featured="true" />
    </div>
    <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <ArticlesListItem v-for="(article, index) in articles.slice(1)" :key="index" :article="article" />
    </div>
  </div>
</template>
