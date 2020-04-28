import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { Router } from '@components/router'
import { Provider } from 'react-redux'
import { configureStore } from '@lib/configure-store'
import { initialApplicationState, IApplicationState } from '@reducers'
import { ThemeMapper } from '@lib/theme-helper'
import { historyGo, checkRouteRedirect } from '@lib/router-helper'
import { AppWindow } from '@lib/common-defs'

const history = createBrowserHistory()
if (typeof window !== 'undefined') {
  (window as AppWindow).applicationHistory = history
}

const initialState: IApplicationState = initialApplicationState()
new ThemeMapper(initialState.session.webpackStats.cssStylesheetFileNames)
const store = configureStore(initialState, history)
const rootElement = document.getElementById('app')

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  </Provider>
)

const hydrateEntireTree = (Component: any) => {
  ReactDOM.hydrate(<Component />, rootElement)
}

if (history) history.listen(() => {
  const redirect = checkRouteRedirect()
  console.log('37', { redirect })
  if (redirect) {
    historyGo(redirect)
  }
  hydrateEntireTree(Root)
})

if (typeof document !== 'undefined') {
  hydrateEntireTree(Root)
}

if ((module as any).hot) {
  (module as any).hot.accept()
}
