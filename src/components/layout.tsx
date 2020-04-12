import * as React from 'react'

export class Layout extends React.Component {
  render() {

    return (
      <React.Fragment>
        <div>TODO: Application Header</div>
        {this.props.children}
        <div>TODO: Application Footer</div>
      </React.Fragment>
    )
  }
}
