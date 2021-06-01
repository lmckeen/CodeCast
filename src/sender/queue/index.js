import { chunkString, generateId } from '../util'
import { createPromise } from '../promises'
import { dispatchArray } from '../messages'
import { isConnected } from '../status'

const queue = []

export async function send(url) {
  if (typeof url !== 'string') throw Error('No URL provided to send method')

  return sendString(await (await fetch(url)).text())
}

export function sendString(code) {
  if (typeof code !== 'string') throw Error('No JS string provided to sendString method')

  const id = generateId()

  queue.push({ id, code } )

  if (!isConnected()) {
    return createPromise(id).promise
  }

  purge()
  return createPromise(id).promise
}

export function purge() {
  if (!isConnected()) throw Error('RemotePlayer Not Connected Yet')

  while(queue.length > 0) {
    const data = queue.shift()
    dispatchArray(data.id, chunkString(data.code))
  }
}
