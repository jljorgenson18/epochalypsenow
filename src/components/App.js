import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalize } from 'polished';
import styled, { injectGlobal } from 'styled-components';
import { hot } from 'react-hot-loader';
import parse from 'date-fns/parse';
import { unformat } from 'accounting';

injectGlobal`
  ${normalize()}

  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    font-family: 'Roboto', sans-serif;
  }
`;

const Wrapper = styled.main`
  background-color: #fff2f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class App extends Component {
  state = {
    timestamp: '',
    convertedDate: null
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ timestamp: value ? unformat(value).toString() : '' });
  };

  handleSubmit = event => {
    this.setState({ convertedDate: parse(Number(this.state.timestamp)) });
    event.preventDefault();
  };

  static propTypes = {};

  render() {
    const convertedDate = this.state.convertedDate;

    return (
      <Wrapper>
        <h1>Let us begin??</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.timestamp}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {convertedDate ? <h5>{convertedDate.toString()}</h5> : null}
        {convertedDate ? <h5>{convertedDate.toISOString()}</h5> : null}
      </Wrapper>
    );
  }
}

export default hot(module)(App);
