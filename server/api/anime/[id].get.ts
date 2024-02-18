export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const id = event.context.params.id
    const data = await $fetch(`${config.private.api_url}/anime?id=${id}`)

    const transformedData = {
        id: data.id.id.String,
        names: {
            original: data.names.original,
            en: data.names.en,
            jp: data.names.jp,
        },
        season: data.season,
        episodes: data.episodes,
        score: data.score,
        status: data.status,
        types: data.types,
        platforms: data.platforms,
        genres: data.genres,
        tags: data.tags,
        trailer_urls: data.trailer_urls,
        info_urls: data.info_urls,
        video_urls: data.video_urls,
        image_urls: data.image_urls,
        created_at: data.created_at,
        updated_at: data.updated_at,
    }

    return transformedData
})
