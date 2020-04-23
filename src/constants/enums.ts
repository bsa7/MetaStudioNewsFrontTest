import { pathSettings } from '@config/routes'
import { EnumMap } from '@lib/common-defs'

export const EMPTIES = ['', undefined, null]
export const MODES = {
  development: 'development',
  production: 'production',
}

export type ApplicationLinks = EnumMap<typeof pathSettings>

export enum RestMethods {
  delete = 'delete',
  get = 'get',
  post = 'post',
  put = 'put',
}

export enum ThemeNames {
  Bootstrap = 'Bootstrap',
  Unstyled = 'Unstyled',
}

export enum ButtonType {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
}

export enum AlertAreaType {
  error = 'error',
  success = 'success',
  warning = 'warning',
}
