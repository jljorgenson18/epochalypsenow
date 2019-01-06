import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
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

  it('should render the app', () => {
    // Arrange

    // Act
    const wrapper = shallow(<AppComponent {...mockProps} />);

    // Assert
    expect(wrapper.find('App__Wrapper')).to.have.length(1);
  });

  it('should match the snapshot', async () => {
    // Arrange

    // Act
    const wrapper = shallow(<AppComponent {...mockProps} />);

    // Assert
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  // Waiting until Enzyme figures their shit out
  it('should update the activeSection when clicking a tab', () => {
    // Arrange
    const wrapper = shallow(<AppComponent {...mockProps} />);

    // Act
    wrapper
      .find('Tabs Tab')
      .at(1)
      .dive()
      .find('button')
      .simulate('click');

    // Assert
    expect(wrapper.state('activeSection')).to.equal('timestampToReadable');
  });
});
