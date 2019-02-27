import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  display: block;
  padding: 8px 16px;
  color: grey;
  font-size: 12px;
  border: 2px solid grey;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  letter-spacing: 0.08em;
  transition: all 0.5s ease;
  background: none;
  z-index: 1;
  margin: 6px;
  min-height: 36px;

  &::after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: grey;
    transition: all 0.5s ease 0s;
    z-index: -1;
  }

  &:hover {
    color: #fff;
    text-shadow: none;

    &::after {
      width: 100%;
    }
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
