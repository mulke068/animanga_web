export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = await getQuery(event)

  const uid = query.uid

  const res = await $fetch(`${config.private.api_url}/user?uid=${uid}`)

  return res
})
