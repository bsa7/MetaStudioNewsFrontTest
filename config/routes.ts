import { get } from '@lib/router-helper'
import { PathSetting } from '@lib/common-defs'

export const pathSettings: Array<PathSetting> = [
  get('/', 'HomePage'),
  get('/login', 'AuthPage'),
  get('/signup', 'AuthPage'),
  get('.*', 'NotFoundPage', { status: 404 }),
]
