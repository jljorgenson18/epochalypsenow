import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { AppComponent } from '~/src/containers/App';

describe('App', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      t: sinon.stub().callsFake(key => key)
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be here', () => {
    expect(AppComponent).to.be.ok;
  });

  xit('should render the app', () => {
    // Arrange

    // Act
    const wrapper = mount(<AppComponent {...mockProps} />);

    // Assert
    expect(wrapper.find('App__Wrapper')).to.have.length(1);
  });

  xit('should update the activeSection when clicking a tab', () => {
    // Arrange
    const wrapper = mount(<AppComponent {...mockProps} />);

    // Act
    wrapper
      .find('Tabs Tab')
      .at(1)
      .find('button')
      .simulate('click');

    // Assert
    expect(wrapper.state('activeSection')).to.equal('timestampToReadable');
  });
});
