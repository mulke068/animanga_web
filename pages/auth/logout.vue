<template>
  <div>
    <h1>Logout</h1>
    <p>Are you sure that you want to Logout ?</p>
    <button type="button" @click="handleLogout">
      Logout
    </button>
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
