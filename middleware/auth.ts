export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) { return }

  const token = localStorage.getItem('auth_token')

  if (token === null) {
    return navigateTo('/auth/login')
  }
})
