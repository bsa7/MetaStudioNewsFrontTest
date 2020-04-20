import * as React from 'react'
import { connect } from 'react-redux'
import { IAuthProps, IAuthState, Auth } from './auth.view'
import { IApplicationState } from '@reducers/index'
import { getDataFromState } from '@lib/flux-helper'
import { LocationInfo } from '@lib/common-defs'

class AuthPage extends React.Component<IAuthProps, IAuthState> {
  state: IAuthState = {}

  render() {
    return (
      <Auth {...this.props} />
    )
  }
}

const mapStateToProps = (state: IApplicationState, props: IAuthProps): IAuthProps => {
  const locationInfo = getDataFromState<LocationInfo>(state, 'session.locationInfo')
  return { locationInfo }
}

export default connect(mapStateToProps)(AuthPage)
