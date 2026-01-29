<template>
  <UContainer class="py-10 prose dark:prose-invert">
    <ContentRenderer v-if="page" :value="page" />
    <div v-else class="text-center text-red-500">
       Document not found at path: {{ docPath }}
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>
