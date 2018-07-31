import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTab = styled.div`
  button {
    color: #e5e5e5;
    font-size: 18px;
    padding: 10px 0;
    border: none;
    background: none;
    margin: 10px;
    position: relative;
    overflow: hidden;
    transition: 0.3s;
  }

  button::after {
    position: absolute;
    transition: 0.3s;
    content: '';
    width: 0;
    left: 50%;
    bottom: 0;
    height: 2px;
    background: #9b9b9b;
  }

  button:hover {
    color: #9b9b9b;
  }

  button:hover::after {
    width: 100%;
    left: 0;
  }

  button.active {
    color: #9b9b9b;
  }

  button.active::after {
    width: 100%;
    left: 0;
  }

  button:focus {
    outline: none;
  }
`;

class Tab extends Component {
  static propTypes = {
    section: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    activeTab: PropTypes.string
  };

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
