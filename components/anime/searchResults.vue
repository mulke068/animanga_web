<script setup>

// export interface Anime {
//     id:           ID;
//     names:        Names;
//     season:       number;
//     episodes:     number;
//     score:        number;
//     status:       string;
//     types:        string[];
//     platforms:    string[];
//     genres:       string[];
//     tags:         string[];
//     trailer_urls: string[];
//     info_urls:    string[];
//     video_urls:   string[];
//     image_urls:   string[];
//     updated_at:   Date;
//     created_at:   Date;
// }

// export interface ID {
//     tb: string;
//     id: IDID;
// }

// export interface IDID {
//     String: string;
// }

// export interface Names {
//     original: string;
//     en:       string;
//     jp:       string;
// }

const props = defineProps({ items: Array , search: String});
const { items, search } = toRefs(props);

const filteredItems = computed(() => {
    if (!search.value) return items?.value;
    return items?.value?.filter(item => {
        const searchString = search?.value?.toLowerCase();
        return item.names.original.toLowerCase().includes(searchString) ||
            item.names.en.toLowerCase().includes(searchString) ||
            item.names.jp.toLowerCase().includes(searchString)
    });
});

</script>


<template>
    <ul class="grid grid-cols-1 gap-4">
        <li v-for="item in filteredItems" :key="item.id.String">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h1 class="text-2xl text-blue-400 dark:text-blue-400 font-semibold">{{ item.names.original }}</h1>
                <h2 class="text-lg text-gray-700 dark:text-gray-300">{{ item.names.en }}</h2>
                <h2 class="text-lg text-gray-700 dark:text-gray-300">{{ item.names.jp }}</h2>
                <NuxtLink :to="`/anime/${item.id.id.String}`" class="mt-2 text-blue-500 hover:underline block">
                    Click ME
                </NuxtLink>
            </div>
        </li>
    </ul>
</template>