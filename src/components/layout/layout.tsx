import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { IApplicationState } from '@reducers'
import { getDataFromState } from '@lib/flux-helper'
import { ThemeMapper } from '@lib/theme-helper'
import { ThemeName, WebpackStats } from '@lib/common-defs'

interface ILayoutProps {
  themeName?: ThemeName
  webpackStats: WebpackStats
}
class LayoutContainer extends React.Component<ILayoutProps> {
  render() {
    const themeMapper = new ThemeMapper()
    const currentThemeStylesheetFileName: string = themeMapper.currentThemeStylesheetFileName
    const otherCssFileNames = themeMapper.otherCssFileNames

    return (
      <React.Fragment>
        <Helmet>
          <link rel='stylesheet' href={`./${currentThemeStylesheetFileName}`} type='text/css' />
          {
            otherCssFileNames.map((cssFileName, index) => (
              <link key={index} rel='stylesheet' href={`./${cssFileName}`} type='text/css' />
            ))
          }
        </Helmet>
        <div>TODO: Application Header</div>
        {this.props.children}
        <div>TODO: Application Footer</div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: IApplicationState): ILayoutProps => {
  const { themeName, webpackStats } = getDataFromState<ILayoutProps>(state, 'session')
  return { themeName, webpackStats }
}

export const Layout = connect(mapStateToProps)(LayoutContainer)
