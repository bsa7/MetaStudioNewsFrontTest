import * as React from 'react'
import { Layout } from '@components/layout/layout'

export class NotFoundPage extends React.Component {
  render() {

    return (
      <Layout>
        <React.Fragment>
          <h1>Sorry, this page not found</h1>
          <p>Go to root page.</p>
        </React.Fragment>
      </Layout>
    )
  }
}
