import React, { Component } from 'react';
import { normalize } from 'polished';
import styled, { injectGlobal } from 'styled-components';
import { hot } from 'react-hot-loader';

import TimestampToReadable from './TimestampToReadable';
import ReadableToTimestamp from './ReadableToTimestamp';
import Output from './Output';

injectGlobal`
  ${normalize()}

  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.main`
  background-color: #fff2f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Epochalypse Now!</h1>
        <TimestampToReadable />
        <ReadableToTimestamp />
      </Wrapper>
    );
  }
}

export default hot(module)(App);
