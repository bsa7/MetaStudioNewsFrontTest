import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { Helmet, HelmetData } from 'react-helmet'
import { IApplicationState } from '@reducers/index'
import { compressApplicationState } from '@lib/server-helper'

type IHtmlProps = {
  helmet?: HelmetData
  initialState: IApplicationState
}

export const HtmlTemplate: React.FunctionComponent<IHtmlProps> = (props) => {
  const { children, helmet, initialState } = props
  const sheet = new ServerStyleSheet()
  const styles = sheet.getStyleTags()

  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body>
        <Helmet>
          <title>{helmet.title.toString() || 'Metastudio News test'}</title>
          ${styles}
        </Helmet>
        <div className="aaabbb" id='app'>{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = '${compressApplicationState(initialState)}'`,
          }}
        />
        <script src='./client.js'></script>
      </body>
    </html>
  )
}
