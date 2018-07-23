import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Tab from './Tab';

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <h3>Choose a conversion:</h3>
        <TabContainer>{children}</TabContainer>
      </div>
    );
  }
}

export default Tabs;
