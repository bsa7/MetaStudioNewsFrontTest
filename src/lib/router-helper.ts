import { pathSettings } from '@config/routes'
import { PathSetting, RouteParams } from '@lib/common-defs'
import { hostSettings } from '@config/front-settings'
import { currentLocation } from '@lib/isomorphic-helper'
import { paramsToSearch } from '@lib/json-api-helper'

export const get = (pathname: string, componentName: string, params: RouteParams = <RouteParams>{}): PathSetting => {
  const pathSetting: PathSetting = {
    componentName,
    domain: params.domain,
    pathname,
  }
  return pathSetting
}

export const seoLink = (pathSettingKey: string, params: RouteParams = <RouteParams>{}): string => {
  const pathSetting = pathSettings[pathSettingKey]
  // console.log('#18', { pathSettingKey, pathSetting })
  let { pathname } = pathSetting
  let hostname: string
  if (params.absolute || params.domain) {
    Reflect.deleteProperty(params, 'absolute')
    if (params.domain) {
      hostname = `${hostSettings.protocol}//${params.domain}`
      Reflect.deleteProperty(params, 'domain')
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
      Reflect.deleteProperty(params, key)
    }
  })
  const search = paramsToSearch(params)
  return [[hostname, pathname].filter((x) => x).join(''), search].filter((x) => x).join('?')
}
