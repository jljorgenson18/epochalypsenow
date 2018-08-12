import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

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

  // Waiting until Enzyme figures their shit out
  xit('should render the app', () => {
    // Arrange

    // Act
    const wrapper = mount(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AppComponent {...mockProps} />
      </MuiPickersUtilsProvider>
    );

    // Assert
    expect(wrapper.find('App__Wrapper')).to.have.length(1);
  });

  // Waiting until Enzyme figures their shit out
  xit('should update the activeSection when clicking a tab', () => {
    // Arrange
    const wrapper = mount(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AppComponent {...mockProps} />
      </MuiPickersUtilsProvider>
    );

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
