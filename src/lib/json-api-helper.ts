import { AnyMap, HashMap } from "@lib/common-defs"
import { EMPTIES } from "@constants/enums"

type SearchToParamsAttributes = {
  search: string;
}

export const searchToParams = (searchToParamsAttributes: SearchToParamsAttributes): HashMap<string | number | AnyMap> => {
  const { search = '' } = searchToParamsAttributes
  const result: AnyMap = {}
  search.replace(/^[?#]/, '').split('&').forEach((item) => {
    const [key, encodedValue]: Array<string> = item.split('=')
    const value: string = decodeURIComponent(encodedValue)
    if (key) {
      if (/^[\{\[].+?[\}\]]$/.test(value)) {
        result[key] = JSON.parse(value)
      } else if (/^\d+$/.test(value)) {
        result[key] = Number(value)
      } else {
        result[key] = value
      }
    }
  })
  return result
}

type ParamsToSearchOptions = {
  noEncode?: boolean;
}

export const paramsToSearch = (params: AnyMap, paramsToSearchOptions?: ParamsToSearchOptions) => {
  const { noEncode = undefined } = paramsToSearchOptions || {}
  const paramPairs: Array<string> = Object.keys(params).map((key) => {
    const value = noEncode ? params[key] : encodeURIComponent(params[key])
    return EMPTIES.includes(params[key]) ? undefined : `${key}=${value}`
  })
  return paramPairs.filter((x) => x).join('&')
}
