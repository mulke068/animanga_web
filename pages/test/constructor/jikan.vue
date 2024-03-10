<script setup lang="ts">

const search1 = await useFetch('https://api.jikan.moe/v4/anime', { key: 'anime_search' })
const search2 = await useFetch('https://api.jikan.moe/v4/manga', { key: 'manga_search' })

const full1 = await useFetch('https://api.jikan.moe/v4/anime/1/full', { key: 'anime_full' })
const full2 = await useFetch('https://api.jikan.moe/v4/manga/1/full', { key: 'manga_full' })

</script>

<template>
</template>
