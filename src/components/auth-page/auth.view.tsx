import * as React from 'react'
import { Link } from 'react-router-dom'
import { seoLink } from '@lib/router-helper'
import { Layout } from '@components/layout'
import { router } from '@components/router'
import { FormEditHandler, LocationInfo, ThemeName } from '@lib/common-defs'
import { Column, Root, Row } from './styled'
import { TextInput } from '@interface-components'
import { ThemeMapper } from '@lib/theme-helper'

export interface IAuthProps {
  changeTheme?: (themeName: ThemeName) => void
  locationInfo?: LocationInfo
  themeName?: ThemeName
}

export interface IAuthState {
  email?: string
  password?: string
  passwordConfirmation?: string
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

  editFormField = (fieldName: string): FormEditHandler => {
    const handler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      this.setState({ [fieldName]: event.target.value })
    }
    return handler as FormEditHandler
  }

  render() {
    const { links } = router
    const currentRouteKey = router.currentPathSetting.key
    const titleText: string = `${currentRouteKey === links.LoginPage ? 'Login' : 'Signup'}, my Friend!!!`
    const linkText: string = currentRouteKey === links.LoginPage
      ? 'Not registered yet? Signup!'
      : 'Already registered? Login!'
    const { email, password, passwordConfirmation } = this.state
    const { changeTheme } = this.props
    const themeMapper = new ThemeMapper()
    const targetTheme = themeMapper.nextThemeName
    const changeThemeButtonText = `Change theme to ${targetTheme}`

    return (
      <Layout>
        <Root>
          <Column>
            <form>
              <Row>
                <h1>{titleText}</h1>
              </Row>
              <Row>
                <TextInput
                  defaultValue={email}
                  label='Email'
                  name='email'
                  placeholder='Enter email here'
                  onChange={this.editFormField('email')}
                />
              </Row>
              <Row>
                <TextInput
                  defaultValue={password}
                  label='Password'
                  name='password'
                  placeholder='Enter password here'
                  type='password'
                  onChange={this.editFormField('password')}
                />
              </Row>
              {
                currentRouteKey === links.SignupPage && (
                  <Row>
                    <TextInput
                      defaultValue={passwordConfirmation}
                      label='Password confirmation'
                      name='passwordConfirmation'
                      placeholder='Enter password confirmation here'
                      type='password'
                      onChange={this.editFormField('passwordConfirmation')}
                    />
                  </Row>
                )
              }
            </form>
            <Row>
              <Link
                to={seoLink(currentRouteKey === links.LoginPage ? links.SignupPage : links.LoginPage)}
              >
                {linkText}
              </Link>
            </Row>
            <Row>
              <button
                onClick={() => changeTheme(targetTheme)}
              >
                {changeThemeButtonText}
              </button>
            </Row>
          </Column>
        </Root>
      </Layout>
    )
  }
}
