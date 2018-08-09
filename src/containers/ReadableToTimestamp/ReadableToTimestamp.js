import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import TimestampOutput from './TimestampOutput';
import AddTimeToDate from './AddTimeToDate';
import DatePicker from '../../components/formControls/DatePicker';
import StyledSelect from '../../components/formControls/Select';

// Like iso without the timezone
const tzConversionFormat = 'YYYY-MM-DDTHH:mm:ss';

const getOutputDate = values => {
  const { timezone, pickedDate } = values;
  if (!pickedDate || !timezone) {
    return null;
  }
  return moment.tz(
    pickedDate.format(tzConversionFormat),
    tzConversionFormat,
    timezone
  );
};

const getSortedTimezones = () => {
  const timezones = moment.tz.names();
  return timezones
    .map(zone => {
      const offset = moment.tz(zone).format('Z');
      return {
        name: zone,
        label: `(GMT ${offset}) ${zone}`,
        offset: offset
      };
    })
    .sort((a, b) => {
      return (
        parseInt(a.offset.replace(':', ''), 10) -
        parseInt(b.offset.replace(':', ''), 10)
      );
    });
};

const timezones = getSortedTimezones();

class ReadableToTimestamp extends Component {
  constructor(props) {
    super(props);
    const initialDate = moment();
    this.state = {
      outputDate: initialDate.clone(),
      formValues: {
        pickedDate: initialDate,
        timezone: moment.tz.guess()
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formValues !== this.state.formValues) {
      this.setState({
        outputDate: getOutputDate(this.state.formValues)
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

  render() {
    const {
      outputDate,
      formValues: { timezone, pickedDate }
    } = this.state;
    return (
      <div className="readable">
        <form>
          <DatePicker
            date={pickedDate}
            onChange={this.handleDatePickerChange}
          />
          <div className="form-group">
            <label>Timezone:</label>
            <StyledSelect>
              <select
                value={timezone}
                name="timezone"
                onChange={this.handleChange}>
                {timezones.map(zone => {
                  return (
                    <option value={zone.name} key={zone.name}>
                      {zone.label}
                    </option>
                  );
                })}
              </select>
            </StyledSelect>
          </div>
        </form>
        <AddTimeToDate onModify={this.handleModify} date={pickedDate} />
        <TimestampOutput outputDate={outputDate} />
      </div>
    );
  }
}

export default ReadableToTimestamp;
