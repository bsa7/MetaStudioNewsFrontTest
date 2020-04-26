import React from 'react'
import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import { create, ReactTestRenderer } from 'react-test-renderer'
import { AuthPage } from '@components/auth-page/index'
import { IAuthProps, IAuthOwnProps } from '@components/auth-page/auth.container'
// import { router } from '@components/router'
import toJson from 'enzyme-to-json'
import { enzymeConfigureAdapter } from './setup-specs'

enzymeConfigureAdapter()
let wrapper: ShallowWrapper<IAuthProps & IAuthOwnProps>
let snapshot: ReactTestRenderer

// beforeEach(() => {
//   const component = <AuthPage />

//   wrapper = shallow(component)
//   snapshot = create(component)
// })

// describe('<AuthPage />', () => {
//   it('renders as expected', () => {
//     const authProps: IAuthProps & IAuthOwnProps = {}
//     const component = <AuthPage {...authProps} />

//     wrapper = shallow(component)
//     snapshot = create(component)

//     expect(toJson(wrapper)).toMatchSnapshot()
//   })
// })
