import * as ApplicationPages from '@components/index'

export type AnyMap = {
  [key: string]: any;
}

export type HashMap<T> = {
  [key: string]: T;
}

export type EnumMap<K, V> = {
  [key in keyof K]: V;
}

export type ApplicationPageName = keyof typeof ApplicationPages

export type RouteParams = {
  absolute?: boolean;
  domain?: string;
  status?: number;
}

export type PathSetting = {
  componentName?: string;
  domain?: string;
  hostname?: string;
  key?: string;
  locationRegexp?: string;
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
