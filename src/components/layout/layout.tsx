import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { IApplicationState } from '@reducers'
import { getDataFromState } from '@lib/flux-helper'
import { ThemeMapper } from '@lib/theme-helper'
import { ThemeName, WebpackStats } from '@lib/common-defs'
import { NotificationMessage } from '@lib/notification-helper'
import { NotificationActions } from '@actions'
import { AlertArea, ApplicationHeader } from '@interface-components'
import { Dispatch } from 'redux'

interface ILayoutProps {
  messages?: Array<NotificationMessage>
  hideNotificationMessage?: (messageId: string) => void
  themeName?: ThemeName
  webpackStats?: WebpackStats
}
type HideNotificationMessageHandler = () => void

class LayoutContainer extends React.Component<ILayoutProps> {
  hideNotificationMessage = (messageId: string): HideNotificationMessageHandler => {
    return () => this.props.hideNotificationMessage(messageId)
  }

  render() {
    const themeMapper = new ThemeMapper()
    const currentThemeStylesheetFileName: string = themeMapper.currentThemeStylesheetFileName
    const otherCssFileNames = themeMapper.otherCssFileNames
    const { messages } = this.props

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
        <ApplicationHeader />
        {
          messages.map((message: NotificationMessage, index: number) => (
            <AlertArea
              key={`alert-message--${index}`}
              onClick={this.hideNotificationMessage(message.id)}
              title={message.title}
              type={message.type}
            />
          ))
        }
        {this.props.children}
        <div>TODO: Application Footer</div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: IApplicationState): ILayoutProps => {
  const { themeName, webpackStats } = getDataFromState<ILayoutProps>(state, 'session')
  const { messages } = getDataFromState<ILayoutProps>(state, 'notification')

  return {
    messages,
    themeName,
    webpackStats,
  }
}

const mapDispatchToProps = (dispatch: Dispatch): ILayoutProps => {
  const hideNotificationMessage = (messageId: string) => {
    dispatch(NotificationActions.hideNotificationMessage(messageId))
  }
  return { hideNotificationMessage }
}

export const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutContainer)
