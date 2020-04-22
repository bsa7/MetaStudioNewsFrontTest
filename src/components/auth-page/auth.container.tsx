import * as React from 'react'
import { connect } from 'react-redux'
import { IAuthProps, IAuthState, Auth } from './auth.view'
import { IApplicationState } from '@reducers/index'
import { getDataFromState } from '@lib/flux-helper'
import { Dispatch } from 'redux'
import * as SessionActions from '@actions/session-actions'
import { IChangeThemeParams } from '@actions/session-actions'
import { ThemeName } from '@lib/common-defs'

class AuthPage extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

  render() {
    return (
      <Auth {...this.props} />
    )
  }
}

const mapStateToProps = (state: IApplicationState): IAuthProps => {
  const { locationInfo, themeName } = getDataFromState<IAuthProps>(state, 'session')
  return { locationInfo, themeName }
}

const mapDispatchToProps = (dispatch: Dispatch): IAuthProps => {
  const changeTheme = (themeName: ThemeName): void => {
    const changeThemeParams: IChangeThemeParams = { themeName }
    dispatch(SessionActions.changeTheme(changeThemeParams))
  }

  return { changeTheme }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
