export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = event.context.params.id

  const data = await $fetch(`${config.private.api_url}/user/auth?token=${token}`)

  try {
    const transform = {
      token: data.token,
      uid: data.uid
    }

    return transform
  } catch (e) {
    return null
  }
})
