import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'date-fns/parse';
import isValid from 'date-fns/is_valid';
import styled from 'styled-components';
import { unformat } from 'accounting';
import moment from 'moment-timezone';

import FunFacts from './FunFacts';
import DatePicker from './DatePicker';

// console.log(moment.tz.names());
const MAX_TIMESTAMP_VALUE = 999999999999999;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

class TimestampToReadable extends Component {
  state = {
    date: null,
    timestamp: null
  };

  handleTimestampChange = event => {
    const { value } = event.target;
    let newTimestamp = null;
    let newDate = null;
    if (value) {
      // We want to add a max timestamp to prevent weird
      // scientific notation issues and to keep the dates valid
      newTimestamp = Math.min(unformat(value), MAX_TIMESTAMP_VALUE);
      newDate = parse(newTimestamp);
    }
    this.setState({ timestamp: newTimestamp, date: newDate });
  };
  handleDatePickerChange = date => {
    console.log(date);
    this.setState({ timestamp: date[0].getTime(), date: date[0] });
  };

  render() {
    const { date, timestamp } = this.state;
    console.log(
      `Timezone Offset is ${date ? date.getTimezoneOffset() / 60 : ''}`
    );
    return (
      <Wrapper>
        <input
          type="text"
          value={timestamp ? String(timestamp) : ''}
          onChange={this.handleTimestampChange}
        />
        <DatePicker onChange={this.handleDatePickerChange} date={date} />
        <FunFacts date={date} />
      </Wrapper>
    );
  }
}

export default TimestampToReadable;
