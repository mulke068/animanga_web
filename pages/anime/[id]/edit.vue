import { Anime } from "./[id].vue";

<template>
    <ClientOnly>
        <NuxtLayout name="items">
            <template #nav>
                <NuxtLink to="/anime" class="nuxt-link">Back</NuxtLink>
                <NuxtLink to="/" class="nuxt-link">Home</NuxtLink>
                <button @click="deleteEntry"
                    class="delete-button">
                    Delete
                </button>
            </template>
            <template #default>
                <div v-if="loading">Loading...</div>
                <div v-else-if="error">{{ error }}</div>
                <form v-else @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
                    <div v-if="formData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div class="max-w-prose">
                            <h3 class="text-xl font-semibold">Names:</h3>
                            <label for="original_name" class="text-3xl font-semibold mb-4">Original</label>
                            <input type="text" id="original_name" v-model="formData.names.original"
                                class="input-field text-lg text-gray-600 dark:text-gray-400" required autocomplete="off"
                                autofocus="true" />
                            <br />
                            <label for="english_name" class="text-3xl font-semibold mb-4">English</label>
                            <input type="text" id="english_name" v-model="formData.names.en"
                                class="input-field" autocomplete="off" />
                            <br />
                            <label for="japanese_name" class="text-3xl font-semibold mb-4">Japanese</label>
                            <input type="text" id="japanese_name" v-model="formData.names.jp"
                                class="input-field" autocomplete="off" />
                        </div>

                        <div class="mt-4 border-t pt-4">
                            <h3 class="text-xl font-semibold">Details:</h3>
                            <ul class="mt-2 space-y-2">
                                <li>
                                    <strong class="text-purple-600">Season:</strong>
                                    <input type="number" v-model="formData.season"
                                        class="input-field text-gray-800 dark:text-gray-300 p-2" required />
                                </li>
                                <li>
                                    <strong class="text-purple-600">Episodes:</strong>
                                    <input type="number" v-model="formData.episodes"
                                        class="input-field" required />
                                </li>
                                <li>
                                    <strong class="text-purple-600">Score:</strong>
                                    <input type="number" v-model="formData.score"
                                        class="input-field" required />
                                </li>
                                <li>
                                    <strong class="text-purple-600">Status:</strong>
                                    <input type="text" v-model="formData.status"
                                        class="input-field" required />
                                    <!-- <select v-model="formData.status" class="input-field text-gray-800 dark:text-gray-300 p-2" required>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="finished">Finished</option>
                                    <option value="dropped">Dropped</option>
                                    <option value="unknown">Unknown</option>
                                </select> -->
                                </li>
                                <li>
                                    <strong class="text-purple-600">Updated At</strong>
                                    <input type="datetime" disabled v-model="formData.updated_at"
                                        class="text-gray-800 dark:text-gray-300 p-2" required />
                                </li>
                                <li>
                                    <strong class="text-purple-600">Created At</strong>
                                    <input type="datetime" disabled v-model="formData.created_at"
                                        class="text-gray-800 dark:text-gray-300 p-2" required />
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Types -->
                        <AnimeFormBoxInput :value="formData.types" title="Types" />

                        <!-- Platforms -->
                        <AnimeFormBoxInput :value="formData.platforms" title="Platforms" />

                        <!-- Genres -->
                        <AnimeFormBoxInput :value="formData.genres" title="Genres" />

                        <!-- Tags -->
                        <AnimeFormBoxInput :value="formData.tags" title="Tags" />
                    </div>


                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Trailer URLs -->
                        <AnimeFormArrayInput :value="formData.trailer_urls" title="Trailer" placeholder="URL" />

                        <!-- Info URLs -->
                        <AnimeFormArrayInput :value="formData.info_urls" title="Info" placeholder="URL" />

                        <!-- Video URLs -->
                        <AnimeFormArrayInput :value="formData.video_urls" title="Video" placeholder="URL" />

                        <!-- Image URLs -->
                        <AnimeFormArrayInput :value="formData.image_urls" title="Image" placeholder="URL" />
                    </div>


                    <!-- Submit and Reset -->
                    <button type="reset"
                        class="reset-button">
                        Reset
                    </button>
                    <button type="submit" autofocus
                        class="sumbit-button">
                        Submit
                    </button>


                </form>
            </template>
        </NuxtLayout>
    </ClientOnly>
</template>

<script>
export default {
    data() {
        return {
            formData: {},
            animeID: '', // Make sure to set this ID
            loading: false,
            error: null,
        }
    },
    methods: {
        async fetchData() {
            this.loading = true
            try {
                // Replace this with your actual fetch logic, using the animeID to retrieve data
                const response = await fetch(`/api/anime/${this.animeID}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }

                this.formData = await response.json()
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },
        async submitForm() {
            // Handle form submission
            // console.log('Form submitted', JSON.stringify(this.formData));
            const res = await $fetch(`/api/anime/${this.animeID}`, {
                method: 'PATCH',
                body: JSON.stringify(this.formData),
            })

            if (res.statusCode === 201) {
                this.fetchData()
            } else {
                console.error('Failed to update anime')
                alert('Failed to update anime')
            }

            // if (res.statusCode === 201) {
            //     this.$router.push(`/anime/${this.animeID}`)
            // } else {
            //     console.error('Failed to update anime')
            //     alert('Failed to update anime')
            // }
        },
        async deleteEntry() {
            if (!confirm('Are you sure you want to delete this anime?')) {
                return
            }

            console.log('Deleting anime', this.animeID)

            let res = await $fetch(`/api/anime/${this.animeID}`, {
                method: 'DELETE',
            })

            if (res.statusCode === 204) {
                alert('Anime deleted successfully')

                this.$router.push(`/anime`)
            } else {
                console.error('Failed to delete anime')
                alert('Failed to delete anime')
            }
        },
    },
    beforeMount() {
        this.animeID = this.$route.params.id // Get the anime ID from the route params
    },
    mounted() {
        this.fetchData() // Fetch data when the component is mounted
    },
}
</script>
