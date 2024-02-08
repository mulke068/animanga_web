<script setup>


const search = ref('');
const nuxtApp = useNuxtApp();
const { data, status } = await useLazyFetch('/api/anime/', {
    key: 'AnimeSearchResults', getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    }
});
// const filteredItems = data.value;

// const { en, original, jp } = data.value[0].names;
// console.log({ en, original, jp });

</script>



<template>
    <body class="antialiased text-slate-500 dark:text-slate-400 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <!-- Navigation -->
        <nav class="sticky top-0 left-0 mb-4 bg-white dark:bg-slate-900 z-10">

            <div class="relative">
                <div class="bg-white dark:bg-slate-900">
                    <div class="gap-2 p-3">
                        <!-- Menu -->
                        <menu class="flex items-center gap-4 p-6">
                            <h1
                                class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
                                Anime Search</h1>
                            <NuxtLink to="/" class="link ">Home</NuxtLink>
                            <NuxtLink to="manga" class="link">Manga</NuxtLink>
                            <!-- <a class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white" href="create.php?uid=<?=$_GET['uid'];?>&db=<?=$_GET['db'];?>">Create</a>
                            <a class="bg-red-500 hover:bg-red-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white" href="../index.php">Logout</a> -->

                        </menu>
                        <!-- Search Bar -->
                        <div class="w-full">
                            <!-- <form action="" method="post" autocomplete="off" class="w-full"> -->
                            <label for="default-search"
                                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <input autocomplete="off" type="search" id="default-search" name="search" v-model="search"
                                    placeholder="Search..."
                                    class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <button type="submit"
                                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                            <!-- </form> -->
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <!-- Search Results -->
        <main class="container mx-auto p-4 z-0">
            <!-- <input type="text" v-model="search" placeholder="Search here…" class="mb-4" /> -->
            <div v-if="status == 'pending'" class="text-center">Loading…</div>
            <div v-else-if="status == 'idle'" class="text-center">Idle.</div>
            <div v-else-if="status == 'error'" class="text-center">No results found.</div>
            <AnimeSearchResults v-else-if="status == 'success'" :items="data" :search="search" />
            <div v-else>Unknown Event Happend</div>
        </main>
    </body>
</template>

