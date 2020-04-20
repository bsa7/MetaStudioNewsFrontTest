import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { Router } from '@components/router'
import { Provider } from 'react-redux'
import { configureStore } from '@lib/configure-store'

const history = createBrowserHistory()
const store = configureStore({}, history)
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

if (history) history.listen(() => hydrateEntireTree(Root))
if (typeof document !== 'undefined') hydrateEntireTree(Root)

if ((module as any).hot) {
  (module as any).hot.accept()
}
