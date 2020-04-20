import { get } from '@lib/router-helper'

export const pathSettings = {
  HomePage: get('/', 'HomePage'),
  LoginPage: get('/login', 'AuthPage'),
  SignupPage: get('/signup', 'AuthPage'),
  NotFoundPage: get('.*', 'NotFoundPage', { status: 404 }),
}
