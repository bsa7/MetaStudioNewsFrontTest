import * as React from 'react'
import { Link } from 'react-router-dom'
import { seoLink } from '@lib/router-helper'
import { Layout } from '@components/layout'
import { router } from '@components/router'
import { FormEditHandler, LocationInfo, ThemeName } from '@lib/common-defs'
import { Column, Root, Row } from './styled'
import { Button, TextInput } from '@interface-components'
import { ThemeMapper } from '@lib/theme-helper'
import { ButtonType } from '@constants/enums'

export interface IAuthProps {
  changeTheme?: (themeName: ThemeName) => void
  locationInfo?: LocationInfo
  loginUser?: (email: string, password: string) => void
  registerUser?: (email: string, password: string, passwordConfirmation: string) => void
  themeName?: ThemeName
}

export interface IAuthFormFields {
  email?: string
  password?: string
  passwordConfirmation?: string
}

export interface IAuthState extends IAuthFormFields {
  emailErrorMessage?: string
  passwordErrorMessage?: string
  passwordConfirmationErrorMessage?: string
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

  editFormField = (fieldName: string): FormEditHandler => {
    const handler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      this.setState({ [fieldName]: event.target.value }, () => {
        const inlineValidator = this[`${fieldName}IsValid` as keyof Auth]
        inlineValidator()
      })
    }
    return handler as FormEditHandler
  }

  formFieldIsValid = (
    fieldName: string,
    verifyCallback: (fieldValue: string) => boolean,
    errorMessage: string,
    force?: boolean
  ): boolean => {
    const fieldValue = this.state[fieldName as keyof IAuthFormFields]
    const verifyResult = verifyCallback(fieldValue)
    const fieldErrorMessage = this.state[`${fieldName}ErrorMessage` as keyof IAuthState]

    if (force || fieldErrorMessage) {
      this.setState({
        [`${fieldName}ErrorMessage`]: verifyResult ? '' : errorMessage,
      })
    }
    return verifyResult
  }

  emailIsValid = (force?: boolean): boolean => {
    return this.formFieldIsValid('email', (email = '') => /.+@.+/.test(email), 'Wrong email.', force)
  }

  passwordIsValid = (force?: boolean): boolean => {
    return !this.formFieldIsValid('password', (password = '') => /^.{3,}$/.test(password), 'Password must be minimum of 3 symbols.', force)
  }

  passwordConfirmationIsValid = (force?: boolean): boolean => {
    const { password } = this.state
    return this.formFieldIsValid('passwordConfirmation', (passwordConfirmation) => passwordConfirmation === password, 'Password and confirmation is not equal.', force)
  }

  formIsValid = ():boolean => {
    let validationResult = true
    if (!this.emailIsValid(true)) validationResult = false
    if (this.passwordIsValid(true)) validationResult = false
    if (this.isSignupMode()) {
      if (!this.passwordConfirmationIsValid(true)) validationResult = false
    }
    return validationResult
  }

  isLoginMode = (): boolean => {
    const { links } = router
    const currentRouteKey = router.currentPathSetting.key
    return currentRouteKey === links.LoginPage
  }

  isSignupMode = (): boolean => {
    const { links } = router
    const currentRouteKey = router.currentPathSetting.key
    return currentRouteKey === links.SignupPage
  }

  handleAuthFormButtonClick = (): void => {
    const { loginUser, registerUser } = this.props
    const { email, password, passwordConfirmation } = this.state
    if (!this.formIsValid()) return
    if (this.isLoginMode()) {
      loginUser(email, password)
    } else {
      registerUser(email, password, passwordConfirmation)
    }
  }

  render() {
    const isLoginMode = this.isLoginMode()
    const isSignupMode = this.isSignupMode()
    const { links } = router
    const titleText: string = `${isLoginMode ? 'Login' : 'Signup'}, my Friend!!!`
    const linkText: string = isLoginMode
      ? 'Not registered yet? Signup!'
      : 'Already registered? Login!'
    const { email, password, passwordConfirmation } = this.state
    const {
      emailErrorMessage,
      passwordErrorMessage,
      passwordConfirmationErrorMessage,
    } = this.state
    const { changeTheme } = this.props
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
                errorMessage={passwordErrorMessage}
                onChange={this.editFormField('password')}
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
                    onChange={this.editFormField('passwordConfirmation')}
                  />
                </Row>
              )
            }
            <Row>
              <Button
                onClick={this.handleAuthFormButtonClick}
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
