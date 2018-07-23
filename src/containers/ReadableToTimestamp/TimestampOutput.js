import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class TimestampOutput extends Component {
  static propTypes = {
    timestamp: PropTypes.string
  };

  state = {
    copied: false
  };

  handleCopy = () => {
    this.setState({ copied: true });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.timestamp !== this.props.timestamp) {
      this.setState({
        copied: false
      });
    }
  }

  render() {
    const { timestamp } = this.props;
    if (!timestamp) {
      return null;
    }

    return (
      <div>
        <div>Output Area </div>
        <textarea name="output" value={timestamp} readOnly />
        <CopyToClipboard text={timestamp} onCopy={this.handleCopy}>
          <button>{this.state.copied ? 'Copied!' : 'Copy'}</button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default TimestampOutput;
