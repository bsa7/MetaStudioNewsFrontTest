import React from 'react'
import { Helmet, HelmetData } from 'react-helmet'
import { IApplicationState } from '@reducers/index'
import { getClientScriptFileNames, compressApplicationState } from '@lib/server-helper'
import { ChunkFileNameData } from '@lib/common-defs'

type IHtmlProps = {
  chunkFileNameData: ChunkFileNameData
  helmet?: HelmetData
  initialState: IApplicationState
}

export const HtmlTemplate: React.FunctionComponent<IHtmlProps> = (props) => {
  const { children, chunkFileNameData, helmet, initialState } = props
  const clientScriptFileNames = getClientScriptFileNames(chunkFileNameData)

  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <div
          id="loadOverlay"
          style={{
            backgroundColor: '#333',
            height: '100%',
            left: '0px',
            opacity: 1,
            pointerEvents: 'none',
            position: 'absolute',
            top: '0px',
            width: '100%',
            zIndex: 2000,
          }}
        />
      </head>
      <body>
        <Helmet>
          <title>{helmet.title.toString() || 'Metastudio News test'}</title>
        </Helmet>
        <div id='app'>{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = '${compressApplicationState(initialState)}'`,
          }}
        />
        {
          clientScriptFileNames.map((scriptFileName: string, index: number) => (
            <script key={index} src={`./${scriptFileName}`}></script>
          ))
        }
      </body>
    </html>
  )
}
