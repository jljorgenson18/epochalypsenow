import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

import Button from '../../components/Button';
import StyledSelect from '../../components/formControls/Select';
import TextInput from '../../components/formControls/Input';

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
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #808080;
    border-radius: 2px;
    padding: 5px;
    color: #fff;

    &:focus {
      outline: none;
    }

    span {
      transition: all 0.4s ease-in-out;
      color: #fff;
    }
  }

  form {
    display: flex;
    flex-wrap: wrap;
    max-height: 0;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    padding: 10px;
    border-left: 1px solid #808080;
    border-bottom: 1px solid #808080;
    border-right: 1px solid #808080;
    border-radius: 0 0 2px 2px;
  }

  &.open {
    .accordionTrigger {
      border-radius: 2px 2px 0 0;

      span {
        transform: rotate(135deg);
      }
    }

    form {
      max-height: 400px;
      opacity: 1;
    }
  }
`;

const CollapsibleForm = styled.form``;

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
      <Wrapper className={expanded ? 'open' : ''}>
        <button className="accordionTrigger" onClick={this.handleClick}>
          Modify Date
          <AddIcon />
        </button>
        <form onSubmit={this.handleSubmit} className={expanded ? 'open' : ''}>
          <StyledSelect
            name="operator"
            value={operator}
            onChange={this.handleChange}
            label="action"
            options={[{ name: 'add' }, { name: 'subtract' }]}
          />
          <StyledSelect
            name="timeKey"
            value={timeKey}
            onChange={this.handleChange}
            label="Time Unit"
            options={[
              { name: 'years' },
              { name: 'months' },
              { name: 'weeks' },
              { name: 'days' },
              { name: 'hours' },
              { name: 'seconds' },
              { name: 'milliseconds' }
            ]}
          />
          <TextInput
            name="amount"
            value={amount}
            onChange={this.handleChange}
            label="amount"
            type="number"
            inputProps={{ min: '0', step: '1' }}
          />
          <Button type="submit">Modify Date</Button>
        </form>
      </Wrapper>
    );
  }
}

export default AddTimeToDate;
