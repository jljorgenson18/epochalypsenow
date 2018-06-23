import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

class DatePicker extends Component {
  propTypes = {
    date: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { date, onChange } = this.props;
    return (
      <Flatpickr
        options={{ allowInput: true, enableTime: true }}
        value={date}
        onChange={onChange}
      />
    );
  }
}

export default DatePicker;
