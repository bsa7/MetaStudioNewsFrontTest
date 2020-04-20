import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { Router } from '@components/router'
import { Provider } from 'react-redux'
import { configureStore } from '@lib/configure-store'
import { currentLocation } from '@lib/isomorphic-helper'
import { IApplicationState } from '@reducers/index'

const history = createBrowserHistory()
const initialState: IApplicationState = {
  session: {
    locationInfo: currentLocation.locationInfo()
  }
}
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

if (history) history.listen(() => hydrateEntireTree(Root))
if (typeof document !== 'undefined') hydrateEntireTree(Root)

if ((module as any).hot) {
  (module as any).hot.accept()
}
