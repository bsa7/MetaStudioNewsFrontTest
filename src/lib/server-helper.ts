import * as LZUTF8 from 'lzutf8'
import { hostSettings } from '@config/front-settings'
import { constants } from '@constants/string-constants'
import { IApplicationState } from '@reducers/index'
import { LocationInfoBrief, ChunkFileNameData } from '@lib/common-defs'

export const compressApplicationState = (value: IApplicationState): string => {
  const stringifiedValue = JSON.stringify(value)
  const bufferedValue = Buffer.from(stringifiedValue)
  return LZUTF8.compress(bufferedValue, { outputEncoding: 'Base64' })
}


export const decompressApplicationState = (value: string): IApplicationState => {
  const decompressedStringifiedState: string = LZUTF8.decompress(value, {
    inputEncoding: 'Base64',
    outputEncoding: 'String',
  })
  const parsedState: IApplicationState = JSON.parse(decompressedStringifiedState)
  return parsedState
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

export const getChunkFileNames = (serverResponse: any): ChunkFileNameData => {
  const webpackConfigurations = serverResponse.locals.webpackStats.toJson().children
  const result: ChunkFileNameData = {}
  webpackConfigurations.forEach((webpackConfig: any) => {
    const configFiles: Array<string> = []
    webpackConfig.chunks.forEach((x: any) => configFiles.push.apply(configFiles, x.files))
    result[webpackConfig.name] = configFiles
  })
  return result
}

const filterChunkFileNames = (
  chunkFileNameData: ChunkFileNameData,
  prefix: string,
  suffix: string = prefix
): Array<string> => {
  return chunkFileNameData.client.filter((fileName) => new RegExp(`^${prefix}.+\\.${suffix}$`).test(fileName))
}

export const getClientScriptFileNames = (chunkFileNameData: ChunkFileNameData): Array<string> => {
  return filterChunkFileNames(chunkFileNameData, 'js')
}

export const getClientCssFileNames = (chunkFileNameData: ChunkFileNameData): Array<string> => {
  return filterChunkFileNames(chunkFileNameData, 'css')
}
