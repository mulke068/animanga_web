export default defineNuxtRouteMiddleware((to, from) => {
  function isAuthenticated () {
    return false
  }

  if (!isAuthenticated()) {
    return navigateTo('/login')
  }
})
