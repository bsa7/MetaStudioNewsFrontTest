import * as React from 'react'
import { IHomeProps, IHomeState, Home } from './home.view'

export default class HomePage extends React.Component<IHomeProps, IHomeState> {
  state: IHomeState = {}

  render() {
    return (
      <Home />
    )
  }
}
