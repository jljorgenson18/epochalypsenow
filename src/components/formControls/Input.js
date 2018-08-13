import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class TextInput extends Component {
  render() {
    const { name, value, onChange, label, type, inputProps } = this.props;
    return (
      <TextField
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        inputProps={inputProps}
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  }
}

export default TextInput;
