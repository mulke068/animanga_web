<template>
  <ClientOnly>
    <NuxtLayout name="items">
      <template #nav>
        <NuxtLink to="/anime" class="nuxt-link">
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
                  <strong class="text-purple-600">Season:</strong>
                  <input
                    v-model="formData.season"
                    type="number"
                    class="input-field text-gray-800 dark:text-gray-300 p-2"
                    required
                  >
                </li>
                <li>
                  <strong class="text-purple-600">Episodes:</strong>
                  <input v-model="formData.episodes" type="number" class="input-field" required>
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
            <!-- <FormBoxInput :value="formData.types" title="Types" placeholder="Types names separated by , ; or newline" /> -->
            <FormBoxInput :value="formData.types" title="Types" placeholder="Types names separated by , ; or newline" @updated-array="handleTypes" />
            <!-- <FormBoxInput :value="formData.types" title="Types" @input="newValue => formData.tags = newValue" placeholder="Types names separated by , ; or newline" /> -->

            <!-- Platforms -->
            <FormBoxInput :value="formData.platforms" title="Platforms" placeholder="Platforms names separated by , ; or newline" @updated-array="handlePlatforms" />

            <!-- Genres -->
            <FormBoxInput :value="formData.genres" title="Genres" placeholder="Genres names separated by , ; or newline" @updated-array="handleGenres" />

            <!-- Tags -->
            <FormBoxInput :value="formData.tags" title="Tags" placeholder="Tags names separated by , ; or newline" @updated-array="handleTags" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Trailer URLs -->
            <FormArrayInput :value="formData.trailer_urls" title="Trailer" placeholder="URL" />

            <!-- Info URLs -->
            <FormArrayInput :value="formData.info_urls" title="Info" placeholder="URL" />

            <!-- Video URLs -->
            <FormArrayInput :value="formData.video_urls" title="Video" placeholder="URL" />

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
            class="submit-button"
          >
            Submit
          </button>
        </form>
      </template>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>

<script>
import FormBoxInput from '~/components/form/boxInput'
import FormArrayInput from '~/components/form/arrayInput'

export default {
  components: {
    FormBoxInput,
    FormArrayInput
  },
  data () {
    return {
      formData: {
        names: {
          original: '',
          en: '',
          jp: ''
        },
        season: 0,
        episodes: 0,
        score: 0,
        status: 'unknown',
        types: [],
        platforms: [],
        genres: [],
        tags: [],
        trailer_urls: [],
        info_urls: [],
        video_urls: [],
        image_urls: []
      },
      response: null
    }
  },
  methods: {
    handleTypes (updatedArray) {
      this.formData.types = updatedArray // Update the formData property with the updated array
    },
    handlePlatforms (updatedArray) {
      this.formData.platforms = updatedArray // Update the formData property with the updated array
    },
    handleGenres (updatedArray) {
      this.formData.genres = updatedArray // Update the formData property with the updated array
    },
    handleTags (updatedArray) {
      this.formData.tags = updatedArray // Update the formData property with the updated array
    },
    async submitForm () {
      console.log('Form data:', this.formData)
      try {
        const res = await $fetch('/api/anime', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        })

        // console.log('Response:', res);

        if (res.statusCode === 201) {
          this.$router.push(`/anime/${res.body.id}`)
        } else {
          console.error('Failed to create anime')
          alert('Failed to create anime')
        }
      } catch (error) {
        console.error('Error occurred:', error)
        alert('Error occurred while creating anime')
      }
    }
  }
}
</script>
