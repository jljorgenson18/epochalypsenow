import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { AppComponent } from '~/src/containers/App';

describe('App', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      t: key => key
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be here', () => {
    expect(AppComponent).to.be.ok;
  });

  it('should render the app', () => {
    // Arrange

    // Act
    const wrapper = mount(<AppComponent {...mockProps} />);

    // Assert
    expect(wrapper.find('App__Wrapper')).to.have.length(1);
  });
});
