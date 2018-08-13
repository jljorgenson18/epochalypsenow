import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class StyledSelect extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired
  };
  render() {
    const { name, value, onChange, label, options } = this.props;
    return (
      <FormControl>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          inputProps={{
            name: name,
            id: name
          }}>
          {options.map(option => {
            return (
              <MenuItem value={option.name} key={option.name}>
                {option.value || option.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default StyledSelect;
