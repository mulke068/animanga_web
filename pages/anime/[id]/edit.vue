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
        <button class="delete-button" @click="deleteEntry">
          Delete
        </button>
      </template>
      <template #default>
        <div v-if="loading">
          Loading...
        </div>
        <div v-else-if="error">
          {{ error }}
        </div>
        <form v-else @submit.prevent="submitForm">
          <div v-if="formData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                autocomplete="off"
                autofocus="true"
              >
              <br>
              <label for="english_name" class="text-3xl font-semibold mb-4">English</label>
              <input
                id="english_name"
                v-model="formData.names.en"
                type="text"
                class="input-field"
                autocomplete="off"
              >
              <br>
              <label for="japanese_name" class="text-3xl font-semibold mb-4">Japanese</label>
              <input
                id="japanese_name"
                v-model="formData.names.jp"
                type="text"
                class="input-field"
                autocomplete="off"
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
                  <input v-model="formData.status" type="text" class="input-field" required>
                  <!-- <select v-model="formData.status" class="input-field text-gray-800 dark:text-gray-300 p-2" required>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="finished">Finished</option>
                                    <option value="dropped">Dropped</option>
                                    <option value="unknown">Unknown</option>
                                </select> -->
                </li>
                <li>
                  <strong class="text-purple-600">Updated At</strong>
                  <input
                    v-model="formData.updated_at"
                    type="datetime"
                    disabled
                    class="text-gray-800 dark:text-gray-300 p-2"
                    required
                  >
                </li>
                <li>
                  <strong class="text-purple-600">Created At</strong>
                  <input
                    v-model="formData.created_at"
                    type="datetime"
                    disabled
                    class="text-gray-800 dark:text-gray-300 p-2"
                    required
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Types -->
            <FormBoxInput :value="formData.types" title="Types" @updated-array="handleTypes" />

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
          <button type="reset" class="reset-button">
            Reset
          </button>
          <button type="submit" autofocus class="submit-button">
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
      formData: {},
      animeID: '', // Make sure to set this ID
      loading: false,
      error: null
    }
  },
  beforeMount () {
    this.animeID = this.$route.params.id // Get the anime ID from the route params
  },
  mounted () {
    this.fetchData() // Fetch data when the component is mounted
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
    async fetchData () {
      this.loading = true
      try {
        // Replace this with your actual fetch logic, using the animeID to retrieve data
        const response = await fetch(`/api/anime/${this.animeID}`)

        // console.log('response', response)

        if (response.length >= 1) {
          throw new Error('Failed to fetch data')
        }

        this.formData = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async submitForm () {
      // Handle form submission
      console.log('Form', this.formData)
      // console.log('Form submitted', JSON.stringify(this.formData));
      const res = await $fetch(`/api/anime/${this.animeID}`, {
        method: 'PATCH',
        body: JSON.stringify(this.formData)
      })

      if (res.statusCode === 201) {
        this.clearNuxtData(this.animeID)
        this.clearNuxtState(this.animeID)
        this.$router.push(`/anime/${this.animeID}`)
      } else {
        console.error('Failed to update anime')
        alert('Failed to update anime')
      }
    },
    async deleteEntry () {
      if (!confirm('Are you sure you want to delete this anime?')) {
        return
      }

      console.log('Deleting anime', this.animeID)

      const res = await $fetch(`/api/anime/${this.animeID}`, {
        method: 'DELETE'
      })

      if (res.statusCode === 204) {
        alert('Anime deleted successfully')
        // this.$nuxt.refresh()
        this.clearNuxtData(this.animeID)
        this.clearNuxtState(this.animeID)
        this.$router.push('/anime')
      } else {
        console.error('Failed to delete anime')
        alert('Failed to delete anime')
      }
    }
  }
}
</script>
