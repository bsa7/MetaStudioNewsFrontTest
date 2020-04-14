
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Router } from '@components/router'
import { renderIndexPage, extractLocationInfo } from '@lib/server-helper'
import { LocationInfoBrief, AppGlobal } from '@lib/common-defs'

new Router()

export const server = (incomingRequest: any, serverResponse: any, next: any) => {
  const locationInfoBrief: LocationInfoBrief = extractLocationInfo(incomingRequest);
  (global as AppGlobal).locationInfoBrief = locationInfoBrief
  const initialState = {}
  const html = ReactDOMServer.renderToStaticMarkup(
    <StaticRouter>
      <Router />
    </StaticRouter>
  )
  const head = ''
  renderIndexPage({ head, html, initialState }).then((pageContent) => {
    serverResponse.status(Router.status).send(pageContent)
  }).catch((error) => {
    serverResponse.end(error)
  })
}
