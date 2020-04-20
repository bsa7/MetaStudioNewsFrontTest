import * as React from 'react'
import { Link } from 'react-router-dom'
import { router } from '@components/router'
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
    const currentRouteKey = router.currentPathSetting.key
    const titleText: string = `${currentRouteKey === router.links.LoginPage ? 'Login' : 'Signup'}, my Friend!!!`
    const linkText: string = currentRouteKey === router.links.LoginPage
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
                to={seoLink(currentRouteKey === router.links.LoginPage ? router.links.SignupPage : router.links.LoginPage)}
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
