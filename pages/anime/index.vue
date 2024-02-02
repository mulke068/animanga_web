<script setup>


const search = ref('');
const { data, refresh, status } = await useLazyFetch('/api/anime/');
// const filteredItems = data.value;

// const { en, original, jp } = data.value[0].names;
// console.log({ en, original, jp });

</script>



<template>
    <div class="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
        <!-- Navigation -->
        <nav class="mb-4">
            <NuxtLink to="/" class="link">Home</NuxtLink>
            <NuxtLink to="manga" class="link">Manga</NuxtLink>
            <span class="font-bold text-xl mx-2">Anime Search</span>
        </nav>

        <!-- Anime Search -->
        <div>
            <input type="text" v-model="search" placeholder="Search here…" class="mb-4" />
            <div v-if="status == 'pending'"  class="text-center">Loading…</div>
            <div v-else-if="status == 'idle'" class="text-center">Idle.</div>
            <div v-else-if="status == 'error'" class="text-center">No results found.</div>
            <AnimeSearchResults v-else-if="status == 'success'" :items="data" :search="search"/>
            <div v-else>Unknown Event Happend</div>
        </div>
    </div>
</template>

