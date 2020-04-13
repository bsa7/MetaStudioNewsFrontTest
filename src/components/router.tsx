import * as React from 'react'
import { pathSettings } from '@config/routes'
import { EnumMap, HashMap, LocationInfo, PathSetting } from '@lib/common-defs'
import * as ApplicationPages from '@components/index'
import { currentLocation } from '@lib/isomorphic-helper'
import { getPropInSafe, traceError } from '@lib/sys-helper'
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
      console.log('#25 - Router already initialized', {
        'Router.status': Router.status,
      })
      return Router.instance
    }
    Router.initialized = true
    Router.pathSettings = pathSettings
    this.routes = []
    console.log('#33 Router initialization')
    Object.keys(Router.pathSettings).forEach((pathSettingKey) => {
      const pathSetting = Router.pathSettings[pathSettingKey]
      let locationRegexp = `^${pathSetting.pathname}$`
      Router.pathSettings[pathSettingKey].key = pathSettingKey
      Router.pathSettings[pathSettingKey].hostname = (pathSetting.params || {}).domain
      Router.pathSettings[pathSettingKey].locationRegexp = locationRegexp
      Router.pathSettings[pathSettingKey].pathname = pathSetting.pathname
      this.routes.push({
        hostname: (pathSetting.params || {}).domain,
        locationRegexp,
        pathname: pathSetting.pathname,
        pathSetting,
      })
    })
    Router.links = {}
    Object.keys(Router.pathSettings).forEach((key) => Router.links[key] = key)
    console.log('#45 Router initialized: ', {
      'Router.pathSettings': Router.pathSettings,
      'Router.links': Router.links,
    })
    Router.instance = this
  }
  static initialized: boolean
  static instance: Router
  private routes: Array<RouteSetting>
  static pathSettings: HashMap<PathSetting>
  static status: number
  static links: EnumMap<typeof pathSettings, string>
  static currentPathSetting: PathSetting

  public findRoute = (locationInfo: LocationInfo = currentLocation.locationInfo()): RouteSetting => {
    // let route = this.routes.find((route: RouteSetting) => {
    //   const checkRegexp = new RegExp(route.locationRegexp)
    //   const pathnameMatched = checkRegexp.test(locationInfo.pathname)
    //   const hostMatched = (route.hostname && route.hostname == locationInfo.hostname) || !route.hostname
    //   return pathnameMatched && hostMatched
    // })
    let route = this.routes.find((route: RouteSetting) => {
      const checkRegexp = new RegExp(route.locationRegexp)
      const pathnameMatched = checkRegexp.test(locationInfo.pathname)
      // console.log('#65', {
      //   locationInfo,
      //   route,
      //   checkRegexp,
      //   pathnameMatched,
      // })
      const hostMatched = (route.hostname && route.hostname == locationInfo.hostname) || !route.hostname
      return pathnameMatched && hostMatched
    })
    if (typeof route === 'undefined') {
      route = this.routes.slice(-1)[0]
      traceError({ message: `Router.findRoute error: route ${locationInfo.pathname} not found.` })
    }
    Router.status = getPropInSafe(route, (r) => r.pathSetting.params.status, 200)
    Router.currentPathSetting = route.pathSetting
    return route
  }

  render() {
    const currentRoute: RouteSetting = this.findRoute()
    // console.log('#90', { currentRoute })
    const currentRoutePageName: string = currentRoute.pathSetting.componentName
    const CurrentPage = ApplicationPages[currentRoutePageName as ApplicationPageName]

    return (
      <CurrentPage />
    )
  }
}
