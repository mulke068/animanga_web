export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = event.context.params?.token
    const data = await $fetch(`${config.private.api_url}/user/auth?token=${token}`)

    return data?
})