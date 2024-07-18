import WebSocket from 'ws'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  try {
    const ws = new WebSocket(config.private.ws_url)

    ws.on('open', () => {
      console.log('Connected to WS server')
    })

    ws.on('message', (data) => {
      console.log('Received message', data)
    })

    ws.on('close', () => {
      console.log('Disconnected from WS server')
    })

    nuxtApp.provide('ws', ws)
  } catch (error) {
    console.error('Failed to connect to WS server', error)
  }
})
