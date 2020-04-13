import { get } from '@lib/router-helper'
import { HashMap, PathSetting } from '@lib/common-defs'

export const pathSettings: HashMap<PathSetting> = {
  HomePage: get('/', 'HomePage'),
  LoginPage: get('/login', 'AuthPage'),
  SignupPage: get('/signup', 'AuthPage'),
  NotFoundPage: get('.*', 'NotFoundPage', { status: 404 }),
}
