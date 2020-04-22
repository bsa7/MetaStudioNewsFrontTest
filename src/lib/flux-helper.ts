import { ApiResponse, ValuesOf } from '@lib/common-defs'
import { RestMethods } from '@constants/enums'
import { fetchJsonFromAPI } from '@lib/api-helper'
import { IApplicationState } from '@reducers/index'
import { actionNamesArray } from '@constants/action-types'

type AsyncActionResult = {
  promise: Promise<ApiResponse>
  types: [string, string, string]
}

type SyncActionResult<R> = {
  type: string
  result: R
}

interface IAsyncActionParams<T> {
  actionName: string
  method?: RestMethods
  params?: T
  path: string
  userAuthToken?: string
}
interface ISyncActionParams<T> {
  actionName: string
  result?: T
}


export const createAsyncAction = <T>(actionParams: IAsyncActionParams<T>): AsyncActionResult => {
  const { actionName, method = RestMethods.get, path, params = {} as T, userAuthToken } = actionParams
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

export const createSyncAction = <T>(actionParams: ISyncActionParams<T>): SyncActionResult<T> => {
  const { actionName, result } = actionParams
  return {
    type: `${actionName}__START`,
    result,
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

