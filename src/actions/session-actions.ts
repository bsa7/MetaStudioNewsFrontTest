import { actionNames } from "@constants/action-types"
import { RestMethod } from "@constants/enums"
import { createAsyncAction } from "@lib/flux-helper"
import { IFetchParams } from "@lib/common-defs"


interface IFetchUserParams extends IFetchParams {}

export const fetchUser = (fetchParams: IFetchUserParams) => {
  const { userAuthToken } = fetchParams
  return createAsyncAction<IFetchUserParams>({
    actionName: actionNames.FETCH_USER,
    path: '/current_user',
    userAuthToken,
  })
}

interface ILoginUserParams {
  email: string
  password: string
}

export const loginUser = (loginUserParams: ILoginUserParams) => {
  const { email, password } = loginUserParams
  return createAsyncAction<ILoginUserParams>({
    actionName: actionNames.LOGIN_USER,
    method: RestMethod.post,
    params: { email, password },
    path: '/authenticate',
  })
}
