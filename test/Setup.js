// Uses commonJS for better us with Wallaby since it executes this
// before Babel compiles
const Adapter = require('enzyme-adapter-react-16');
const Enzyme = require('enzyme');
const chai = require('chai');
require('ignore-styles'); // Will ignore style and image imports
const chaiJestSnapshot = require('chai-jest-snapshot');
const { setupDom } = require('./helpers/JSDomSetup');

chai.use(chaiJestSnapshot);

// Sets up JSDom
setupDom();

// Sets up Enzyme
Enzyme.configure({ adapter: new Adapter() });

// Uses a delayed run so we can get .before and .beforeEach available
setTimeout(() => {
  before(function() {
    chaiJestSnapshot.resetSnapshotRegistry();
  });

  beforeEach(function() {
    chaiJestSnapshot.configureUsingMochaContext(this);
  });
  run();
});
