import * as React from 'react'
import { Root } from './styled'

export interface IHomeProps {
}

export interface IHomeState {
}

export class Home extends React.Component<IHomeProps, IHomeState> {
  state: IHomeState = {
  }

  render() {
    return (
      <Root>
        Home
      </Root>
    )
  }
}
