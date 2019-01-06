import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { setupDom } from './helpers/JSDomSetup';
import 'ignore-styles'; // Will ignore style and image imports
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Sets up JSDom
setupDom();

// Sets up Enzyme
Enzyme.configure({ adapter: new Adapter() });
