import * as React from 'react'
import { Link } from 'react-router-dom'
import { Router } from '@components/router'
import { seoLink } from '@lib/router-helper'
import { Root } from './styled'
import { Layout } from '@components/layout'

export interface IAuthProps {
}

export interface IAuthState {
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

  render() {
    const currentRouteKey = Router.currentPathSetting.key

    return (
      <Layout>
        <Root>
          <h1>{currentRouteKey === Router.links.LoginPage ? 'Login' : 'Signup'}, friend!</h1>
          <Link
            to={seoLink(currentRouteKey === Router.links.LoginPage ? Router.links.SignupPage : Router.links.LoginPage)}
          >
            go to {currentRouteKey === Router.links.LoginPage ? 'signup' : 'login'} page
          </Link>
        </Root>
      </Layout>
    )
  }
}
