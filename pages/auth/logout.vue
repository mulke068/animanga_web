<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
      <h1 class="text-2xl font-semibold mb-4">Logout</h1>
      <p class="mb-6">Are you sure that you want to Logout?</p>
      <button
        type="button"
        @click="handleLogout"
        class="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>

// const token = localStorage.getItem('auth_token')
// const uid = localStorage.getItem('uid')

function handleLogout () {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('uid')
  navigateTo('/')
}

</script>
