import React from 'react'
import { AlertArea as UnstyledAlertArea, IAlertAreaProps } from '@components/shared/interface/unstyled/alert-area'
import { AlertAreaType } from '@constants/enums'

const typeClassAdapter = (type: AlertAreaType): string => {
  if (type == AlertAreaType.error) return 'alert-danger'
  if (type == AlertAreaType.warning) return 'alert-warning'
  if (type == AlertAreaType.success) return 'alert-success'
  throw new Error('Error: Unknown alert area type')
}

export const AlertArea: React.FunctionComponent<IAlertAreaProps> = (props) => {
  const { children, type, ...alertAreaProps } = props

  return (
    <UnstyledAlertArea
      className={`alert ${typeClassAdapter(type)}`.trim()}
      {...alertAreaProps}
    >
      {children}
    </UnstyledAlertArea>
  )
}
