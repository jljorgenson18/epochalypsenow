import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../components/Button';
import StyledSelect from '../../components/formControls/Select';
import StyledInput from '../../components/formControls/Input';

const modifyDate = (values, currentDate) => {
  const { operator, timeKey, amount } = values;
  const newDate = currentDate.clone();
  newDate[operator](amount, timeKey);
  return newDate;
};
const Wrapper = styled.div`
  overflow: hidden;

  .accordionTrigger {
    border: none;
    text-decoration: underline;

    &:focus {
      outline: none;
    }
  }
`;

const CollapsibleForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  max-height: 0;
  transition: all 0.4s ease-in-out;
  opacity: 0;
  padding: 10px;

  &.open {
    max-height: 400px;
    opacity: 1;
  }
`;

class AddTimeToDate extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onModify: PropTypes.func.isRequired
  };
  state = {
    operator: 'add',
    timeKey: 'days',
    amount: 1,
    expanded: false
  };
  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
    console.log(this.state.expanded);
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
    const { operator, timeKey, amount, expanded } = this.state;
    return (
      <Wrapper>
        <button className="accordionTrigger" onClick={this.handleClick}>
          Modify Date
        </button>
        <CollapsibleForm
          onSubmit={this.handleSubmit}
          className={expanded ? 'open' : ''}>
          <StyledSelect>
            <label htmlFor="operator">action:</label>
            <select
              name="operator"
              id="operator"
              value={operator}
              onChange={this.handleChange}>
              <option value="add">add</option>
              <option value="subtract">subtract</option>
            </select>
            <span className="material-icons" aria-hidden="true">
              keyboard_arrow_down
            </span>
          </StyledSelect>
          <StyledSelect>
            <label htmlFor="timeKey">time unit:</label>
            <select
              name="timeKey"
              id="timeKey"
              value={timeKey}
              onChange={this.handleChange}>
              <option value="years">years</option>
              <option value="months">months</option>
              <option value="weeks">weeks</option>
              <option value="days">days</option>
              <option value="hours">hours</option>
              <option value="seconds">seconds</option>
              <option value="milliseconds">milliseconds</option>
            </select>
            <span className="material-icons" aria-hidden="true">
              keyboard_arrow_down
            </span>
          </StyledSelect>
          <StyledInput>
            <label htmlFor="amount">amount:</label>
            <input
              type="number"
              step="1"
              min="0"
              name="amount"
              id="amount"
              value={amount}
              onChange={this.handleChange}
            />
          </StyledInput>
          <Button type="submit">Modify Date</Button>
        </CollapsibleForm>
      </Wrapper>
    );
  }
}

export default AddTimeToDate;
