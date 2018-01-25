import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

const TestComponent = styled.p`
  color: tomato;
`;

class App extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h1>Let us begin??</h1>
        <TestComponent>Hey I am a styled component</TestComponent>
      </div>
    );
  }
}

export default hot(module)(App);
