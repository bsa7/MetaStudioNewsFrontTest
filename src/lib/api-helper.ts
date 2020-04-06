import CamelCaseObjectKeysDeep from 'camelcase-object-deep'

export type ApiParams = {
  [key: string]: number | string;
}

export const camelizeAPIResponse = (response: ApiParams) => {
  return response && response.no_camel ? response : CamelCaseObjectKeysDeep(response)
}
