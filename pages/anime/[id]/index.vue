<script setup lang="ts">
const { id } = useRoute().params
const nuxtApp = useNuxtApp()

const { data: getData, refresh } = await useFetch(`/api/anime/${id}`, {
  key: id.toString(),
  getCachedData (key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
})
const data = ref(getData)
</script>

<template>
  <div>
    <NuxtLayout name="items">
      <template #nav>
        <!-- <NuxtLink to="/" class="text-2xl font-bold text-purple-600 dark:text-purple-300">Home</NuxtLink> -->
        <NuxtLink to="/anime" class="nuxt-link">
          Back
        </NuxtLink>
        <button
          class="refresh-button"
          @click="refresh"
        >
          Refresh
        </button>
        <NuxtLink :to="`${id}/edit`" class="link">
          Edit
        </NuxtLink>
      </template>

      <template #default>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="max-w-prose">
            <h2 class="text-3xl font-semibold mb-4">
              {{ data.names.original }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              {{ data.names.en }}
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              {{ data.names.jp }}
            </p>
          </div>

          <div class="mt-4 border-t pt-4">
            <h3 class="text-xl font-semibold">
              Details:
            </h3>
            <ul class="mt-2 space-y-2">
              <li>
                <strong class="text-purple-600">Season:</strong>
                <span class="text-gray-800 dark:text-gray-300 p-2">{{ data.season }}</span>
              </li>
              <li>
                <strong class="text-purple-600">Episodes:</strong>
                <span class="text-gray-800 dark:text-gray-300 p-2">{{ data.episodes }}</span>
              </li>
              <li>
                <strong class="text-purple-600">Score:</strong>
                <span class="text-gray-800 dark:text-gray-300 p-2">{{ data.score }}</span>
              </li>
              <li>
                <strong class="text-purple-600">Status:</strong>
                <span class="text-gray-800 dark:text-gray-300 p-2">{{ data.status }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="break-all">
          <div class="mt-4">
            <h3 class="text-xl font-semibold">
              Types:
            </h3>
            <div class="flex flex-wrap space-x-2 mt-2">
              <div
                v-for="type in data.types"
                :key="type"
                class="bg-blue-200 text-blue-700 dark:bg-green-400 dark:text-green-900 rounded-full px-2 py-1 mt-2"
              >
                {{ type }}
              </div>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold">
              Platforms:
            </h3>
            <div class="flex flex-wrap space-x-2 mt-2">
              <div
                v-for="platform in data.platforms"
                :key="platform"
                class="bg-blue-200 text-blue-700 dark:bg-green-400 dark:text-green-900 rounded-full px-2 py-1 mt-2"
              >
                {{ platform }}
              </div>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold">
              Genres:
            </h3>
            <div class="flex flex-wrap space-x-2 mt-2">
              <div
                v-for="genre in data.genres"
                :key="genre"
                class="bg-blue-200 text-blue-700 dark:bg-green-400 dark:text-green-900 rounded-full px-2 py-1 mt-2"
              >
                {{ genre }}
              </div>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold">
              Tags:
            </h3>
            <div class="flex flex-wrap space-x-2 mt-2">
              <div
                v-for="tag in data.tags"
                :key="tag"
                class="bg-blue-200 text-blue-700 dark:bg-green-400 dark:text-green-900 rounded-full px-2 py-1 mt-2"
              >
                {{ tag }}
              </div>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold">
              Trailer URLs:
            </h3>
            <div v-for="trailer_url in data.trailer_urls" :key="trailer_url">
              <NuxtLink
                :to="trailer_url"
                class="text-purple-600 hover:underline dark:text-yellow-300 dark:hover:text-yellow-500"
              >
                {{
                  trailer_url }}
              </NuxtLink>
            </div>

            <h3 class="text-xl font-semibold mt-4">
              Info URLs:
            </h3>
            <div v-for="info_url in data.info_urls" :key="info_url">
              <NuxtLink
                :to="info_url"
                class="text-purple-600 hover:underline dark:text-yellow-300 dark:hover:text-yellow-500"
              >
                {{
                  info_url }}
              </NuxtLink>
            </div>

            <h3 class="text-xl font-semibold mt-4">
              Video URLs:
            </h3>
            <div v-for="video_url in data.video_urls" :key="video_url">
              <NuxtLink
                :to="video_url"
                class="text-purple-600 hover:underline dark:text-yellow-300 dark:hover:text-yellow-500"
              >
                {{
                  video_url }}
              </NuxtLink>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold">
              Image URLs:
            </h3>
            <div class="mt-2">
              <div v-for="image_url in data.image_urls" :key="image_url">
                <!-- <img :src="image_url" :alt="image_url" class="max-w-full rounded-lg shadow-md" /> -->
                <NuxtImg :src="image_url" :alt="image_url" class="max-w-full rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
