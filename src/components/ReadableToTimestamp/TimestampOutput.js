import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class TimestampOutput extends Component {
  static propTypes = {
    timestamp: PropTypes.string
  };

  render() {
    const { timestamp } = this.props;
    if (!timestamp) {
      return null;
    }
    return (
      <div>
        <div>Output Area </div>
        <textarea name="output" value={timestamp} readOnly />
      </div>
    );
  }
}

export default TimestampOutput;
