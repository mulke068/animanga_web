<template>
    <ClientOnly>
        <div class="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
            <nav class="flex justify-between items-center py-4">
                <NuxtLink to="/anime" class="text-2xl font-bold text-purple-600 dark:text-purple-300">Back</NuxtLink>
                <NuxtLink to="/" class="text-2xl font-bold text-purple-600 dark:text-purple-300">Home</NuxtLink>
            </nav>

            <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="max-w-prose">
                        <h3 class="text-xl font-semibold">Names:</h3>
                        <label for="original_name" class="text-3xl font-semibold mb-4">Original</label>
                        <input
                            type="text"
                            id="original_name"
                            v-model="formData.names.original"
                            class="text-lg text-gray-600 dark:text-gray-400"
                            required
                            autocomplete="off"
                            autofocus="true"
                        />
                        <br />
                        <label for="english_name" class="text-3xl font-semibold mb-4">English</label>
                        <input
                            type="text"
                            id="english_name"
                            v-model="formData.names.en"
                            class="text-lg text-gray-600 dark:text-gray-400"
                            autocomplete="off"
                        />
                        <br />
                        <label for="japanese_name" class="text-3xl font-semibold mb-4">Japanese</label>
                        <input
                            type="text"
                            id="japanese_name"
                            v-model="formData.names.jp"
                            class="text-lg text-gray-600 dark:text-gray-400"
                            autocomplete="off"
                        />
                    </div>

                    <div class="mt-4 border-t pt-4">
                        <h3 class="text-xl font-semibold">Details:</h3>
                        <ul class="mt-2 space-y-2">
                            <li>
                                <strong class="text-purple-600">Season:</strong>
                                <input
                                    type="number"
                                    v-model="formData.season"
                                    class="text-gray-800 dark:text-gray-300 p-2"
                                    required
                                />
                            </li>
                            <li>
                                <strong class="text-purple-600">Episodes:</strong>
                                <input
                                    type="number"
                                    v-model="formData.episodes"
                                    class="text-gray-800 dark:text-gray-300 p-2"
                                    required
                                />
                            </li>
                            <li>
                                <strong class="text-purple-600">Score:</strong>
                                <input
                                    type="number"
                                    v-model="formData.score"
                                    class="text-gray-800 dark:text-gray-300 p-2"
                                    required
                                />
                            </li>
                            <li>
                                <strong class="text-purple-600">Status:</strong>
                                <select v-model="formData.status" class="text-gray-800 dark:text-gray-300 p-2" required>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="finished">Finished</option>
                                    <option value="dropped">Dropped</option>
                                    <option value="unknown">Unknown</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Types -->
                <AnimeFormBoxInput :value="formData.types" title="Types" />

                <!-- Platforms -->
                <AnimeFormBoxInput :value="formData.platforms" title="Platforms" />

                <!-- Genres -->
                <AnimeFormBoxInput :value="formData.genres" title="Genres" />

                <!-- Tags -->
                <AnimeFormBoxInput :value="formData.tags" title="Tags" />

                <!-- Trailer URLs -->
                <AnimeFormArrayInput :value="formData.trailer_urls" title="Trailer URLs" placeholder="URL" />

                <!-- Info URLs -->
                <AnimeFormArrayInput :value="formData.info_urls" title="Info URLs" placeholder="URL" />

                <!-- Video URLs -->
                <AnimeFormArrayInput :value="formData.video_urls" title="Video URLs" placeholder="URL" />

                <!-- Image URLs -->
                <AnimeFormArrayInput :value="formData.image_urls" title="Image URLs" placeholder="URL" />

                <!-- Submit and Reset -->
                <button
                    type="reset"
                    class="m-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white focus:outline-none mt-4"
                >
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
        </div>
    </ClientOnly>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                names: {
                    original: '',
                    en: '',
                    jp: '',
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
                image_urls: [],
            },
            response: null,
        }
    },
    methods: {
        async submitForm() {
            // console.log(this.formData)

            const res = await $fetch('/api/anime', {
                method: 'POST',
                body: JSON.stringify(this.formData),
            })

            // console.log(res)

            if (res.statusCode === 201) {
                this.$router.push(`/anime/${res.body.id}`)
            } else {
                console.error('Failed to Create anime')
                alert('Failed to Create anime')
            }
        },
    },
}
</script>
