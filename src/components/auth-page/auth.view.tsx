import * as React from 'react'
import { Link } from 'react-router-dom'
import { Router } from '@components/router'
import { seoLink } from '@lib/router-helper'
import { Layout } from '@components/layout'
import { Column, Root, Row } from './styled'

export interface IAuthProps {
}

export interface IAuthState {
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

  render() {
    const currentRouteKey = Router.currentPathSetting.key
    const titleText: string = `${currentRouteKey === Router.links.LoginPage ? 'Login' : 'Signup'}, my Friend!!!`
    const linkText: string = currentRouteKey === Router.links.LoginPage
      ? 'Not registered yet? Signup!'
      : 'Already registered? Login!'

    return (
      <Layout>
        <Root>
          <Column>
            <Row>
            <h1>{titleText}</h1>
            </Row>
            <Row>
              <Link
                to={seoLink(currentRouteKey === Router.links.LoginPage ? Router.links.SignupPage : Router.links.LoginPage)}
              >
                {linkText}
              </Link>
            </Row>
          </Column>
        </Root>
      </Layout>
    )
  }
}
