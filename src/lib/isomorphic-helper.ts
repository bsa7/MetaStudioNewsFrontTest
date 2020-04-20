import { LocationInfo, LocationInfoBrief, AppGlobal } from '@lib/common-defs'
import { paramsToSearch, searchToParams } from '@lib/json-api-helper'

export const isServerSide = () => {
  return typeof window === 'undefined'
}

export const isClientSide = () => {
  return typeof window !== 'undefined'
}

class CurrentLocation {
  constructor() {
    if (CurrentLocation.initialized) {
      return CurrentLocation.instance
    }
    CurrentLocation.initialized = true
    CurrentLocation.instance = this
  }
  static initialized: boolean
  static instance: CurrentLocation
  static cachedLocation: string

  public locationInfo = (): LocationInfo => {
    // TODO add caching
    let locationInfoBrief: LocationInfoBrief
    if (isClientSide()) {
      locationInfoBrief = window.location
    } else {
      locationInfoBrief = (global as AppGlobal).locationInfoBrief
    }
    const locationInfo: LocationInfo = {
      ...locationInfoBrief,
      hashParams: searchToParams({ search: decodeURIComponent(locationInfoBrief.hash) }), // Do not use hash if it possible!
      pathname: decodeURIComponent(locationInfoBrief.pathname),
      pathnameParams: undefined, // TODO Add the routing and parsing params from pathname with slugs
      searchParams: searchToParams({ search: decodeURIComponent(locationInfoBrief.search) }),
    }
    return locationInfo
  }
}

export const currentLocation = new CurrentLocation()

type LinkParams = {
  absolute?: boolean;
  locationInfo: LocationInfo;
}

export const locationInfoToLink = (params: LinkParams) => {
  const { absolute = false, locationInfo } = params
  const hostname = absolute ? `${locationInfo.protocol}//${locationInfo.hostname}` : ''
  const search = paramsToSearch(locationInfo.searchParams, { noEncode: true })
  const link = [`${hostname}${locationInfo.pathname}`, search].filter((x) => x).join('?')
  return link
}