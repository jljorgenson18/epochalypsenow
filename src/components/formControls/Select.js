import styled from 'styled-components';

const StyledSelect = styled.div`
  border-radius: 2px;
  position: relative;
  margin: 8px;
  min-width: 100px;
  max-width: 300px;
  border: 0;
  display: inline-flex;
  padding: 0;
  flex-direction: column;
  flex-wrap: wrap;

  label {
    /* pointer-events: none; */
    margin: 0;
    color: $placeHolderColor;
    z-index: 1;
    transition: all 0.2s ease-in-out;
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 4px;
    font-size: 14px;
    line-height: 20px;
  }

  &::after {
    left: 0;
    right: 0;
    bottom: 0;
    content: '\00a0';
    position: absolute;
    transition: border 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid #c2c2c2;
    pointer-events: none;
  }

  select {
    appearance: none;
    background-color: #fff;
    border: none;
    padding: 10px;
    width: 100%;
    margin-top: 18px;
  }

  &:hover {
    cursor: pointer;

    &::after {
      border-bottom: 2px solid #9b9b9b;
    }
  }
`;

export default StyledSelect;
