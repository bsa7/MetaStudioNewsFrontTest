
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { RequestHandler } from 'express'
import { StaticRouter } from 'react-router-dom'
import { Router } from '@components/router'
import { Helmet } from 'react-helmet'
import { Stats } from 'webpack'
import { extractLocationInfo } from '@lib/server-helper'
import { AppGlobal, LocationInfoBrief, MiddlewareRenderer } from '@lib/common-defs'
import { HtmlTemplate } from '@components/shared/index.template.html'
import { IApplicationState } from '@reducers/index'
new Router()

const server = (incomingRequest: any, serverResponse: any, clientStats: Stats) => {
  const locationInfoBrief: LocationInfoBrief = extractLocationInfo(incomingRequest);
  (global as AppGlobal).locationInfoBrief = locationInfoBrief
  const initialState: IApplicationState = {}
  const helmet = Helmet.renderStatic()

  const html = ReactDOMServer.renderToStaticMarkup(
    <HtmlTemplate initialState={initialState} helmet={helmet} >
      <StaticRouter>
        <Router />
      </StaticRouter>
    </HtmlTemplate>
  )
  serverResponse.status(Router.status).send(html)
}

export default function middlewareRenderer(params: MiddlewareRenderer): RequestHandler {
  const { clientStats } = params
  return (req: any, res: any) => server(req, res, clientStats)
}
