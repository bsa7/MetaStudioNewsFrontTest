import * as React from 'react'
import { IAuthProps, IAuthState, Auth } from './auth.view'
import { FetchComponentDataParams } from '@lib/common-defs'

export default class AuthPage extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}
  static fetchData = (params: FetchComponentDataParams) => {
    const { dispatch, locationInfo, userAuthToken } = params
  }

  render() {
    return (
      <Auth />
    )
  }
}
