import React from 'react'
import { connect } from 'react-redux'
import { seoLink } from '@lib/router-helper'
import { Link } from 'react-router-dom'
import { links } from '@components/router'
import { userAuthTokenCookie } from '@lib/cookie-helper'
import { Button } from '../unstyled/button'
import { LocationInfo } from '@lib/common-defs'
import { IApplicationState } from '@reducers'
import { getDataFromState } from '@lib/flux-helper'
import { getPropInSafe } from '@lib/sys-helper'
import { logout } from '@lib/session-helper'

interface IApplicationHeaderProps {
  locationInfo: LocationInfo
}

const ApplicationHeaderContainer = (props: IApplicationHeaderProps) => {
  const pathname = getPropInSafe(props, (p) => p.locationInfo.pathname, '')
  const userLoggedIn = userAuthTokenCookie()
  const isLoginPage = !userLoggedIn && /\/login\b/.test(pathname)
  const isSignupPage = !userLoggedIn && /\/signup/.test(pathname)
  const isAuthPage = isLoginPage || isSignupPage

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to={seoLink(links.HomePage)}>Application header</Link>
        </div>
        <ul className="nav navbar-nav">
          {
            isLoginPage && (
              <li>
                <Link to={seoLink(links.SignupPage)}>Signup</Link>
              </li>
            )
          }
          {
            isSignupPage && (
              <li>
                <Link to={seoLink(links.LoginPage)}>Login</Link>
              </li>
            )
          }
          {
            !isAuthPage && (
              <li>
                <Button onClick={logout}>Logout</Button>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state: IApplicationState): IApplicationHeaderProps => {
  const { locationInfo } = getDataFromState(state, 'session')
  return { locationInfo }
}

export const ApplicationHeader = connect(mapStateToProps)(ApplicationHeaderContainer)
