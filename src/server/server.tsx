
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { RequestHandler } from 'express'
import { StaticRouter } from 'react-router-dom'
import { router, Router } from '@components/router'
import { Helmet } from 'react-helmet'
import { Stats } from 'webpack'
import { extractLocationInfo, getChunkFileNames, getClientCssFileNames } from '@lib/server-helper'
import { AppGlobal, LocationInfoBrief, MiddlewareRenderer } from '@lib/common-defs'
import { HtmlTemplate } from '@components/shared/index.template.html'
import { IApplicationState } from '@reducers/index'
import { configureStore } from '@lib/configure-store'
import { Store } from 'redux'
import { fetchComponentData } from '@lib/fetch-component-data'
import { initialApplicationState } from '@reducers/index'
import { ThemeMapper } from '@lib/theme-helper'
import { cookie } from '@lib/cookie-helper'

const fetchData = (store: Store): Promise<IApplicationState> => {
  return new Promise((resolve) => fetchComponentData(store.dispatch).then(() => {
    const state = store.getState()
    resolve(state)
  }))
}

const server = (incomingRequest: any, serverResponse: any, clientStats?: Stats) => {
  const locationInfoBrief: LocationInfoBrief = extractLocationInfo(incomingRequest);
  (global as AppGlobal).locationInfoBrief = locationInfoBrief

  Object.keys(incomingRequest.cookies).forEach((key) => {
    incomingRequest.session[key] = incomingRequest.cookies[key]
  })
  cookie.setServerAdapter({
    get: (name: string) => {
      const value = incomingRequest.session[name]
      return value as string
    },
    remove: (name: string) => incomingRequest.session[name] = '',
    save: (name: string, value: string, options) => {
      serverResponse.cookie(name, value, options)
      incomingRequest.session[name] = value
    },
  })

  const helmet = Helmet.renderStatic()
  const chunkFileNameData = getChunkFileNames(serverResponse)
  const clientCssFileNames = getClientCssFileNames(chunkFileNameData)
  const initialState: IApplicationState = initialApplicationState
  initialState.session.webpackStats.cssStylesheetFileNames = clientCssFileNames
  new ThemeMapper(clientCssFileNames)

  const store = configureStore(initialState)
  fetchData(store).then((state) => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <HtmlTemplate initialState={state} helmet={helmet} chunkFileNameData={chunkFileNameData} >
        <Provider store={store}>
          <StaticRouter>
            <Router />
          </StaticRouter>
        </Provider>
      </HtmlTemplate>
    )
    serverResponse.status(router.status).send(html)
  })
}

const middlewareRenderer = (params: MiddlewareRenderer): RequestHandler => {
  const { clientStats } = params
  return (req: any, res: any) => server(req, res, clientStats)
}

export default middlewareRenderer

export const productionServer = (req: any, res: any, next: any) => {
  server(req, res)
}
