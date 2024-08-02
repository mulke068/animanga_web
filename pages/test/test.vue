<template>
  <div>
    <h1>WebSocket Example</h1>
    <button class=" submit-button" @click="checkAnime">
      Check Anime
    </button>
  </div>
</template>

<script setup>
// Remove the declaration of the variable '$ws'
const ws = useNuxtApp().$ws

// Register a callback for handling incoming WebSocket messages
ws.onMessage((msg) => {
  console.log('Message received in component:', msg)
})

// Send a message when a button is clicked
const checkAnime = () => {
  ws.sendMessage('test', { message: 'Hello from the client!' })
}
</script>
