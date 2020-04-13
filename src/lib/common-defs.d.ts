import * as ApplicationPages from '@components/index'

export type AnyMap = {
  [key: string]: any;
}

export type HashMap<T> = {
  [key: string]: T;
}

export type ApplicationPageName = keyof typeof ApplicationPages

export type RouteParams = {
  domain?: string;
  status?: number;
}

export type PathSetting = {
  domain?: string;
  key?: string;
  componentName?: string;
  params?: RouteParams;
  pathname?: string;
}

export type LocationInfoBrief = {
  hash: string;
  hostname: string;
  href: string;
  origin?: string;
  pathname: string;
  protocol: string;
  search: string;
}

export type LocationInfo = LocationInfoBrief & {
  hashParams?: HashMap<string | number | AnyMap>;
  pathnameParams?: HashMap<string | number | AnyMap>;
  searchParams?: HashMap<string | number | AnyMap>;
}

export type AppGlobal = NodeJS.Global & {
  locationInfoBrief: LocationInfoBrief;
}
