import { mergeChunks } from '../chunks'
import { sendReject, sendResolve } from '../messages'

window.CodeCast = {}

function append(code) {
  const url = window.URL.createObjectURL(
    new Blob([code], {
      type: 'application/javascript'
    })
  )

  const script = document.createElement('script')
  script.src = url

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

function addWrapper(id) {
  return `
    (function ({ resolve, reject }) {
      ${mergeChunks(id)}
    })(window.CodeCast['${id}'])
  `
}

export function renderChunks(id) {
  const promise = addPromise(id)
  const code = addWrapper(id)
  
  append(code)
  
  promise
    .catch(data => {
      sendReject(id, data)
    })
    .then((data) => {
      sendResolve(id, data)
    })
}