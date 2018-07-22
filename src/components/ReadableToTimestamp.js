import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from './DatePicker';
import moment from 'moment-timezone';
import Output from './Output';

const SECOND_DATE_FORMAT = 'X';
const MILLISECOND_DATE_FORMAT = 'x';

class ReadableToTimestamp extends Component {
  state = {
    date: moment(),
    timestamp: moment().format(SECOND_DATE_FORMAT)
  };

  handleDatePickerChange = date => {
    this.setState({ timestamp: date.format(SECOND_DATE_FORMAT), date: date });
  };
  handleOutputChange = event => {
    // Grab value of input
    const addValue = event.currentTarget.value;
    // Add value to datepicker and output timestamp
    const newDate = this.state.date.add(addValue, 'days');

    this.setState({
      timestamp: newDate.format(SECOND_DATE_FORMAT),
      date: newDate
    });
  };

  render() {
    const { date, timestamp } = this.state;
    return (
      <div className="readable">
        Readable date!
        <DatePicker date={date} onChange={this.handleDatePickerChange} />
        <label htmlFor="add-time">Add Time: </label>
        <select name="add-time" onChange={this.handleOutputChange}>
          <option />
          <option type="number" value="1">
            +1 day
          </option>
          <option type="number" value="3">
            +3 day
          </option>
          <option type="number" value="7">
            +7 day
          </option>
        </select>
        <Output timestamp={timestamp} />
      </div>
    );
  }
}

export default ReadableToTimestamp;
