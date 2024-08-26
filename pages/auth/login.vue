<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h1 class="text-2xl font-semibold mb-6 text-center">Login</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium mb-1">Username:</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium mb-1">Password:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
          >
            Login
          </button>
        </div>
        <div class="flex justify-center">
          <button
            type="reset"
            class="mt-2 py-2 px-4 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
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
