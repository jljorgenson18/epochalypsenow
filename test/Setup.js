import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import chai from 'chai';
import 'ignore-styles'; // Will ignore style and image imports
import chaiJestSnapshot from 'chai-jest-snapshot';
import { setupDom } from './helpers/JSDomSetup';

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
