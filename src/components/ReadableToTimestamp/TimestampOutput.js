import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { timestampFormats } from '../../Constants';

class TimestampOutput extends Component {
  static propTypes = {
    date: PropTypes.object
  };

  render() {
    const { date } = this.props;
    if (!date) {
      return null;
    }
    const timestamp = date.format(timestampFormats.seconds);
    return (
      <div>
        <div>Output Area </div>
        <textarea name="output" value={timestamp} readOnly />
      </div>
    );
  }
}

export default TimestampOutput;
