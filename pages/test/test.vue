<template>
  <div>
    <h1>Test</h1>
    <button @click="dosomething">
      Click
    </button>
  </div>
</template>

<script lang="ts" setup>

const dosomething = () => {
  const cookie = useCookie('test')
  cookie.value = '123'
  Console.log('cookie', cookie.value)
}

// const dosomething = () => {
//   localStorage.setItem('id', '123')
//   const id = localStorage.getItem('id')
//   Console.log('id', id)
// }

</script>

<style>

</style>
