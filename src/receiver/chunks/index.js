import { renderChunks } from '../render'

const chunkStorage = {}

function hasAllChunks(id) {
  return chunkStorage[id].length === chunkStorage[id][0].length
}

function sortChunks(id) {
  chunkStorage[id].sort((item1, item2) => item1.index - item2.index)
}

export function mergeChunks(id) {
  const chunks = chunkStorage[id]

  let codeString = ''
  
  chunks.forEach(item => {
    codeString += item.code
  })

  return codeString
}

export function addChunk(chunk) {
  chunkStorage[chunk.id] = chunkStorage[chunk.id] ?? []
  chunkStorage[chunk.id].push(chunk)
  
  if (hasAllChunks(chunk.id)) {
    sortChunks(chunk.id)
    renderChunks(chunk.id)
  }
}
