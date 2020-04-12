import * as ApplicationPages from '@components/index'

export type AnyMap = {
  [key: string]: any;
}

export type HashMap<T> = {
  [key: string]: T;
}

export type ApplicationPageName = keyof typeof ApplicationPages
