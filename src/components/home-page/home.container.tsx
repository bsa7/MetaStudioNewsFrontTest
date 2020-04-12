import * as React from 'react'
import { IHomeProps, IHomeState, Home } from './home.view'
import { FetchComponentDataParams } from '@lib/common-defs'

export default class HomePage extends React.Component<IHomeProps, IHomeState> {
  state: IHomeState = {}
  static fetchData = (params: FetchComponentDataParams) => {
    const { dispatch, locationInfo, userAuthToken } = params
  }


  render() {
    return (
      <Home />
    )
  }
}
