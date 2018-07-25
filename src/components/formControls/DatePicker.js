import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Picker from 'react-datepicker';

if (process.env.NODE_ENV !== 'test') {
  require('react-datepicker/dist/react-datepicker.css');
}

const Wrapper = styled.div`
  a {
    color: white;
    background: tomato;
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
