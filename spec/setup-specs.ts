import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

export const enzymeConfigureAdapter = () => {
  enzyme.configure({ adapter: new Adapter() })
}
