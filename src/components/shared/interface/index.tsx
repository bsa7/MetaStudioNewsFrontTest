import React from 'react'
import { connect } from 'react-redux'
import { TextInput as UnstyledTextInput, ITextInputProps } from '@interface-components/unstyled/text-input'
import { TextInput as BootstrapTextInput } from '@interface-components/bootstrap-theme/text-input'
import { IApplicationState } from '@reducers'
import { getDataFromState } from '@lib/flux-helper'
import { ThemeName } from '@constants/enums'

export type InterfaceComponent = keyof typeof InterfaceFactory.components

export class InterfaceFactory {
  static components = {
    UnstyledTextInput,
    BootstrapTextInput,
  }

  public create = (type: InterfaceComponent) => InterfaceFactory.components[type]
}

const interfaceElementFactory = new InterfaceFactory()

interface IThemeStateProps {
  themeName?: string
}

interface IThemeProps extends IThemeStateProps {
  componentName: string
  componentProps: any
}

class ThemeComponentWrapper extends React.PureComponent<IThemeProps> {
  render() {
    const { componentName, componentProps, themeName } = this.props
    const interfaceComponentName = `${themeName as ThemeName}${componentName}` as InterfaceComponent
    const Component = interfaceElementFactory.create(interfaceComponentName)

    return (
      <Component
        {...componentProps}
      />
    )
  }
}

const mapStateToProps = (state: IApplicationState): IThemeStateProps => {
  const themeName: keyof typeof ThemeName = getDataFromState(state, 'session.themeName')
  return { themeName }
}

const ThemeComponent = connect(mapStateToProps)(ThemeComponentWrapper)

const TextInput = (props: ITextInputProps) => <ThemeComponent componentName='TextInput' componentProps={props} />

export {
  TextInput,
}
