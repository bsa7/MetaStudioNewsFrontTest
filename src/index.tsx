import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Home } from '@components/home'
import { applicationReducers } from '@reducers/index'

const applicationStore = createStore(applicationReducers)

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Provider store={applicationStore}>
      <Home />
    </Provider>,
    document.getElementById('app')
  )
}
