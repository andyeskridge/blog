<script setup lang="ts">
defineProps({
  image: {
    type: String,
    default: null,
  },
  imageAlt: {
    type: String,
    default: 'Hero Image',
  },
})
</script>

<template>
  <section>
    <div class="grid grid-cols-1 gap-1">
      <div class="content">
        <div class="text-4xl font-bold">
          <ContentSlot :use="$slots.title" unwrap="p">
            Hero title
          </ContentSlot>
        </div>
        <div class="mt-2 text-xl">
          <ContentSlot :use="$slots.description" unwrap="p">
            Hero description
          </ContentSlot>
        </div>
      </div>
      <NuxtImg
        v-if="image"
        class="w-full aspect-video object-cover rounded-md"
        :src="image"
        :alt="imageAlt"
      />
    </div>
  </section>
</template>
