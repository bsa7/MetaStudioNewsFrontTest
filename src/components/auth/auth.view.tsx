import * as React from 'react'
import { Root } from './styled'

export interface IAuthProps {
}

export interface IAuthState {
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {
  }

  render() {
    return (
      <Root>
        <h1>Auth, world!</h1>
      </Root>
    )
  }
}
