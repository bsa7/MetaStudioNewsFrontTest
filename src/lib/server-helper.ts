import * as path from 'path'
import * as fs from 'fs'
import * as LZUTF8 from 'lzutf8'
import { hostSettings } from '@config/front-settings'
import { constants } from '@constants/string-constants'
import { AnyMap, LocationInfoBrief } from '@lib/common-defs'

type RenderIndexPageParams = {
  head: string;
  html: string;
  initialState: AnyMap;
}

const readFile = (fileName: string, type = 'utf8'): Promise<any> => {
  return new Promise((resolve, reject) => {
    return fs.readFile(fileName, type, (err, data) => {
      return err ? reject(err) : resolve(data)
    })
  })
}

export const renderIndexPage = (params: RenderIndexPageParams = <RenderIndexPageParams>{}): Promise<string> => {
  const indexFileTemplateName = path.resolve(__dirname, '../dist/index.template.html')

  return new Promise((resolve, reject) => {
    readFile(indexFileTemplateName).then((template: string) => {
      let result = template
      Object.keys(params).forEach((replacementKey: keyof RenderIndexPageParams) => {
        const value = params[replacementKey]
        if (replacementKey && typeof value !== 'undefined') {
          if (replacementKey === 'initialState') {
            result = result.replace(`#{${replacementKey}}`, LZUTF8.compress(JSON.stringify(value), {
              outputEncoding: 'Base64',
            }))
          } else {
            result = result.replace(`#{${replacementKey}}`, value.toString())
          }
        }
      })
      resolve(result)
    }).catch((error) => {
      console.error(`Error when try to read file ${indexFileTemplateName}`)
      reject(error)
    })
  })
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
