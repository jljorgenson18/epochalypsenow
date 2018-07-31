import styled from 'styled-components';
import { darken } from 'polished';

const StyledInput = styled.input`
  appearance: none;
  background-color: #fff;
  border: 1px solid #c2c2c2;
  border-radius: 2px;
  padding: 5px;
  margin: 10px 10px 10px 0;

  &:hover {
    border: 2px solid #c2c2c2;
  }
`;

export default StyledInput;
