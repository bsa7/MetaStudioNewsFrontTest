import * as React from 'react'
import { pathSettings } from '@config/routes'
import { EnumMap, HashMap, LocationInfo, PathSetting } from '@lib/common-defs'
import * as ApplicationPages from '@components/index'
import { currentLocation } from '@lib/isomorphic-helper'
import { getPropInSafe, traceError } from '@lib/sys-helper'
import { ApplicationPageName } from '@lib/common-defs'
import { Route } from 'react-router-dom'

type IRouterProps = {
}

type IRouterState = {}

type RouteSetting = {
  hostname: string;
  locationRegexp: string;
  pathname: string;
  pathSetting: PathSetting;
}

export class Router extends React.Component<IRouterProps, IRouterState> {
  private routes: Array<RouteSetting>
  private pathSettings: HashMap<PathSetting>
  public status: number
  public links: EnumMap<typeof pathSettings, string>
  static initialized: boolean
  static instance: Router

  constructor(props?: IRouterProps) {
    super(props)
    if (Router.initialized) {
      return Router.instance
    } else {
      this.init()
      Router.initialized = true
      Router.instance = this
    }
  }

  private init(): void {
    this.pathSettings = pathSettings
    this.routes = []
    Object.keys(this.pathSettings).forEach((pathSettingKey) => {
      const pathSetting = this.pathSettings[pathSettingKey]
      let locationRegexp = `^${pathSetting.pathname}$`
      this.pathSettings[pathSettingKey].key = pathSettingKey
      this.pathSettings[pathSettingKey].hostname = (pathSetting.params || {}).domain
      this.pathSettings[pathSettingKey].locationRegexp = locationRegexp
      this.pathSettings[pathSettingKey].pathname = pathSetting.pathname
      this.routes.push({
        hostname: (pathSetting.params || {}).domain,
        locationRegexp,
        pathname: pathSetting.pathname,
        pathSetting,
      })
    })
    this.links = {}
    Object.keys(this.pathSettings).forEach((key) => this.links[key] = key)
  }

  private findRoute = (locationInfo: LocationInfo = currentLocation.locationInfo()): RouteSetting => {
    let route = this.routes.find((route: RouteSetting) => {
      const checkRegexp = new RegExp(route.locationRegexp)
      const pathnameMatched = checkRegexp.test(locationInfo.pathname)
      const hostMatched = (route.hostname && route.hostname == locationInfo.hostname) || !route.hostname
      return pathnameMatched && hostMatched
    })
    if (typeof route === 'undefined') {
      route = this.routes.slice(-1)[0]
      traceError({ message: `this.findRoute error: route ${locationInfo.pathname} not found.` })
    }
    this.status = getPropInSafe(route, (r) => r.pathSetting.params.status, 200)
    return route
  }

  public get currentPathSetting() {
    const currentRoute = this.findRoute()
    return currentRoute.pathSetting
  }

  render() {
    if (!Router.initialized) this.init()
    const currentRoute: RouteSetting = this.findRoute()
    const currentRoutePageName: string = currentRoute.pathSetting.componentName
    const CurrentPage = ApplicationPages[currentRoutePageName as ApplicationPageName]

    return <CurrentPage />
  }
}

export const router = new Router()
