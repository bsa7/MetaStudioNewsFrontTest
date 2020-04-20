import { ApiResponse } from "@lib/common-defs"
import { RestMethod } from "@constants/enums"
import { fetchJsonFromAPI } from "@lib/api-helper"

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
