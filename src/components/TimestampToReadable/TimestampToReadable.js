import React, { Component } from 'react';
import styled from 'styled-components';
import { unformat } from 'accounting';
import moment from 'moment-timezone';

import ReadableOutput from './ReadableOutput';
import { timestampFormats } from '../../Constants';

const MAX_SECOND_TIMESTAMP_VALUE = 999999999999;
const MAX_MILLISECOND_TIMESTAMP_VALUE = MAX_SECOND_TIMESTAMP_VALUE * 1000;
const SECOND_DATE_FORMAT = 'X';
const MILLISECOND_DATE_FORMAT = 'x';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;

  input {
    border: none;
    border-radius: 6px;
    padding: 5px;
    margin: 10px;
  }

  input:focus {
    outline: none;
  }
`;

class TimestampToReadable extends Component {
  constructor(props) {
    super(props);
    const initialDate = moment();
    this.state = {
      outputDate: initialDate,
      timestamp: initialDate.format(timestampFormats.seconds)
    };
  }

  handleTimestampChange = event => {
    const { value } = event.target;
    let newTimestamp = null;
    let newDate = null;
    if (value) {
      // We want to add a max timestamp to prevent weird
      // scientific notation issues and to keep the dates valid
      newTimestamp = Math.min(unformat(value), MAX_SECOND_TIMESTAMP_VALUE);
      newDate = moment(newTimestamp, timestampFormats.seconds);
    }
    this.setState({ timestamp: newTimestamp, outputDate: newDate });
  };

  render() {
    const { outputDate, timestamp } = this.state;
    return (
      <Wrapper>
        <input
          type="text"
          value={timestamp ? String(timestamp) : ''}
          onChange={this.handleTimestampChange}
        />
        <ReadableOutput date={outputDate} />
      </Wrapper>
    );
  }
}

export default TimestampToReadable;
