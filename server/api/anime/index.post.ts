export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  //console.log('body:', body)

  try {
    const data = {
      names: {
        original: body.names.original,
        en: body.names.en,
        jp: body.names.jp
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
      image_urls: body.image_urls
    }

    // let res = JSON.stringify(data)

    const res = await $fetch(`${config.private.api_url}/anime`, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    // console.log('res:', res)

    const transformedData = {
      id: res.id.id.String
      // names: {
      //     original: res.names.original,
      //     en: res.names.en,
      //     jp: res.names.jp,
      // },
      // season: res.season,
      // episodes: res.episodes,
      // score: res.score,
      // status: res.status,
      // types: res.types,
      // platforms: res.platforms,
      // genres: res.genres,
      // tags: res.tags,
      // trailer_urls: res.trailer_urls,
      // info_urls: res.info_urls,
      // video_urls: res.video_urls,
      // image_urls: res.image_urls,
      // created_at: res.created_at,
      // updated_at: res.updated_at,
    }

    // console.log('transformedData:', transformedData)

    return {
      statusCode: 201,
      body: transformedData
    }
  } catch (error) {
    console.error('Error parsing JSON:', error)
    // Handle the error accordingly
    return {
      statusCode: 400, // Bad Request
      body: JSON.stringify({ error: 'Invalid JSON format' })
    }
  }
})
