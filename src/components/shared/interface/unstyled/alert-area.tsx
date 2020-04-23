import React from 'react'
import { AlertAreaClickHandler } from '@lib/common-defs'
import { AlertAreaType } from '@constants/enums'

export interface IAlertAreaProps extends React.ComponentPropsWithoutRef<any> {
  className?: string
  name?: string
  onClick?: AlertAreaClickHandler
  title?: string
  message?: string
  type?: AlertAreaType
}

interface IAlertAreaState {}

interface IAlertAreaElementAttributes {
  className?: string
  id?: string
  name?: string
  title?: string
}

const typeClassAdapter = (type: AlertAreaType): string => {
  if (type == AlertAreaType.error) return 'alert-area--error'
  if (type == AlertAreaType.warning) return 'alert-area--warning'
  if (type == AlertAreaType.success) return 'alert-area--succes'
  throw new Error('Error: Unknown alert area type')
}

export class AlertArea extends React.Component<IAlertAreaProps, IAlertAreaState> {
  handleClick = () => {
    const { onClick } = this.props
    this.setState({ areaHidden: true }, onClick)
  }

  render() {
    const { children, className, message, name, title, type } = this.props
    if (!message && !title) return null
    const rootAttributes: IAlertAreaElementAttributes = {}
    if (typeof className !== 'undefined') rootAttributes.className = className
    if (typeof type !== 'undefined') {
      rootAttributes.className = `${rootAttributes.className || ''} ${typeClassAdapter(type)}`.trim()
    }
    if (typeof name !== 'undefined') rootAttributes.name = name

    return (
      <div role='alert' {...rootAttributes} onClick={this.handleClick}>
        <h1>{title}</h1>
        <p>{message}</p>
        {children}
      </div>
    )
  }
}
