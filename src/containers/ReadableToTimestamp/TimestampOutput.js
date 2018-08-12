import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Button from '../../components/Button';
import { timestampFormats } from '../../Constants';
import Toggle from '../../components/formControls/Toggle';

const Output = styled.div`
  textarea {
    width: 100%;
    min-height: 200px;
    border: 1px solid C2C2C2;
    border-radius: 2px;
    padding: 10px;
    position: relative;
    box-sizing: border-box;
  }

  .outputTop {
    /* display: flex;
    justify-content: space-between; */
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;

    .toggle {
      position: absolute;
      right: 26px;
      top: 0;
    }
  }
`;

class TimestampOutput extends Component {
  static propTypes = {
    outputDate: PropTypes.object
  };

  state = {
    copied: false,
    formatType: 'seconds'
  };

  handleCopy = () => {
    this.setState({ copied: true });
  };

  handleFormatTypeChange = event => {
    const {
      target: { checked }
    } = event;
    this.setState({
      formatType: checked ? 'seconds' : 'milliseconds'
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.outputDate !== this.props.outputDate) {
      this.setState({
        copied: false
      });
    }
  }

  render() {
    const { formatType, copied } = this.state;
    const { outputDate } = this.props;
    if (!outputDate) {
      return null;
    }
    const timestamp = outputDate.format(timestampFormats[formatType]);

    return (
      <Output>
        <div className="outputTop">
          <span>Timestamp:</span>
          <Toggle
            type="checkbox"
            checked={formatType === 'seconds'}
            value={formatType}
            toggleName="formatType"
            onChange={this.handleFormatTypeChange}
            handlerColor="#9a8e9c"
            backgroundColor="tomato"
            fontColorChecked="#9a8e9c"
            fontColorUnchecked="#ffffff"
          />
        </div>
        <textarea name="output" value={timestamp} readOnly />
        <CopyToClipboard text={timestamp} onCopy={this.handleCopy}>
          <Button>{copied ? 'Copied!' : 'Copy'}</Button>
        </CopyToClipboard>
      </Output>
    );
  }
}

export default TimestampOutput;
