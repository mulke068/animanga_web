export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const data = await $fetch(`${config.private.api_url}/anime`)
    return data
})
