import React, { Component } from 'react';
import styled from 'styled-components';

const StyledTab = styled.div`
  button {
    color: grey;
    font-size: 18px;
    padding: 10px 20px;
    border: 2px grey solid;
    background: none;
  }

  button.active {
    background-color: grey;
    color: white;
  }

  button:focus {
    outline: none;
  }
`;

class Tab extends Component {
  handleClick = event => {
    const { section, onClick } = this.props;
    onClick(section);
  };
  render() {
    const { children, section, activeTab } = this.props;
    return (
      <StyledTab>
        <button
          className={section === activeTab ? 'active' : ''}
          onClick={this.handleClick}>
          {children}
        </button>
      </StyledTab>
    );
  }
}

export default Tab;
