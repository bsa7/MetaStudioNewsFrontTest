export const decamelize = (text: string, separator: string = '_'): string => {
  const result = text
    .replace(/([A-Z])/g, `${separator}$1`)
    .replace(/^_/, '')
    .toLowerCase()
  return result
}

export const capitalize = (word: string): string => {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`
}

export const camelize = (text: string, separator: string = '_'): string => {
  if (typeof text === 'undefined') {
    return undefined
  }
  const words = text.split(separator)
  const result = [words[0]]
  words.slice(1).forEach((word) => result.push(capitalize(word)))
  return result.join('')
}

export const randomString = (): string => {
  return new Date().getTime().toString()
}
