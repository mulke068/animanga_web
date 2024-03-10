export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params.id

  try {
    await $fetch(`${config.private.api_url}/anime?id=${id}`, {
      method: 'DELETE'
    })

    return {
      statusCode: 204
    }
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON format' })
    }
  };
})
