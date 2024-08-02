<script setup lang="ts">
import { ref, onBeforeMount } from 'vue' // Add the import statements for ref and onBeforeMount

import { type IWebSocket } from '~/plugins/websocket'

definePageMeta({
  layout: false
})

const { id } = useRoute().params
const nuxtApp = useNuxtApp()
const ws: IWebSocket = nuxtApp.$ws as IWebSocket
let uid: string | null = null
let isAuth: string | null = null
let authToken: string | null = null

onBeforeMount(() => {
  isAuth = localStorage.getItem('auth_token') || null
  uid = localStorage.getItem('uid') || null
  authToken = isAuth
})

const { data: getData, refresh } = await useFetch(`/api/anime/${id}`, {
  key: id.toString(),
  getCachedData (key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  }
})

const data = ref(getData)

function handleWatched (value: number) {
//   console.log('Watched: ', value)
  try {
    ws.sendMessage('has_anime:watched', { authToken, value })
  } catch (e) {
    console.log('Error: ', e)
  }
}

function handleScore (value: number) {
//   console.log('Score: ', value)
  try {
    ws.sendMessage('has_anime:score', { authToken, value })
  } catch (e) {
    console.log('Error: ', e)
  }
}

ws.onMessage((msg: any) => {
  if (msg.name === 'has_anime:watched') {
    // console.log('Watched: ', msg.payload)
  }
  if (msg.name === 'has_anime:score') {
    // console.log('Score: ', msg.payload)
  }
})
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
          v-if="isAuth"
          class="refresh-button"
          @click="refresh"
        >
          Refresh
        </button>
        <NuxtLink v-if="isAuth" :to="`${id}/edit`" class="link">
          Edit
        </NuxtLink>
      </template>

      <template #default>
        <div v-if="data">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
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

              <div v-if="isAuth">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4  mt-4 space-y-2 ">
                  <div class="md:col-span-2">
                    <strong class="text-purple-600">Season:</strong>
                    <span id="seasonValue" class="text-gray-800 dark:text-gray-300 p-2">{{ data.season }}</span>
                  </div>
                  <div>
                    <strong class="text-purple-600">Episodes:</strong>
                    <span id="episodesValue" class="text-gray-800 dark:text-gray-300 p-2">{{ data.episodes }}</span>
                  </div>
                  <FormUserCounter title="Watched:" :current-value="0" :max-value="data.episodes" :increase-decrease="1" @updated-value="handleWatched" />
                  <div>
                    <strong class="text-purple-600">Score:</strong>
                    <span id="scoreValue" class="text-gray-800 dark:text-gray-300 p-2">{{ data.score }}</span>
                  </div>
                  <FormUserCounter title="Score:" :current-value="0" :max-value="10" :increase-decrease="0.5" @updated-value="handleScore" />
                  <div>
                    <strong class="text-purple-600">Status:</strong>
                    <span class="text-gray-800 dark:text-gray-300 p-2">{{ data.status }}</span>
                  </div>
                  <!-- - Update Able for the User -- -->
                  <div>
                    <strong class="text-purple-600">Status:</strong>
                    <select id="userStatus" class="text-gray-800 dark:text-gray-300 p-2 bg-black">
                      <option value="Ongoing">
                        Ongoing
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                      <option value="Dropped">
                        Dropped
                      </option>
                      <option value="Plan to Watch">
                        Plan to Watch
                      </option>
                    </select>
                  </div>
                  <!-- ---------------- -->
                </div>
              </div>
              <div v-else>
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
        </div>
        <div v-else>
          No data
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
