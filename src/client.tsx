import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { Router } from '@components/router'
import { Provider } from 'react-redux'
import { configureStore, history } from '@lib/configure-store'

// const history = createBrowserHistory()
const store = configureStore({})

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  )
}

if (history) {
  history.listen(() => {
    render()
  })
}

if (typeof document !== 'undefined') {
  // new Router()
  render()
}
