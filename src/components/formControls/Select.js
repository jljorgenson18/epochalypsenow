import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class StyledSelect extends Component {
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
                {option.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default StyledSelect;
