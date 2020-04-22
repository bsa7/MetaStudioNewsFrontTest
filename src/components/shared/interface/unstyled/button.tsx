import React from 'react'
import { FormButtonClickHandler } from '@lib/common-defs'
import { ButtonType } from '@constants/enums'

export interface IButtonProps extends React.ComponentPropsWithoutRef<any> {
  className?: string
  name?: string
  onClick: FormButtonClickHandler
  tooltip?: string
  type?: ButtonType
}

interface IButtonElementAttributes {
  className?: string
  id?: string
  name?: string
  title?: string
}

const typeClassAdapter = (type: ButtonType): string => {
  if (type == ButtonType.primary) return 'button--primary'
  if (type == ButtonType.secondary) return 'button--secondary'
  return 'button--default'
}

export const Button: React.FunctionComponent<IButtonProps> = ({
  className,
  children,
  name,
  onClick,
  tooltip,
  type,
}) => {
  const rootAttributes: IButtonElementAttributes = {}
  if (typeof className !== 'undefined') rootAttributes.className = className
  if (typeof type !== 'undefined') {
    rootAttributes.className = `${rootAttributes.className || ''} ${typeClassAdapter(type)}`.trim()
  }
  if (typeof tooltip !== 'undefined') rootAttributes.title = tooltip
  if (typeof name !== 'undefined') rootAttributes.name = name

  return (
    <button
      onClick={onClick}
      {...rootAttributes}
    >
      {children}
    </button>
  )
}
