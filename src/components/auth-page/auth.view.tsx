import * as React from 'react'
import { Link } from 'react-router-dom'
import { seoLink } from '@lib/router-helper'
import { Layout } from '@components/layout'
import { router } from '@components/router'
import { LocationInfo } from '@lib/common-defs'
import { Column, Root, Row } from './styled'

export interface IAuthProps {
  currentLocation?: LocationInfo
}

export interface IAuthState {
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

  render() {
    const { links } = router
    const currentRouteKey = router.currentPathSetting.key
    const titleText: string = `${currentRouteKey === links.LoginPage ? 'Login' : 'Signup'}, my Friend!!!`
    const linkText: string = currentRouteKey === links.LoginPage
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
                to={seoLink(currentRouteKey === links.LoginPage ? links.SignupPage : links.LoginPage)}
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
