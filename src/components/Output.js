import React, { Component } from 'react';
import styled from 'styled-components';

class Output extends Component {
  render() {
    return (
      <div>
        <div>Output Area </div>
        <textarea name="output" value={this.props.timestamp} readOnly />
      </div>
    );
  }
}

export default Output;
