import { constants } from '@constants/string-constants'
import { isClientSide } from '@lib/isomorphic-helper'
import { paramsToSearch, searchToParams } from '@lib/json-api-helper'
import { ICookieAdapter, CookieOptions } from '@lib/common-defs'

const expiry = new Date()
const maxAge = 60 * 60 * 24 * 7
expiry.setTime(expiry.getTime() + (maxAge * 1000))
const defaultOptions: CookieOptions = {
  'expires': expiry.toUTCString(),
  'max-age': maxAge,
  'path': constants.ROOT,
}

const serverOptionsFromClientOptions = (clientOptions: CookieOptions): CookieOptions => {
  const serverOptions: CookieOptions = {}
  Object.keys(clientOptions).forEach((key: keyof CookieOptions) => {
    if (key === 'max-age') {
      serverOptions['maxAge'] = clientOptions[key] * 1000
    } else if (key !== 'maxAge') {
      serverOptions[key] = clientOptions[key]
    }
  })
  return serverOptions
}


class Cookie {
  static initialized: boolean
  static instance: Cookie
  private serverAdapter: ICookieAdapter

  constructor() {
    if (Cookie.initialized) {
      return Cookie.instance
    }
    Cookie.instance = this
  }

  public setServerAdapter = (adapter: ICookieAdapter) => {
    this.serverAdapter = adapter
  }

  public get = (name: string): string => {
    let result = ''

    if (isClientSide()) {
      const documentCookies = searchToParams({ search: (document.cookie.split(/;\s?/) || []).join('&') })
      result = documentCookies[name].toString() || ''
    } else if (this.serverAdapter) {
      result = this.serverAdapter.get(name)
    }

    return result
  }

  public pop = (name: string): string => {
    const value = this.get(name)
    value && this.remove(name)

    return value
  }

  public set = (name: string, value: string | number, options: CookieOptions = defaultOptions) => {
    const cookieValue = this.get(name)
    if (value == cookieValue) {
      return
    }
    if (isClientSide()) {
      const encodedValue = ['string', 'number'].includes(typeof value) ? value : JSON.stringify(value)
      let cookieParams = `${name}=${encodedValue}`
      if (options) {
        const optionsString = paramsToSearch(options, { noEncode: true }).replace(/&/g, ';')
        cookieParams += `;${optionsString};`
      }
      document.cookie = cookieParams
    } else if (this.serverAdapter) {
      this.serverAdapter.save(name, value.toString(), serverOptionsFromClientOptions(options))
    }
  }

  public remove = (name: string, options: CookieOptions = { path: constants.ROOT }) => {
    this.set(name, '', options)
  }

  public fetch = (name: string, callback: () => string | number, options: CookieOptions = { path: constants.ROOT }) => {
    let result: string | number = this.get(name)
    if (!result) {
      result = callback()
      this.set(name, result, options)
    }
    return result
  }
}

export const cookie = new Cookie()

/**
 * Токен авторизации (чтение / запись)
 */

export const userAuthTokenCookie = (token: string): string => {
  if (token) {
    cookie.set(constants.USER_AUTH_TOKEN, token)
  } else if (token === '') {
    cookie.remove(constants.USER_AUTH_TOKEN)
  }
  const result = cookie.get(constants.USER_AUTH_TOKEN)
  return result
}
