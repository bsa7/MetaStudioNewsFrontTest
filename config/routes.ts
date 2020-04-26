import { get, redirects } from '@lib/router-helper'

export const pathSettings = {
  HomePage: get('/', 'HomePage', { redirect: redirects.redirectUnauthenticatedUser }),
  LoginPage: get('/login', 'AuthPage', { redirect: redirects.redirectAuthenticatedUser }),
  SignupPage: get('/signup', 'AuthPage', { redirect: redirects.redirectAuthenticatedUser }),
  NotFoundPage: get('.*', 'NotFoundPage', { status: 404 }),
}
