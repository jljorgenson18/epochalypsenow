import { expect } from 'chai';

import Root from '~/src/containers/Root';

describe('SanityCheck', () => {
  it('should be able to run tests', () => {
    expect(true).to.be.true;
    expect(false).to.be.false;
  });
  it('should have the React app available', () => {
    expect(Root).not.to.be.null;
  });
});
