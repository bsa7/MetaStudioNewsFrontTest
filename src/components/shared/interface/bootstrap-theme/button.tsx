import React from 'react'
import { Button as UnstyledButton, IButtonProps } from '@components/shared/interface/unstyled/button'
import { ButtonType } from '@constants/enums'

const typeClassAdapter = (type: ButtonType): string => {
  if (type === ButtonType.primary) return 'btn-success'
  if (type === ButtonType.secondary) return 'btn-default button--bordered'
  return ''
}

export const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const { type, ...buttonProps } = props

  return (
    <UnstyledButton
      className={`btn ${typeClassAdapter(type)}`.trim()}
      {...buttonProps}
    />
  )
}
