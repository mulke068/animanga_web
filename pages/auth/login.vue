<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <label name="username">Username: </label>
      <input id="username" v-model="username" type="text" required>
      <label name="password">Password: </label>
      <input id="password" v-model="password" type="password" required>
      <button type="submit">
        Login
      </button>
      <br>
      <button type="reset">
        Clear
      </button>
    </form>
  </div>
</template>

<script setup>
const username = ref('')
const password = ref('')

async function handleSubmit () {
  // console.log('User: %s\nPass: %s', username.value, password.value)

  try {
    const response = await $fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username.value, password: password.value })
    })

    if (response.statusCode === 201) {
      const { token, uid } = response.body

      console.log('token: %s \nuid: %s', token, uid)

	  localStorage.setItem('auth_token', token)
	  localStorage.setItem('uid', uid)

	  navigateTo('/')
      // this.$router.push('/')
    } else {
      alert('Login Failed Status Code: ' + response.statusCode)
      console.error('Login failed: ', response.error)
    }
  } catch (error) {
    console.error('Login Error: ', error)
  }
}

</script>
