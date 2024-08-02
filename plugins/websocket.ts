// plugins/websocket.ts

export interface IWebSocket {
  sendMessage(event: string, payload: any): void,
  onMessage(callback: (msg: string) => void): void
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  let socket: WebSocket | null = null

  try {
    socket = new WebSocket('ws://127.0.0.1:8080/ws')

    socket.onopen = () => {
      console.log('WebSocket connected')
      console.log('WebSocket readyState:', socket?.readyState) // Should be 1 (OPEN)
	  socket?.send(JSON.stringify({ target: 'has_anime:watched', payload: { token: '', value: '1', id: '' } }))
    }

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        console.log('Message received:', msg)
        nuxtApp.callHook('websocket:message', msg)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    socket.onclose = (event) => {
      console.log('WebSocket closed')
      console.log('Close event code:', event.code)
      console.log('Close event reason:', event.reason)
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  } catch (error) {
    console.error('Failed to connect to WS server', error)
  }

  nuxtApp.provide('ws', {
    sendMessage (target: string, payload: any) {
      if (socket?.readyState === WebSocket.OPEN) {
        console.log('Sending message:', { target, payload })
        socket.send(JSON.stringify({ target, payload }))
      } else {
        console.error('WebSocket is not open. Ready state:', socket?.readyState)
      }
    },
    onMessage (callback: (msg: any) => void) {
      nuxtApp.hook('websocket:message', callback)
    }
  })
})
