import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  // or we can define dynamic ones
  backgroundColor: props => props.backgroundColor || '#e5e5e5',
  backgroundColorChecked: props => props.backgroundColorChecked || '#808080',
  handlerColor: props => props.handlerColor || '#fff',
  handlerColorChecked: props => props.handlerColor || '#fff',
  fontColorChecked: props => props.fontColorChecked || '#808080',
  fontColorUnchecked: props => props.fontColorUnchecked || '#e5e5e5'
})`
  input {
    height: 0;
    width: 0;
    opacity: 0;
    position: absolute;
  }
  .toggle {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 50px;
    height: 20px;
    background-color: ${props => props.backgroundColorChecked};
    border-radius: 84px;
    transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

    &::before {
      content: 'MS';
      position: absolute;
      left: -30px;
      top: 50%;
      font-size: 18px;
      transform: translateY(-50%);
      color: ${props => props.fontColorChecked};
    }

    &::after {
      content: 'SS';
      position: absolute;
      right: -26px;
      top: 50%;
      font-size: 18px;
      transform: translateY(-50%);
      color: ${props => props.fontColorUnchecked};
    }
  }

  .toggle__handler {
    display: inline-block;
    position: relative;
    z-index: 1;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    background-color: ${props => props.handlerColor};
    border-radius: 50px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: rotate(-45deg);
  }

  input:checked {
    + .toggle {
      background-color: ${props => props.fontColorChecked};

      &::before {
        color: ${props => props.fontColorUnchecked};
      }

      &::after {
        color: ${props => props.fontColorChecked};
      }

      .toggle__handler {
        background-color: ${props => props.handlerColorChecked};
        transform: translate3d(30px, 0, 0) rotate(0);
      }
    }
  }
`;

class ToggleNew extends Component {
  render() {
    const { onChange, checked, toggleName } = this.props;
    return (
      <Wrapper>
        <input
          type="checkbox"
          checked={checked}
          name={toggleName}
          id={toggleName}
          onChange={onChange}
        />
        <label htmlFor={toggleName} className="toggle">
          <span className="toggle__handler" />
        </label>
      </Wrapper>
    );
  }
}

export default ToggleNew;
