import { rejectPromise, resolvePromise } from '../promises'
import { purge } from '../queue'
import { setConnected } from '../status'
import { generateId } from '../util'

let session

function resolveMessage(namespace, event) {
  const {id, data} = JSON.parse(event)

  resolvePromise(id, data)
}

function rejectMessage(namespace, event) {
  const {id, error} = JSON.parse(event)

  rejectPromise(id, error)
}

function onConnected() {
  setConnected(true)
  purge()
}

export function dispatch(data = { id: generateId() }) {
  if (!session) return 

  session.sendMessage('urn:x-cast:com.codecast.send', data)
}

export function reload() {
  if (!session) return 

  session.sendMessage('urn:x-cast:com.codecast.reload', {})
}

export function dispatchArray(id, codeArray = []) {
  if (!session) return 
  
  codeArray.forEach((code, index) => {
    const length = codeArray.length
    dispatch({ code, id, index, length } )
  })
}

export function initResponse(castSession) {
  if (!castSession) return 
  
  session = castSession
    
  session.addMessageListener('urn:x-cast:com.codecast.connected', onConnected)
  session.addMessageListener('urn:x-cast:com.codecast.resolve', resolveMessage)
  session.addMessageListener('urn:x-cast:com.codecast.reject', rejectMessage)
}

