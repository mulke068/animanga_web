export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = event.context.params.id;
  const data = await $fetch(`${config.private.api_url}/manga?id=${id}`);
  return data;
})
