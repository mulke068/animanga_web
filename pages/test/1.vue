<script setup>
const search = ref('')
const nuxtApp = useNuxtApp()
const { data, status } = await useLazyFetch('/api/anime/', {
  key: 'AnimeSearchResults',
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})
// const filteredItems = data.value;

// const { en, original, jp } = data.value[0].names;
// console.log({ en, original, jp });

const isOpen = ref(false)
</script>

<template>
  <NuxtLayout name="search">

    <template #menu>
      <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
        Anime Search
      </h1>
      <NuxtLink to="/" class="link">Home</NuxtLink>
      <!-- <NuxtLink to="manga" class="link">Manga</NuxtLink> -->
      <!-- <NuxtLink to="/anime/create" class="link">Create</NuxtLink> -->
      <NuxtLink to="/anime/create"
        class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">Create
      </NuxtLink>

      <!--<a class="bg-red-500 hover:bg-red-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white" href="../index.php">Logout</a> -->

    </template>

    <template #input>
      <input autocomplete="off" type="search" id="default-search" name="search" v-model="search" placeholder="Search..."
        class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </template>


    <!-- <input type="text" v-model="search" placeholder="Search here…" class="mb-4" /> -->
    <div v-if="status == 'pending'" class="text-center">Loading…</div>
    <div v-else-if="status == 'idle'" class="text-center">Idle.</div>
    <div v-else-if="status == 'error'" class="text-center">No results found.</div>
    <AnimeSearchResults v-else-if="status == 'success'" :items="data" :search="search" />
    <div v-else>Unknown Event Happend</div>

  </NuxtLayout>
  
</template> 