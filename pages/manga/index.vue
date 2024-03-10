<script setup>
const search = ref('')
const nuxtApp = useNuxtApp()
const { data, status } = await useFetch('/api/manga/', {
  key: 'MangaSearchResults',
  getCachedData (key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
})

definePageMeta({
  layout: false
})
</script>

<template>
  <div>
    <NuxtLayout name="search">
      <!-- Navigation -->
      <template #nav>
        <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
          Manga Search
        </h1>
        <NuxtLink to="/" class="link">
          Home
        </NuxtLink>
        <NuxtLink to="anime" class="link">
          Anime
        </NuxtLink>
        <NuxtLink
          to="/manga/create"
          class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
        >
          Create
        </NuxtLink>
      </template>

      <!-- manga Search -->
      <template #input>
        <input
          id="default-search"
          v-model="search"
          autocomplete="off"
          type="search"
          name="search"
          placeholder="Search ..."
          class="input-search"
        >
      </template>
      <!-- manga Search Results -->
      <template #default>
        <div v-if="status == 'pending'" class="text-center">
          Loading…
        </div>
        <div v-else-if="status == 'idle'" class="text-center">
          Idle.
        </div>
        <div v-else-if="status == 'error'" class="text-center">
          No results found.
        </div>
        <SearchResults v-else-if="status == 'success'" :items="data" :query="search" name-type="manga" />
        <div v-else>
          Unknown Event Happend
        </div>
      </template>
    </NuxtLayout>
  </div>
  <!-- <div class="bg-gray-100 dark:bg-gray-900 min-h-screen p-4" /> -->
</template>
