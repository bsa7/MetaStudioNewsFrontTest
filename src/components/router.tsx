import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { pathSettings } from '@config/routes'
import { LocationInfo, PathSetting, PathSettings } from '@lib/common-defs'
import * as ApplicationPages from '@components/index'
import { currentLocation } from '@lib/isomorphic-helper'
import { getPropInSafe } from '@lib/sys-helper'
import { ApplicationPageName } from '@lib/common-defs'
import { ApplicationLinks } from '@constants/enums'
import { getDataFromState } from '@lib/flux-helper'
import { IApplicationState } from '@reducers'
import { SessionActions } from '@actions'
import { historyGo } from '@lib/router-helper'

type IRouterProps = {
  applicationState?: string
  reloadApplication?: () => void
}

type IRouterState = {}

type RouteSetting = {
  hostname: string
  locationRegexp: string
  pathname: string
  pathSetting: PathSetting
  success?: boolean
}

class RouterComponent extends React.Component<IRouterProps, IRouterState> {
  private routes: Array<RouteSetting>
  private internalPathSettings: PathSettings
  public links: ApplicationLinks
  static initialized: boolean
  static instance: RouterComponent

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
    this.internalPathSettings = pathSettings
    this.routes = []
    Object.keys(this.internalPathSettings).forEach((pathSettingKey) => {
      const pathSetting = this.internalPathSettings[pathSettingKey]
      let locationRegexp = `^${pathSetting.pathname}$`
      this.internalPathSettings[pathSettingKey].key = pathSettingKey
      this.internalPathSettings[pathSettingKey].hostname = (pathSetting.params || {}).domain
      this.internalPathSettings[pathSettingKey].locationRegexp = locationRegexp
      this.internalPathSettings[pathSettingKey].pathname = pathSetting.pathname
      this.routes.push({
        hostname: (pathSetting.params || {}).domain,
        locationRegexp,
        pathname: pathSetting.pathname,
        pathSetting,
      })
    })
    this.links = {} as ApplicationLinks
    Object.keys(this.internalPathSettings).forEach((key) => this.links[key as keyof ApplicationLinks] = key)
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
      throw new Error(`this.findRoute error: route ${locationInfo.pathname} not found.`)
    }
    return route
  }

  public get currentPathSetting(): PathSetting {
    const currentRoute = this.findRoute()
    return currentRoute.pathSetting
  }

  public get status(): number {
    const route = this.findRoute()
    return getPropInSafe(route, (r) => r.pathSetting.params.status, 200)
  }

  public reload(): void {
    this.props.reloadApplication()
  }

  public redirectTo(to: string): void {
    historyGo(to)
    this.reload()
  }

  render() {
    // const { applicationState } = this.props
    if (!Router.initialized) this.init()
    const currentRoute: RouteSetting = this.findRoute()
    const currentRoutePageName: string = currentRoute.pathSetting.componentName
    const CurrentPage = ApplicationPages[currentRoutePageName as ApplicationPageName]

    return <CurrentPage />
  }
}


const mapStateToProps = (state: IApplicationState): IRouterProps => {
  const { applicationState } = getDataFromState(state, 'session')
  return { applicationState }
}

const mapDispatchToProps = (dispatch: Dispatch): IRouterProps => {
  const reloadApplication = () => {
    dispatch(SessionActions.updateLocationInfo())
  }
  return { reloadApplication }
}

export const Router = connect(mapStateToProps, mapDispatchToProps)(RouterComponent)
export const router = new RouterComponent()
export const links = router.links
