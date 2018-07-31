import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import StyledSelect from '../../components/formControls/Select';
import StyledInput from '../../components/formControls/Input';

const modifyDate = (values, currentDate) => {
  const { operator, timeKey, amount } = values;
  const newDate = currentDate.clone();
  newDate[operator](amount, timeKey);
  return newDate;
};

class AddTimeToDate extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onModify: PropTypes.func.isRequired
  };
  state = {
    operator: 'add',
    timeKey: 'days',
    amount: 1
  };
  handleSubmit = event => {
    event.preventDefault();
    const { onModify, date } = this.props;

    const newDate = modifyDate(this.state, date);
    onModify(newDate);
  };

  handleChange = event => {
    const {
      target: { name, value, type }
    } = event;
    if (name) {
      this.setState({
        [name]: type === 'number' ? Number(value) : value
      });
    }
  };

  render() {
    const { operator, timeKey, amount } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <StyledSelect
            name="operator"
            value={operator}
            onChange={this.handleChange}>
            <option value="add">add</option>
            <option value="subtract">subtract</option>
          </StyledSelect>
          <StyledSelect
            name="timeKey"
            value={timeKey}
            onChange={this.handleChange}>
            <option value="years">years</option>
            <option value="months">months</option>
            <option value="weeks">weeks</option>
            <option value="days">days</option>
            <option value="hours">hours</option>
            <option value="seconds">seconds</option>
            <option value="milliseconds">milliseconds</option>
          </StyledSelect>
          <StyledInput
            type="number"
            step="1"
            min="0"
            name="amount"
            value={amount}
            onChange={this.handleChange}
          />
          <Button type="submit">Modify Date</Button>
        </form>
      </div>
    );
  }
}

export default AddTimeToDate;
