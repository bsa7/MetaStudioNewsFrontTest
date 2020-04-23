import React from 'react'
import { FormEditHandler } from '@lib/common-defs'

export interface ITextInputProps {
  defaultValue?: string
  errorMessage?: string
  errorMessageClassName?: string
  inputClassName?: string
  label?: string
  labelClassName?: string
  name: string
  onChange: FormEditHandler
  placeholder?: string
  rootClassName?: string
  type?: 'text' | 'password'
}

interface ITextInputElementAttributes {
  className?: string
  id?: string
}

export const TextInput: React.FunctionComponent<ITextInputProps> = ({
  defaultValue,
  errorMessage,
  errorMessageClassName,
  inputClassName,
  label,
  labelClassName,
  name,
  onChange,
  placeholder,
  rootClassName,
  type = 'text'
}) => {
  const errorMessageAttributes: ITextInputElementAttributes = {}
  const inputAttributes: ITextInputElementAttributes = {}
  const labelAttributes: ITextInputElementAttributes = {}
  const rootAttributes: ITextInputElementAttributes = {}
  if (typeof errorMessageClassName !== 'undefined') errorMessageAttributes.className = errorMessageClassName
  if (typeof inputClassName !== 'undefined') inputAttributes.className = inputClassName
  if (typeof labelClassName !== 'undefined') labelAttributes.className = labelClassName
  if (typeof rootClassName !== 'undefined') rootAttributes.className = rootClassName

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
      <small {...errorMessageAttributes}>{errorMessage}</small>
    </div>
  )
}
