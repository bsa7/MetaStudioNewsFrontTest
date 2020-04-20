import { ApiResponse, ValuesOf } from '@lib/common-defs'
import { RestMethod } from '@constants/enums'
import { fetchJsonFromAPI } from '@lib/api-helper'
import { IApplicationState } from '@reducers/index'
import { actionNamesArray } from '@constants/action-types'

type ActionResult = {
  promise: Promise<ApiResponse>
  types: [string, string, string]
}

interface IActionParams<T> {
  actionName: string
  method?: RestMethod
  params?: T
  path: string
  userAuthToken?: string
}

export const createAsyncAction = <T>(actionParams: IActionParams<T>): ActionResult => {
  const { actionName, method = RestMethod.get, path, params = {} as T, userAuthToken } = actionParams
  return {
    promise: fetchJsonFromAPI({
      method,
      params,
      path,
      userAuthToken,
    }),
    types: [
      `${actionName}__START`,
      `${actionName}__SUCCESS`,
      `${actionName}__FAILURE`,
    ]
  }
}

export const getDataFromState = <T>(state: IApplicationState, path: string): T => {
  const iterator = path.split('.')
  let result: any = state
  while (iterator.length) {
    result = result[iterator.shift()]
    if (typeof result === 'undefined') return undefined
  }
  return result as T
}

export type ActionNameKey = {
  [key in ValuesOf<typeof actionNamesArray>]: string
}

export const hashActionNames = (actionNamesArray: Array<string>): ActionNameKey => {
  const result = {} as ActionNameKey
  actionNamesArray.forEach((actionName: string) => result[actionName] = actionName)
  return result
}

export const mapActionNames = (actionNamesArray: Array<string>): ActionNameKey => {
  const result = {} as ActionNameKey
  actionNamesArray.forEach((actionName: string) => {
    result[`${actionName}__START`] = `${actionName}__START`
    result[`${actionName}__SUCCESS`] = `${actionName}__SUCCESS`
    result[`${actionName}__FAILURE`] = `${actionName}__FAILURE`
  })
  return result
}

