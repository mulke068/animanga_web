<template>
  <div class="bg-gray-900 text-white py-4">
    <nav class="container mx-auto flex justify-center space-x-4">
      <NuxtLink to="/anime" class="text-lg font-semibold hover:text-indigo-500">
        Anime
      </NuxtLink>
      <NuxtLink to="/manga" class="text-lg font-semibold hover:text-indigo-500">
        Manga
      </NuxtLink>
      <NuxtLink v-if="authToken" to="/auth/logout" class="text-lg font-semibold hover:text-indigo-500">
        Logout
      </NuxtLink>

      <NuxtLink v-else to="/auth/login" class="text-lg font-semibold hover:text-indigo-500">
        Login
      </NuxtLink>

      <!-- <NuxtLink to="/test" class="text-lg font-semibold hover:text-indigo-500"> Test </NuxtLink> -->
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      authToken: null
    }
  },
  beforeMount () {
    this.authToken = localStorage.getItem('auth_token') || null
  }
}
</script>
