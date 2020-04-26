import * as React from 'react'
import { connect } from 'react-redux'
import { IApplicationState } from '@reducers/index'
import { getDataFromState } from '@lib/flux-helper'
import { Dispatch } from 'redux'
import * as SessionActions from '@actions/session-actions'
import { FormEditHandler, LocationInfo, ThemeName } from '@lib/common-defs'
import { router } from '@components/router'
import { checkRouteRedirect, historyGo } from '@lib/router-helper'
import { Auth } from './auth.view'

export interface IAuthOwnProps {
  editFormField?: (fielName: string) => FormEditHandler
  email?: string
  emailErrorMessage?: string
  formIsValid?: () => boolean
  isLoginMode?: boolean
  isSignupMode?: boolean
  onAuthFormButtonClick?: () => void
  password?: string
  passwordConfirmation?: string
  passwordConfirmationErrorMessage?: string
  passwordErrorMessage?: string
}

export interface IAuthMappedProps {
  changeTheme?: (themeName: ThemeName) => void
  locationInfo?: LocationInfo
  loginUser?: (email: string, password: string) => any
  registerUser?: (email: string, password: string, passwordConfirmation: string) => any
  themeName?: ThemeName
  updateLocationInfo?: () => void
}

export interface IAuthProps extends IAuthOwnProps, IAuthMappedProps {}

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


class AuthPage extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

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

  editFormField = (fieldName: string): FormEditHandler => {
    const handler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      this.setState({ [fieldName]: event.target.value }, () => {
        const inlineValidator = this[`${fieldName}IsValid` as keyof AuthPage]
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
    if (this.props.isSignupMode) {
      if (!this.passwordConfirmationIsValid(true)) validationResult = false
    }
    return validationResult
  }

  onAuthFormButtonClick = (): void => {
    const { loginUser, registerUser } = this.props
    const { email, password, passwordConfirmation } = this.state
    if (!this.formIsValid()) {
      return
    }
    const checkRouteAndRedirect = () => {
      const redirect = checkRouteRedirect()
      if (redirect) {
        console.log('#101', { redirect })
        historyGo(redirect)
        this.props.updateLocationInfo()
      }
    }
    if (this.isLoginMode()) {
      loginUser(email, password).then(checkRouteAndRedirect)
    } else {
      registerUser(email, password, passwordConfirmation).then(checkRouteAndRedirect)
    }
  }

  render() {
    const {
      email,
      emailErrorMessage,
      password,
      passwordConfirmation,
      passwordConfirmationErrorMessage,
      passwordErrorMessage,
    } = this.state
    return (
      <Auth
        editFormField={this.editFormField}
        email={email}
        emailErrorMessage={emailErrorMessage}
        formIsValid={this.formIsValid}
        isLoginMode={this.isLoginMode()}
        isSignupMode={this.isSignupMode()}
        onAuthFormButtonClick={this.onAuthFormButtonClick}
        password={password}
        passwordConfirmation={passwordConfirmation}
        passwordConfirmationErrorMessage={passwordConfirmationErrorMessage}
        passwordErrorMessage={passwordErrorMessage}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state: IApplicationState): IAuthMappedProps => {
  const { locationInfo, themeName } = getDataFromState<IAuthMappedProps>(state, 'session')
  return { locationInfo, themeName }
}

const mapDispatchToProps = (dispatch: Dispatch): IAuthMappedProps => {
  const changeTheme = (themeName: ThemeName): void => {
    const changeThemeParams: SessionActions.IChangeThemeParams = { themeName }
    dispatch(SessionActions.changeTheme(changeThemeParams))
  }
  const loginUser = (email: string, password: string): any => {
    return dispatch(SessionActions.loginUser({ email, password }))
  }
  const registerUser = (email: string, password: string, passwordConfirmation: string): any => {
    return dispatch(SessionActions.registerUser({ email, password, passwordConfirmation }))
  }
  const updateLocationInfo = (): void => {
    dispatch(SessionActions.updateLocationInfo())
  }

  return { changeTheme, loginUser, registerUser, updateLocationInfo }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
