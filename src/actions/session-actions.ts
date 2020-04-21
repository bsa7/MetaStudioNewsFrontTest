import { actionNames } from "@constants/action-types"
import { RestMethod, ThemeName } from "@constants/enums"
import { createAsyncAction, createSyncAction } from "@lib/flux-helper"
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

interface IRegisterUserParams extends ILoginUserParams {
  passwordConfirmation: string
}
export const registerUser = (registerUserParams: IRegisterUserParams) => {
  const { email, password, passwordConfirmation } = registerUserParams
  return createAsyncAction<IRegisterUserParams>({
    actionName: actionNames.REGISTER_USER,
    method: RestMethod.post,
    params: { email, password, passwordConfirmation },
    path: '/users/new',
  })
}

export interface IChangeThemeParams {
  themeName: keyof typeof ThemeName
}
export const changeTheme = (changeThemeParams: IChangeThemeParams) => {
  const { themeName } = changeThemeParams
  return createSyncAction<IChangeThemeParams>({
    actionName: actionNames.CHANGE_THEME,
    result: { themeName },
  })
}
