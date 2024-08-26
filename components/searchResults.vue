<script setup>
const props = defineProps({ items: Array, query: String, nameType: String })
const { items, query, nameType } = toRefs(props)

const name = nameType?.value

const filteredItems = computed(() => {
  if (!query.value) { return items?.value }
  return items?.value?.filter((item) => {
    const searchString = query?.value?.toLowerCase()
    return (
      item.names.original.toLowerCase().includes(searchString) ||
            item.names.en.toLowerCase().includes(searchString) ||
            item.names.jp.toLowerCase().includes(searchString)
    )
  })
})
</script>

<template>
  <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <li v-for="item in filteredItems" :key="item.id.String">
      <div class="flex flex-col md:flex-row md:justify-between p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <div class="md:w-2/3">
          <h1 class="text-2xl text-blue-400 dark:text-blue-400 font-semibold">
            {{ item.names.original }}
          </h1>
          <h2 class="text-lg text-gray-700 dark:text-gray-300">
            {{ item.names.en }}
          </h2>
          <h2 class="text-lg text-gray-700 dark:text-gray-300">
            {{ item.names.jp }}
          </h2>
          <NuxtLink
            :to="`/${name}/${item.id.id.String}`"
            class="mt-2 text-blue-500 hover:underline block"
          >
            Click ME
          </NuxtLink>
        </div>
        <div class="mt-4 md:mt-0 md:w-1/3 flex justify-center md:justify-start">
          <img :src="item.image_urls[0]" :alt="`${name} image`" class="w-full md:w-64 h-full object-cover rounded-lg">
        </div>
      </div>
    </li>
  </ul>
</template>
