import { hashActionNames, mapActionNames } from '@lib/flux-helper'

export const actionNamesArray = [
  'FETCH_USER',
  'HIDE_NOTIFICATION_MESSAGE',
  'LOGIN_USER',
  'PUSH_NOTIFICATION_MESSAGE',
  'REGISTER_USER',
  'CHANGE_THEME',
]

export const actionNames = hashActionNames(actionNamesArray)
export const actionTypes = mapActionNames(actionNamesArray)
