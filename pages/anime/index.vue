<script setup>
const search = ref('')
const nuxtApp = useNuxtApp()
const { data, status, refresh } = await useLazyFetch('/api/anime/', {
  key: 'AnimeSearchResults',
  getCachedData (key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
})
// const filteredItems = data.value;

// const { en, original, jp } = data.value[0].names;
// console.log({ en, original, jp });
definePageMeta({
  layout: false
})
</script>

<script>
export default {
  data () {
    return {
      isAuth: null
    }
  },
  beforeMount () {
    this.isAuth = localStorage.getItem('auth_token') || null
  }
}
</script>

<template>
  <div>
    <NuxtLayout name="search">
      <template #nav>
        <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
          Anime Search
        </h1>
        <NuxtLink to="/" class="link mr-4">
          Home
        </NuxtLink>
        <NuxtLink to="manga" class="link mr-4">
          Manga
        </NuxtLink>
        <div v-if="isAuth" class="flex gap-4">
          <NuxtLink
            to="/anime/create"
            class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
          >
            Create
          </NuxtLink>
          <!-- <NuxtLink class="link" @click="refresh">
            Refresh
          </NuxtLink> -->
        </div>
      </template>

      <template #input>
        <input
          id="default-search"
          v-model="search"
          autocomplete="off"
          type="search"
          name="search"
          placeholder="Search ..."
          class="block w-full p-4 pl-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
      </template>

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
        <SearchResults v-else-if="status == 'success'" :items="data" :query="search" name-type="anime" />
        <div v-else>
          Unknown Event Happend
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
