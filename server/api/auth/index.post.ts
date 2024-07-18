export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  try {
    const req = {
      username: body.username,
      password: body.password
    }

    // console.log('REQUEST: ', req)

    const res = await $fetch(`${config.private.api_url}/user/auth`, {
      method: 'POST',
      body: JSON.stringify(req)
    })

    // console.log('RESPONSE: ', res)

    return {
      statusCode: 201,
      body: {
        token: res.token,
        uid: res.uid
      }
    }
  } catch (error) {
    console.error('Error at Client Post Auth', error)

    return {
      statusCode: 500,
      error: 'Error at Client' + error
    }
  }
})
