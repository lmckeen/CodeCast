import { addChunk } from "../chunks"

let context

export function initMessages(castContext) {
  context = castContext

  context.addCustomMessageListener('urn:x-cast:com.codecast.reload', () => {
    location.reload()
  })
  
  context.addCustomMessageListener('urn:x-cast:com.codecast.send', ({ data }) => {
    addChunk(data)
  })

  // registering empty events because all events have to be registered
  // before the context start
  context.addCustomMessageListener('urn:x-cast:com.codecast.connected', () => {})
  context.addCustomMessageListener('urn:x-cast:com.codecast.resolve', () => {})
  context.addCustomMessageListener('urn:x-cast:com.codecast.reject', () => {})
}

export function sendResolve(id, data) {
  context.sendCustomMessage('urn:x-cast:com.codecast.resolve', undefined, {
    id, 
    data
  })
}

export function sendReject(id, error) {
  context.sendCustomMessage('urn:x-cast:com.codecast.reject', undefined, {
    id, 
    error
  })
}

export function sendConnected() {
  context.sendCustomMessage('urn:x-cast:com.codecast.connected')
}