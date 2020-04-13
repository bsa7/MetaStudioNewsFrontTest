import * as React from 'react'
import { IAuthProps, IAuthState, Auth } from './auth.view'

export default class AuthPage extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

  render() {
    return (
      <Auth />
    )
  }
}
