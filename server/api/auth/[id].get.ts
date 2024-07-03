export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = event.context.params.id

  console.log("token: ", token)

  const data = await $fetch(`${config.private.api_url}/user/auth?token=${token}`)

  console.log(data)

  return { token }
})
