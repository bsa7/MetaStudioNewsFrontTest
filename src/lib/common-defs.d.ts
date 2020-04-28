import { Dispatch } from 'redux'
import { History } from 'history'
import { Stats } from 'webpack'
import * as ApplicationPages from '@components/index'
import { ThemeNames } from '@constants/enums'

export type AnyMap = {
  [key: string]: any
}

export type HashMap<T> = {
  [key: string]: T
}

export type EnumMap<K> = {
  [key in keyof K]: string
}

export type ValuesOf<T extends any[]>= T[number]

export type ValueOf<T extends object> = T[keyof T]

export type ApplicationPage = ValueOf<typeof ApplicationPages> & {
  fetchData?: (dispatch: Dispatch) => Promise<void>
}

export type ApplicationPageName = keyof typeof ApplicationPages

export type RouteParams = {
  absolute?: boolean
  domain?: string
  status?: number
  redirect?: () => string
}

export type PathSetting = {
  componentName?: string
  domain?: string
  hostname?: string
  key?: string
  locationRegexp?: string
  params?: RouteParams
  pathname?: string
}

export type PathSettings = {
  [key: string]: PathSetting
}

export type LocationInfoBrief = {
  hash: string
  hostname: string
  href: string
  origin?: string
  pathname: string
  protocol: string
  search: string
}

export type LocationInfo = LocationInfoBrief & {
  hashParams?: HashMap<string | number | AnyMap>
  pathnameParams?: HashMap<string | number | AnyMap>
  searchParams?: HashMap<string | number | AnyMap>
}

export type AppGlobal = NodeJS.Global & {
  locationInfoBrief: LocationInfoBrief
}

export type AppWindow = typeof window & typeof globalThis & {
  applicationHistory: History
  __PRELOADED_STATE__: string
  $REDUX_DEVTOOL: any
}

export interface MiddlewareRenderer extends Record<string, any> {
  clientStats: Stats
  serverStats: Stats
}

export type CookieOptions = {
  'maxAge'?: number
  'max-age'?: number
  'expires'?: string
  'path'?: string
}

export interface ICookieAdapter {
  get: (name: string) => string
  remove: (name: string) => void
  set: (name: string, value: string, options: CookieOptions) => void
}

export type ApiResponse = {
  [key: string]: any
}

export interface IFetchParams {
  userAuthToken?: string
}

export type FormEditHandler = () => void

export type ChunkFileNameData = {
  [configurationName: string]: Array<string>
}

export type WebpackStats = {
  cssStylesheetFileNames: Array<string>
}

export type ThemeName = keyof typeof ThemeNames

export type FormButtonClickHandler = () => void
export type AlertAreaClickHandler = () => void
