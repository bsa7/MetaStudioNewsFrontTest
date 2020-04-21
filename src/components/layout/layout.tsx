import * as React from 'react'
import { connect } from 'react-redux'
import { ThemeName } from '@constants/enums'
import { IApplicationState } from '@reducers'
import { getDataFromState } from '@lib/flux-helper'
import { ThemeMapper } from '@lib/theme-helper'
import { WebpackStats } from '@lib/common-defs'

interface ILayoutProps {
  themeName?: keyof typeof ThemeName
  webpackStats: WebpackStats
}
class LayoutContainer extends React.Component<ILayoutProps> {
  componentDidMount() {
    const { themeName } = this.props
    const themeMapper = new ThemeMapper()
    themeMapper.set(themeName)
  }

  componentDidUpdate(prevProps: ILayoutProps) {
    const { themeName } = this.props
    const themeMapper = new ThemeMapper()
    if (themeName !== prevProps.themeName) {
      themeMapper.set(themeName)
    }
    if (themeName && !prevProps.themeName) {
      themeMapper.set(themeName)
    }
  }

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

const mapStateToProps = (state: IApplicationState): ILayoutProps => {
  const { themeName, webpackStats } = getDataFromState<ILayoutProps>(state, 'session')
  return { themeName, webpackStats }
}

export const Layout = connect(mapStateToProps)(LayoutContainer)
