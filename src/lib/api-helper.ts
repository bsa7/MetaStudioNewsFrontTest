import fetch from 'isomorphic-fetch'
import { apiSettings } from '@config/front-settings'
import { camelizeObjectKeysDeep, decamelizeObjectKeysDeep } from '@lib/object-helper'
import { cookie } from '@lib/cookie-helper'
import { currentLocation } from '@lib/isomorphic-helper'
import { RequestOptions } from 'https'
import { constants } from '@constants/string-constants'
import { RestMethods } from '@constants/enums'
import { ApiResponse } from '@lib/common-defs'

export const camelizeAPIResponse = (response: ApiResponse) => {
  return response && response.no_camel ? response : camelizeObjectKeysDeep(response)
}

const parseJSON = (response: Response): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    response.json().then((json) => resolve({
      json: camelizeAPIResponse(json),
      ok: response.ok,
      status: response.status,
    }))
  })
}

export const request = (url: string, options?: RequestOptions & RequestInit): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then((response: Response) => response.ok ? resolve(response.json) : reject(response.json))
      .catch((error) => reject({ error }))
  })
}

interface IFetchParams {
  absolutePath?: boolean
  decamelize?: boolean
  path: string
  params?: any
  method?: RestMethods
  userAuthToken?: string
}

export const fetchJsonFromAPI = (fetchParams: IFetchParams) => {
  const {
    absolutePath = undefined,
    decamelize = true,
    path,
    params = {},
    method = RestMethods.get,
    userAuthToken,
  } = fetchParams
  const locationInfo = currentLocation.locationInfo()
  params.origin = `${locationInfo.protocol}//${locationInfo.hostname}`
  const paramsSnakeCased = decamelize ? decamelizeObjectKeysDeep(params) : params
  const searchString = Object.keys(paramsSnakeCased || {}).map((paramName: string) => {
    let paramValue = paramsSnakeCased[paramName]
    let result
    if (paramValue || paramValue == 0) {
      if (typeof paramValue === 'object') {
        paramValue = JSON.stringify(paramValue)
      }
      result = `${encodeURIComponent(paramName)}=${encodeURIComponent(paramValue)}`
    }
    return result
  }).filter((x) => x).join('&')
  const token = userAuthToken || cookie.get(constants.USER_AUTH_TOKEN)
  const options: RequestOptions & RequestInit = {
    headers: {
      'Accept': 'application/json',
    },
    method,
  }
  if (token) {
    options.headers.Authorization = token
  }

  let apiUrl = `${apiSettings.prefix(currentLocation.locationInfo().hostname)}${path}`
  if (!absolutePath) {
    if ([RestMethods.post, RestMethods.put].includes(method as RestMethods)) {
      const urlencoded = new URLSearchParams();
      Object.keys(paramsSnakeCased).forEach((key: string) => {
        urlencoded.append(key, paramsSnakeCased[key])
      })
      options.body = urlencoded
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    } else {
      apiUrl += `?${searchString}`
    }
  } else {
    apiUrl = path
  }
  const result = request(apiUrl, options)
  return result
}
