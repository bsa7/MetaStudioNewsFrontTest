import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Home } from './components/home'

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Home />,
    document.getElementById('app')
  )
}
