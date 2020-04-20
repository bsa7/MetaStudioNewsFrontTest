import { camelize, decamelize } from '@lib/string-helper'

const transformObjectKeysDeep = (obj: object, callback: (key: string) => string): object => {
  const stringifiedObject = JSON.stringify(obj)
  return JSON.parse(stringifiedObject.replace(/("[a-z_]+":)/g, (match: string): string => {
    return callback(match)
  }))
}

export const camelizeObjectKeysDeep = (obj: object): object => {
  return transformObjectKeysDeep(obj, (key: string) => camelize(key))
}

export const decamelizeObjectKeysDeep = (obj: object): object => {
  return transformObjectKeysDeep(obj, (key: string) => decamelize(key))
}
