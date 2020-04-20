import React from 'react'
import { FormEditHandler } from '@lib/common-defs'

interface ITextInputProps {
  className?: string
  name: string
  label?: string
  onChange: FormEditHandler
  placeholder?: string
  type?: 'text' | 'password'
  defaultValue?: string
}

interface ITextInputRootContainerAttributes {
  className?: string
  id?: string
}

export const TextInput: React.FunctionComponent<ITextInputProps> = ({
  className,
  defaultValue,
  label,
  name,
  onChange,
  placeholder,
  type = 'text'
}) => {
  const rootAttributes: ITextInputRootContainerAttributes = {}
  if (typeof className !== 'undefined') rootAttributes.className = className
  return (
    <div {...rootAttributes}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </div>
  )
}
