import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Layout } from '@components/index'
import { Router } from '@components/router'

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Layout>
      <Router />
    </Layout>,
    document.getElementById('app')
  )
  console.log('#12 - client.js !')
}
