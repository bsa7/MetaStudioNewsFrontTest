import React from 'react'
import { FormEditHandler } from '@lib/common-defs'

export interface ITextInputProps {
  defaultValue?: string
  inputClassName?: string
  label?: string
  labelClassName?: string
  name: string
  onChange: FormEditHandler
  placeholder?: string
  rootClassName?: string
  small?: string
  smallClassName?: string
  type?: 'text' | 'password'
}

interface ITextInputElementAttributes {
  className?: string
  id?: string
}

export const TextInput: React.FunctionComponent<ITextInputProps> = ({
  defaultValue,
  inputClassName,
  label,
  labelClassName,
  name,
  onChange,
  placeholder,
  rootClassName,
  small,
  smallClassName,
  type = 'text'
}) => {
  const inputAttributes: ITextInputElementAttributes = {}
  const labelAttributes: ITextInputElementAttributes = {}
  const rootAttributes: ITextInputElementAttributes = {}
  const smallAttributes: ITextInputElementAttributes = {}
  if (typeof inputClassName !== 'undefined') inputAttributes.className = inputClassName
  if (typeof labelClassName !== 'undefined') labelAttributes.className = labelClassName
  if (typeof rootClassName !== 'undefined') rootAttributes.className = rootClassName
  if (typeof smallClassName !== 'undefined') smallAttributes.className = smallClassName

  return (
    <div {...rootAttributes}>
      {label && <label htmlFor={name} {...labelAttributes}>{label}</label>}
      <input
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        {...inputAttributes}
      />
      <small {...smallAttributes}/>
    </div>
  )
}
