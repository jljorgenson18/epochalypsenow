import styled from 'styled-components';
import { darken } from 'polished';

const StyledInput = styled.div`
  border: 1px solid #c2c2c2;
  border-radius: 2px;
  position: relative;
  margin: 10px 10px 10px 0;
  width: 200px;

  &::after {
    left: 0;
    right: 0;
    bottom: 0;
    content: '\00a0';
    position: absolute;
    transition: border 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 0 solid #c2c2c2;
    pointer-events: none;
  }
  input {
    appearance: textfield;
    background-color: #fff;
    border: none;
    padding: 10px 0 10px 10px;
    min-width: 200px;
    box-sizing: border-box;
  }

  &:hover {
    cursor: pointer;

    &::after {
      border-bottom: 2px solid #9b9b9b;
    }
  }
`;

export default StyledInput;
