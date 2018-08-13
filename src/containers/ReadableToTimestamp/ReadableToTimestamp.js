import React, { Component } from 'react';
import moment from 'moment-timezone';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import TimestampOutput from './TimestampOutput';
import AddTimeToDate from './AddTimeToDate';
import TimezonePicker from '../../components/formControls/TimezonePicker';

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
          <DateTimePicker
            value={pickedDate}
            onChange={this.handleDatePickerChange}
          />
          <TimezonePicker
            value={timezone}
            name="timezone"
            label="Timezone"
            onChange={this.handleChange}
          />
        </form>
        <AddTimeToDate onModify={this.handleModify} date={pickedDate} />
        <TimestampOutput outputDate={outputDate} />
      </div>
    );
  }
}

export default ReadableToTimestamp;
