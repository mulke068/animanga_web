<template>
    <div class="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
        <!-- Navigation -->
        <nav class="mb-4">
            <NuxtLink to="/" class="link">Home</NuxtLink>
            <NuxtLink to="anime" class="link">Anime</NuxtLink>
            <span class="font-bold text-xl mx-2">Manga Search</span>
        </nav>

        <!-- manga Search -->
        <div>
            <input type="text" v-model="search" placeholder="Search here…" class="mb-4" />
            <MangaSearchResults :items="data" :search="search"/>
        </div>
    </div>
</template>

<script setup>
const search = ref('');
const { data, refresh } = await useFetch('/api/manga/');

</script>
