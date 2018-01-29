import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

class DatePicker extends Component {
  render() {
    const { date, onChange } = this.props;
    return <Flatpickr data-enable-time value={date} onChange={onChange} />;
  }
}

export default DatePicker;
