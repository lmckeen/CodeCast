import { mergeChunks } from '../chunks'
import { sendReject, sendResolve } from '../messages'

window.CodeCast = {}

function append(id) {
  const script = document.createElement('script')
  
  script.innerHTML = `
    (function ({ resolve, reject }) {
      ${mergeChunks(id)}
    })(window.CodeCast['${id}'])
  `
  
  document.body.append(script)
}

function addPromise(id) {
  const promise = new Promise((resolve, reject) => {
    window.CodeCast[id] = {
      resolve,
      reject
    }
  })

  return promise
}

export function renderChunks(id) {
  const promise = addPromise(id)
  
  append(id)
  
  promise
    .catch(data => {
      sendReject(id, data)
    })
    .then((data) => {
      sendResolve(id, data)
    })
}