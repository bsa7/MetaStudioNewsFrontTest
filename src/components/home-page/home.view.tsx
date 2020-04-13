import * as React from 'react'
import { Root } from './styled'
import { Layout } from '@components/layout'

export interface IHomeProps {
}

export interface IHomeState {
}

export class Home extends React.Component<IHomeProps, IHomeState> {
  state: IHomeState = {
  }

  render() {
    return (
      <Layout>
        <Root>
          <h1>Home page!</h1>
        </Root>
      </Layout>
    )
  }
}
