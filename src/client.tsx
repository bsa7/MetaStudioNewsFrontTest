import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Layout, HomePage } from '@components/index'

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Layout>
      <HomePage />
    </Layout>,
    document.getElementById('app')
  )
  console.log('#12 - client.js !')
}
