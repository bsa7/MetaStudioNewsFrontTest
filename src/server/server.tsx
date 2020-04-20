
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { RequestHandler } from 'express'
import { StaticRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { router, Router } from '@components/router'
import { Helmet } from 'react-helmet'
import { Stats } from 'webpack'
import { extractLocationInfo } from '@lib/server-helper'
import { AppGlobal, LocationInfoBrief, MiddlewareRenderer } from '@lib/common-defs'
import { HtmlTemplate } from '@components/shared/index.template.html'
import { createRootReducer, IApplicationState } from '@reducers/index'
import { configureStore } from '@lib/configure-store'
import { Store } from 'redux'
import { fetchComponentData } from '@lib/fetch-component-data'
import { currentLocation } from '@lib/isomorphic-helper'

const fetchData = (store: Store): Promise<IApplicationState> => {
  return new Promise((resolve) => fetchComponentData(store.dispatch).then(() => {
    const state = store.getState()
    resolve(state)
  }))
}

const server = (incomingRequest: any, serverResponse: any, clientStats?: Stats) => {
  const locationInfoBrief: LocationInfoBrief = extractLocationInfo(incomingRequest);
  (global as AppGlobal).locationInfoBrief = locationInfoBrief
  const helmet = Helmet.renderStatic()
  const initialState: IApplicationState = {
    session: {
      locationInfo: currentLocation.locationInfo()
    }
  }

  const store = configureStore(initialState)
  fetchData(store).then((state) => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <HtmlTemplate initialState={state} helmet={helmet} >
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

export default function middlewareRenderer(params: MiddlewareRenderer): RequestHandler {
  const { clientStats } = params
  return (req: any, res: any) => server(req, res, clientStats)
}

export const productionServer = (req: any, res: any, next: any) => {
  server(req, res)
}
