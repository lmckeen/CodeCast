export function generateId() {
  return `CodeCast_${Math.random()}`
}

export function chunkString(code, length = 25000) {
  const chunkedCode = []

  while(code !== '') {
    chunkedCode.push(code.slice(0, length))
    code = code.slice(length)
  }

  return chunkedCode
}