const promiseStorage = {}

export function createPromise(id) {
  const promise = new Promise((resolve, reject) => {
    promiseStorage[id] = {
      resolve,
      reject
    }
  })
  promiseStorage[id].promise = promise

  return promiseStorage[id]
}

export function resolvePromise(id, data) {
  promiseStorage[id].resolve(data)
}

export function rejectPromise(id, error) {
  promiseStorage[id].reject(error)
}