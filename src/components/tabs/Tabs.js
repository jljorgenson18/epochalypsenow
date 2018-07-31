import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TabsContainer = styled.div`
  grid-area: tabs;
  margin-top: 20px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <TabsContainer>
        <Tab>{children}</Tab>
      </TabsContainer>
    );
  }
}

export default Tabs;
