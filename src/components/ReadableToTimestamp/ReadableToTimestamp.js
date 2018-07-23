import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import TimestampOutput from './TimestampOutput';
import DatePicker from '../DatePicker';
import AddTimeToDate from './AddTimeToDate';
import { timestampFormats } from '../../Constants';

// Like iso without the timezone
const tzConversionFormat = 'YYYY-MM-DDTHH:mm:ss';

const getTimestamp = values => {
  const { timezone, pickedDate, formatType } = values;
  if (!pickedDate || !timezone) {
    return null;
  }
  return moment
    .tz(pickedDate.format(tzConversionFormat), tzConversionFormat, timezone)
    .format(timestampFormats[formatType]);
};

const timezones = moment.tz.names();

class ReadableToTimestamp extends Component {
  constructor(props) {
    super(props);
    const initialDate = moment();
    this.state = {
      timestamp: initialDate.format(timestampFormats.seconds),
      formValues: {
        pickedDate: initialDate,
        timezone: moment.tz.guess(),
        formatType: 'seconds'
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formValues !== this.state.formValues) {
      this.setState({
        timestamp: getTimestamp(this.state.formValues)
      });
    }
  }

  handleDatePickerChange = date => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        pickedDate: date
      }
    });
  };

  handleModify = date => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        pickedDate: date
      }
    });
  };

  handleChange = event => {
    const {
      target: { name, value }
    } = event;
    if (name) {
      this.setState({
        formValues: {
          ...this.state.formValues,
          [name]: value
        }
      });
    }
  };
  handleFormatTypeChange = event => {
    const {
      target: { checked, name }
    } = event;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: checked ? 'seconds' : 'milliseconds'
      }
    });
  };

  render() {
    const {
      timestamp,
      formValues: { timezone, pickedDate, formatType }
    } = this.state;
    return (
      <div className="readable">
        <form>
          <DatePicker
            date={pickedDate}
            onChange={this.handleDatePickerChange}
          />
          <div className="form-group">
            <label>Timezone</label>
            <select
              value={timezone}
              name="timezone"
              onChange={this.handleChange}>
              {timezones.map(zone => {
                return (
                  <option value={zone} key={zone}>
                    {zone}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <Toggle
              checked={formatType === 'seconds'}
              value={formatType}
              name="formatType"
              onChange={this.handleFormatTypeChange}
            />
            <label>
              {formatType === 'seconds' ? 'Seconds' : 'Milliseconds'}
            </label>
          </div>
        </form>
        <AddTimeToDate onModify={this.handleModify} date={pickedDate} />
        <TimestampOutput timestamp={timestamp} />
      </div>
    );
  }
}

export default ReadableToTimestamp;
