const Adapter = require('enzyme-adapter-react-16');
const Enzyme = require('enzyme');

const { setupDom } = require('./helpers/JSDomSetup');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Sets up JSDom
setupDom();

// Sets up Enzyme
Enzyme.configure({ adapter: new Adapter() });
