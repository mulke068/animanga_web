<template>
  <ClientOnly>
    <NuxtLayout name="items">
      <template #nav>
        <NuxtLink to="/manga" class="nuxt-link">
          Back
        </NuxtLink>
        <NuxtLink to="/" class="nuxt-link">
          Home
        </NuxtLink>
      </template>

      <template #default>
        <!-- <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6"> -->
        <form autocomplete="off" @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="max-w-prose">
              <h3 class="text-xl font-semibold">
                Names:
              </h3>
              <label for="original_name" class="text-3xl font-semibold mb-4">Original</label>
              <input
                id="original_name"
                v-model="formData.names.original"
                type="text"
                class="input-field text-lg text-gray-600 dark:text-gray-400"
                required
                autofocus="true"
                placeholder="Text"
              >
              <br>
              <label for="english_name" class="text-3xl font-semibold mb-4">English</label>
              <input
                id="english_name"
                v-model="formData.names.en"
                type="text"
                class="input-field"
                placeholder="Text"
              >
              <br>
              <label for="japanese_name" class="text-3xl font-semibold mb-4">Japanese</label>
              <input
                id="japanese_name"
                v-model="formData.names.jp"
                type="text"
                class="input-field"
                placeholder="Text"
              >
            </div>

            <div class="mt-4 border-t pt-4">
              <h3 class="text-xl font-semibold">
                Details:
              </h3>
              <ul class="mt-2 space-y-2">
                <li>
                  <strong class="text-purple-600">Volumes:</strong>
                  <input
                    v-model="formData.volumes"
                    type="number"
                    class="input-field text-gray-800 dark:text-gray-300 p-2"
                    required
                  >
                </li>
                <li>
                  <strong class="text-purple-600">Chapters:</strong>
                  <input v-model="formData.chapters" type="number" class="input-field" required>
                </li>
                <li>
                  <strong class="text-purple-600">Score:</strong>
                  <input v-model="formData.score" type="number" class="input-field" required>
                </li>
                <li>
                  <strong class="text-purple-600">Status:</strong>
                  <select v-model="formData.status" class="input-field" required>
                    <option value="ongoing">
                      Ongoing
                    </option>
                    <option value="finished">
                      Finished
                    </option>
                    <option value="dropped">
                      Dropped
                    </option>
                    <option value="unknown">
                      Unknown
                    </option>
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Types -->
            <FormBoxInput :value="formData.types" title="Types" placeholder="Types names separated by , ; or newline" @updated-array="handleTypes" />

            <!-- Platforms -->
            <FormBoxInput :value="formData.platforms" title="Platforms" placeholder="Platforms names separated by , ; or newline" @updated-array="handlePlatforms" />

            <!-- Genres -->
            <FormBoxInput :value="formData.genres" title="Genres" placeholder="Genres names separated by , ; or newline" @updated-array="handleGenres" />

            <!-- Tags -->
            <FormBoxInput :value="formData.tags" title="Tags" placeholder="Tags names separated by , ; or newline" @updated-array="handleTags" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Info URLs -->
            <FormArrayInput :value="formData.info_urls" title="Info" placeholder="URL" />

            <!-- Read URLs -->
            <FormArrayInput :value="formData.read_urls" title="Read" placeholder="URL" />

            <!-- Image URLs -->
            <FormArrayInput :value="formData.image_urls" title="Image" placeholder="URL" />
          </div>

          <!-- Submit and Reset -->
          <button type="reset" class="delete-button">
            Reset
          </button>
          <button
            type="submit"
            autofocus
            class="m-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white focus:outline-none mt-4"
          >
            Submit
          </button>
        </form>
      </template>
    </NuxtLayout>
  </ClientOnly>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        names: {
          original: '',
          en: '',
          jp: ''
        },
        volumes: 0,
        chapters: 0,
        score: 0,
        status: 'unknown',
        types: [],
        platforms: [],
        genres: [],
        tags: [],
        info_urls: [],
        read_urls: [],
        image_urls: []
      },
      response: null
    }
  },
  methods: {
    handleTypes (updatedArray) {
      this.formData.types = updatedArray
    },
    handlePlatforms (updatedArray) {
      this.formData.platforms = updatedArray
    },
    handleGenres (updatedArray) {
      this.formData.genres = updatedArray
    },
    handleTags (updatedArray) {
      this.formData.tags = updatedArray
    },
    async submitForm () {
      // console.log(this.formData)

      const res = await $fetch('/api/manga', {
        method: 'POST',
        body: JSON.stringify(this.formData)
      })

      // console.log(res)

      if (res.statusCode === 201) {
        this.$router.push(`/manga/${res.body.id}`)
      } else {
        console.error('Failed to Create manga')
        alert('Failed to Create manga')
      }
    }
  }
}
</script>
