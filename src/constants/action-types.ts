import { hashActionNames, mapActionNames } from '@lib/flux-helper'

export const actionNamesArray = [
  'FETCH_USER',
  'LOGIN_USER',
  'REGISTER_USER',
]

export const actionNames = hashActionNames(actionNamesArray)
export const actionTypes = mapActionNames(actionNamesArray)
