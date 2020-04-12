import * as path from 'path'
import * as fs from 'fs'
import { AnyMap } from '@lib/common-defs'

type RenderIndexPageParams = {
  head: string;
  html: string;
  initialState: AnyMap;
}

const readFile = (fileName: string, type = 'utf8'): Promise<any> => {
  return new Promise((resolve, reject) => {
    return fs.readFile(fileName, type, (err, data) => {
      return err ? reject(err) : resolve(data)
    })
  })
}

export const renderIndexPage = (params: RenderIndexPageParams = <RenderIndexPageParams>{}): Promise<string> => {
  const indexFileTemplateName = path.resolve(__dirname, '../dist/index.template.html')

  return new Promise((resolve, reject) => {
    readFile(indexFileTemplateName).then((template: string) => {
      let result = template
      Object.keys(params).forEach((replacementKey: keyof RenderIndexPageParams) => {
        if (replacementKey && typeof params[replacementKey] !== 'undefined') {
          const value = params[replacementKey]
          if (typeof value === 'object') {
            result = result.replace(`#{${replacementKey}}`, JSON.stringify(params[replacementKey]))
          } else {
            result = result.replace(`#{${replacementKey}}`, params[replacementKey].toString())
          }
        }
      })
      resolve(result)
    }).catch((error) => {
      reject(`Error when try to read file ${indexFileTemplateName}`)
    })
  })
}
