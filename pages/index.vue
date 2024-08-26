<template>
  <!-- Container for the whole page with responsive background and text alignment -->
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white py-6 px-4 flex flex-col items-center justify-center">
    <!-- Navigation Bar: Responsive flex container with gap and padding for spacing and alignment -->
    <nav class="container mx-auto flex flex-col place-items-center sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white bg-opacity-10 p-4 rounded-full shadow-lg">
      <NuxtLink to="/anime" class="text-lg font-semibold hover:text-indigo-400 transition-colors duration-300">
        Anime
      </NuxtLink>
      <NuxtLink to="/manga" class="text-lg font-semibold hover:text-indigo-400 transition-colors duration-300">
        Manga
      </NuxtLink>
      <NuxtLink v-if="authToken" to="/auth/logout" class="text-lg font-semibold hover:text-indigo-400 transition-colors duration-300">
        Logout
      </NuxtLink>
      <NuxtLink v-else to="/auth/login" class="text-lg font-semibold hover:text-indigo-400 transition-colors duration-300">
        Login
      </NuxtLink>
      <NuxtLink v-if="authToken" to="/user" class="text-lg font-semibold hover:text-indigo-400 transition-colors duration-300">
        Account
      </NuxtLink>
    </nav>

    <!-- Welcome Message: Text centered with responsive text sizing for readability on all devices -->
    <div class="mt-8 text-center px-4">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
        Welcome to Your Favorite Place!
      </h1>
      <p class="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
        Dive into the world of Anime and Manga, explore new stories, and enjoy the comfort of a community that shares your passion.
      </p>
    </div>

    <!-- Call to Action Buttons: Responsive button styling with hover and scaling effects for interaction feedback -->
    <div class="mt-8 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
      <NuxtLink to="/anime" class="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 focus:outline-none">
        Explore Anime
      </NuxtLink>
      <NuxtLink to="/manga" class="bg-purple-600 hover:bg-purple-500 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 focus:outline-none">
        Explore Manga
      </NuxtLink>
    </div>
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
