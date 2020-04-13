import { PathSetting, RouteParams } from '@lib/common-defs'

export const get = (pathname: string, keyAndComponent: string, params: RouteParams = <RouteParams>{}): PathSetting => {
  const pathSetting: PathSetting = {
    domain: params.domain,
    pathname,
  }
  if (/#/.test(keyAndComponent)) {
    [pathSetting.key, pathSetting.componentName] = keyAndComponent.split('#')
  } else {
    pathSetting.key = keyAndComponent
    pathSetting.componentName = keyAndComponent
  }
  return pathSetting
}
