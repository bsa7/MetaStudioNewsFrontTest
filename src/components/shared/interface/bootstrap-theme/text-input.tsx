import React from 'react'
import { TextInput as UnstyledTextInput, ITextInputProps } from '@components/shared/interface/unstyled/text-input'

export const TextInput: React.FunctionComponent<ITextInputProps> = (props) => {
  return (
    <UnstyledTextInput
      errorMessageClassName='form-text text-muted'
      inputClassName='form-control'
      rootClassName='form-group'
      {...props}
    />
  )
}
