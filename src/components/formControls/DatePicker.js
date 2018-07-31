import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Picker from 'react-datepicker';

if (process.env.NODE_ENV !== 'test') {
  require('react-datepicker/dist/react-datepicker.css');
}

const Wrapper = styled.div`
  input {
    appearance: none;
    background-color: #fff;
    border: 1px solid #c2c2c2;
    border-radius: 2px;
    padding: 5px;
    margin: 10px 10px 10px 0;

    &:hover {
      border: 2px solid #c2c2c2;
    }
  }

  .react-datepicker-popper {
    z-index: 999;
  }
`;

const StyledPicker = styled(Picker)`
  ul {
    padding-left: 0;
  }
`;

class DatePicker extends Component {
  static propTypes = {
    date: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { date, onChange } = this.props;
    return (
      <Wrapper>
        <StyledPicker
          selected={date}
          onChange={onChange}
          timeIntervals={15}
          showTimeSelect
          timeFormat="LT"
          dateFormat="LLL"
        />
      </Wrapper>
    );
  }
}

export default DatePicker;
