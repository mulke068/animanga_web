export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const id = event.context.params.id
    const data = await $fetch(`${config.private.api_url}/manga?id=${id}`)

    const transformedData = {
        id: data.id.id.String,
        names: {
            original: data.names.original,
            en: data.names.en,
            jp: data.names.jp,
        },
        chapters: data.chapters,
        volumes: data.volumes,
        score: data.score,
        status: data.status,
        types: data.types,
        platforms: data.platforms,
        genres: data.genres,
        tags: data.tags,
        info_urls: data.info_urls,
        read_urls: data.read_urls,
        image_urls: data.image_urls,
        created_at: data.created_at,
        updated_at: data.updated_at,
    }

    return transformedData
})
