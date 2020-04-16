import * as fs from 'fs'
import * as LZUTF8 from 'lzutf8'
import { hostSettings } from '@config/front-settings'
import { constants } from '@constants/string-constants'
import { IApplicationState } from '@reducers/index'
import { LocationInfoBrief } from '@lib/common-defs'

export const readFile = (fileName: string, type = 'utf8'): Promise<any> => {
  return new Promise((resolve, reject) => {
    return fs.readFile(fileName, type, (err, data) => {
      return err ? reject(err) : resolve(data)
    })
  })
}

export const compressApplicationState = (value: IApplicationState): string => {
  const stringifiedValue = JSON.stringify(value)
  const bufferedValue = Buffer.from(stringifiedValue)
  return LZUTF8.compress(bufferedValue, { outputEncoding: 'Base64' })
}

export const extractLocationInfo = (incomingRequest: any): LocationInfoBrief => {
  const incomingData = ((incomingRequest.connection || {}).parser || {}).incoming || {}
  const incomingHeaders = incomingData.headers || {}
  const parsedUrl = incomingData._parsedUrl || {}
  const pathname = decodeURIComponent(parsedUrl.pathname || constants.ROOT)
  const hostname = incomingRequest.hostname || incomingHeaders.host || parsedUrl.host
  const origin = `${hostSettings.protocol}//${hostname}`
  let href = origin
  if (pathname) href += pathname
  if (parsedUrl.search) href += `?${parsedUrl.search}`
  if (parsedUrl.hash) href += `#${parsedUrl.hash}`

  const locationInfoBrief: LocationInfoBrief = {
    hash: parsedUrl.hash || '',
    hostname,
    href,
    origin,
    pathname,
    protocol: hostSettings.protocol,
    search: parsedUrl.search || '',
  }
  return locationInfoBrief
}
