import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReadableOutput from '~/src/containers/TimestampToReadable/ReadableOutput';

describe('ReadableOutput', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      date: {
        format: sinon.stub().callsFake(() => 'Some date format')
      }
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be here', async () => {
    expect(ReadableOutput).to.be.ok;
  });

  it('should match snapshot', async () => {
    // Arrange
    // Act
    const wrapper = shallow(<ReadableOutput {...mockProps} />);

    // Assert
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render a date', async () => {
    // Arrange
    // Act
    const wrapper = shallow(<ReadableOutput {...mockProps} />);

    // Assert
    expect(wrapper.find('p').length).to.equal(1);
  });
});
