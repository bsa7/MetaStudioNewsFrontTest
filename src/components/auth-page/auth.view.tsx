import * as React from 'react'
import { Link } from 'react-router-dom'
import { seoLink } from '@lib/router-helper'
import { Layout } from '@components/layout'
import { router } from '@components/router'
import { Column, Root, Row } from './styled'
import { Button, TextInput } from '@interface-components'
import { ThemeMapper } from '@lib/theme-helper'
import { ButtonType } from '@constants/enums'
import { IAuthProps } from './auth.container'

export class Auth extends React.Component<IAuthProps> {
  render() {
    const { isLoginMode, isSignupMode, onAuthFormButtonClick } = this.props
    const {
      email,
      password,
      passwordConfirmation,
      emailErrorMessage,
      passwordErrorMessage,
      passwordConfirmationErrorMessage,
    } = this.props
    const { links } = router
    const titleText: string = `${isLoginMode ? 'Login' : 'Signup'}, my Friend!!!`
    const linkText: string = isLoginMode
      ? 'Not registered yet? Signup!'
      : 'Already registered? Login!'
    const { changeTheme, editFormField } = this.props
    const themeMapper = new ThemeMapper()
    const targetTheme = themeMapper.nextThemeName
    const authFormButtonText = `${isLoginMode ? 'Login' : 'Signup'}`
    const changeThemeButtonText = `Change theme to ${targetTheme}`

    return (
      <Layout>
        <Root>
          <Column>
            <Row>
              <h1>{titleText}</h1>
            </Row>
            <Row>
              <TextInput
                defaultValue={email}
                label='Email'
                name='email'
                placeholder='Enter email here'
                errorMessage={emailErrorMessage}
                onChange={editFormField('email')}
              />
            </Row>
            <Row>
              <TextInput
                defaultValue={password}
                label='Password'
                name='password'
                placeholder='Enter password here'
                type='password'
                errorMessage={passwordErrorMessage}
                onChange={editFormField('password')}
              />
            </Row>
            {
              isSignupMode && (
                <Row>
                  <TextInput
                    defaultValue={passwordConfirmation}
                    label='Password confirmation'
                    name='passwordConfirmation'
                    placeholder='Enter password confirmation here'
                    type='password'
                    errorMessage={passwordConfirmationErrorMessage}
                    onChange={editFormField('passwordConfirmation')}
                  />
                </Row>
              )
            }
            <Row>
              <Button
                onClick={onAuthFormButtonClick}
                type={ButtonType.primary}
              >
                {authFormButtonText}
              </Button>
            </Row>
            <Row>
              <Link
                to={seoLink(isLoginMode ? links.SignupPage : links.LoginPage)}
              >
                {linkText}
              </Link>
            </Row>
            <Row>
              <Button
                onClick={() => changeTheme(targetTheme)}
                type={ButtonType.secondary}
              >
                {changeThemeButtonText}
              </Button>
            </Row>
          </Column>
        </Root>
      </Layout>
    )
  }
}
