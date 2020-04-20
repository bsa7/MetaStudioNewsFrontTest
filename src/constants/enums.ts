import { pathSettings } from '@config/routes'
import { EnumMap } from '@lib/common-defs'

export const EMPTIES = ['', undefined, null]
export const MODES = {
  development: 'development',
  production: 'production',
}

export type ApplicationLinks = EnumMap<typeof pathSettings>
