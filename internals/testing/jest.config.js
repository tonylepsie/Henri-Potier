// needed to configure jest react adapter
// see https://github.com/airbnb/enzyme#installation
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'whatwg-fetch';
import 'jest-localstorage-mock';

Enzyme.configure({ adapter: new Adapter() });
