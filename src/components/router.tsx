import * as React from 'react'
import { pathSettings } from '@config/routes'
import { PathSetting, LocationInfo } from '@lib/common-defs'
import * as ApplicationPages from '@components/index'
import { currentLocation } from '@lib/isomorphic-helper'
import { traceError } from '@lib/sys-helper'
import { ApplicationPageName } from '@lib/common-defs'

type RouterProps = {}

type RouterState = {}

type RouteSetting = {
  hostname: string;
  locationRegexp: string;
  pathname: string;
  pathSetting: PathSetting;
}

export class Router extends React.Component<RouterProps, RouterState> {
  constructor(props: RouterProps = {}) {
    super(props)
    if (Router.initialized) {
      return Router.instance
    }
    Router.initialized = true
    this.pathSettings = pathSettings
    this.routes = this.pathSettings.map((pathSetting) => {
      console.log('#29 Router initialization', { pathSetting })
      let locationRegexp = pathSetting.pathname
      locationRegexp = `^${locationRegexp}$`

      return {
        hostname: (pathSetting.params || {}).domain,
        locationRegexp,
        pathname: pathSetting.pathname,
        pathSetting,
      }
    })
    Router.instance = this
  }
  static initialized: boolean
  static instance: Router
  private routes: Array<RouteSetting>
  public pathSettings: Array<PathSetting>

  public findRoute = (locationInfo: LocationInfo = currentLocation.locationInfo()): RouteSetting => {
    const route = this.routes.find((route: RouteSetting) => {
      const checkRegexp = new RegExp(route.locationRegexp)
      const pathnameMatched = checkRegexp.test(locationInfo.pathname)
      const hostMatched = (route.hostname && route.hostname == locationInfo.hostname) || !route.hostname
      return pathnameMatched && hostMatched
    })
    if (typeof route === 'undefined') {
      const notFoundRoute = this.routes.slice(-1)[0]
      traceError({ message: `Router.findRoute error: route ${locationInfo.pathname} not found.` })
      return notFoundRoute
    }
    return route
  }

  render() {
    const currentRoute: RouteSetting = this.findRoute()
    const currentRoutePageName: string = currentRoute.pathSetting.componentName
    const CurrentPage = ApplicationPages[currentRoutePageName as ApplicationPageName]
    // console.log('#66', { currentRoute })
    // traceError({ message: '#66' })

    return <CurrentPage />
  }
}
