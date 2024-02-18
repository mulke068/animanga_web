export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const id = event.context.params.id
    const body = await readBody(event)

    try {
        let data = {
            names: {
                original: body.names.original,
                en: body.names.en,
                jp: body.names.jp,
            },
            season: body.season,
            episodes: body.episodes,
            score: body.score,
            status: body.status,
            types: body.types,
            platforms: body.platforms,
            genres: body.genres,
            tags: body.tags,
            trailer_urls: body.trailer_urls,
            info_urls: body.info_urls,
            video_urls: body.video_urls,
            image_urls: body.image_urls,
        }

        let res = await $fetch(`${config.private.api_url}/anime?id=${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
        return {
            statusCode: 201,
            body: res,
        }

    } catch (error) {
        console.error('Error parsing JSON:', error)
        // Handle the error accordingly
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({ error: 'Invalid JSON format' }),
        }
    }
})
