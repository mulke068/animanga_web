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
  layout: false,
  middleware: 'auth'
})
</script>

<template>
  <div>
    <NuxtLayout name="search">
      <template #nav>
        <h1
          class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200"
        >
          Anime Search
        </h1>
        <NuxtLink to="/" class="link">
          Home
        </NuxtLink>
        <NuxtLink to="manga" class="link">
          Manga
        </NuxtLink>
        <NuxtLink
          to="/anime/create"
          class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
        >
          Create
        </NuxtLink>
        <!-- <NuxtLink class="link" @click="refresh">
          Refresh
        </NuxtLink> -->

        <!--<a class="bg-red-500 hover:bg-red-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white" href="../index.php">Logout</a> -->
      </template>

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
