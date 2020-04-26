import { pathSettings } from '@config/routes'
import { PathSetting, RouteParams } from '@lib/common-defs'
import { hostSettings } from '@config/front-settings'
import { currentLocation, isClientSide, locationInfoToLink, isServerSide } from '@lib/isomorphic-helper'
import { paramsToSearch } from '@lib/json-api-helper'
import { ApplicationLinks } from '@constants/enums'
import { cookie } from './cookie-helper'
import { constants } from '@constants/string-constants'
import { router } from '@components/router'
import { getPropInSafe } from './sys-helper'

export const get = (pathname: string, componentName: string, params = <RouteParams>{}): PathSetting => {
  const pathSetting: PathSetting = {
    componentName,
    domain: params.domain,
    params,
    pathname,
  }
  return pathSetting
}

export const seoLink = (pathSettingKey: string, params: RouteParams = <RouteParams>{}): string => {
  const pathSetting = pathSettings[pathSettingKey as keyof ApplicationLinks]
  let { pathname } = pathSetting
  let hostname: string
  if (params.absolute || params.domain) {
    delete params.absolute
    if (params.domain) {
      hostname = `${hostSettings.protocol}//${params.domain}`
      delete params.domain
    } else {
      const currentDomain = (() => {
        return currentLocation.locationInfo().hostname
      })()
      hostname = `${hostSettings.protocol}//${pathSetting.domain || currentDomain}`
    }
  }

  Object.keys(params).forEach((key: keyof RouteParams) => {
    if (pathname.indexOf(`:${key}`) >= 0) {
      pathname = pathname.replace(`:${key}`, params[key].toString())
      delete params[key]
    }
  })
  const search = paramsToSearch(params)
  return [[hostname, pathname].filter((x) => x).join(''), search].filter((x) => x).join('?')
}

export const historyGo = (to: string) => {
  if (typeof window !== 'undefined') {
    let comparedPath = to
    const currentLocationInfo = currentLocation.locationInfo()
    if (!/^https?:/.test(to)) {
      comparedPath = `${currentLocationInfo.protocol}//${currentLocationInfo.hostname}${comparedPath}`
    }
    if (comparedPath !== currentLocationInfo.href) {
      history.pushState({}, '', to)
    }
  }
}

export const redirectAuthSuccess = (newUrl?: string): string => {
  const cookieValue = cookie.get(constants.REDIRECT_AUTH_SUCCESS) || ''
  if (typeof newUrl === 'undefined') {
    cookie.remove(constants.REDIRECT_AUTH_SUCCESS)
  } else {
    cookie.set(constants.REDIRECT_AUTH_SUCCESS, newUrl)
  }
  return cookieValue
}

export const redirectTo = (serverResponse: any, pathname: string): void => {
  if (serverResponse) {
    serverResponse.redirect(302, pathname)
  } else if (isClientSide()) {
    historyGo(pathname)
  }
}

export const redirects = {
  redirectAuthenticatedUser(): string {
    const { links } = router
    let redirectLink = undefined
    const userAuthToken = cookie.get(constants.USER_AUTH_TOKEN)
    if (userAuthToken) {
      redirectLink = redirectAuthSuccess() || seoLink(links.HomePage)
    }
    return redirectLink
  },
  redirectUnauthenticatedUser(): string {
    let redirectLink = undefined
    const userAuthToken = cookie.get(constants.USER_AUTH_TOKEN)
    if (!userAuthToken) {
      const { links } = router
      const locationInfo = currentLocation.locationInfo()
      const currentUrl = locationInfoToLink({ locationInfo })
      redirectAuthSuccess(currentUrl)
      redirectLink = seoLink(links.LoginPage)
    }
    return redirectLink
  },
}

export const checkRouteRedirect = (): string => {
  const matchedRouteSetting = router.currentPathSetting
  if (router.status === 200 && getPropInSafe(matchedRouteSetting, (x: PathSetting) => x.params.redirect)) {
    const redirect = matchedRouteSetting.params.redirect()
    if (typeof redirect !== 'undefined') {
      return redirect
    }
  }
  return undefined
}
