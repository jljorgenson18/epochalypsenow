import React, { Component } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';

import { timestampFormats } from '../Constants';

const getDigitsFromTimestamp = timestamp => {
  return timestamp.split('').map(Number);
};

class CurrentTimeStamp extends Component {
  state = {
    digits: getDigitsFromTimestamp(moment().format(timestampFormats.seconds)),
    changingDigits: {}
  };

  componentDidMount() {
    this.interval = setInterval(() => {
    const newTimestamp = moment().format(timestampFormats.seconds);
    const nextTimestamp = String(Number(newTimestamp) + 1);
    const newDigits = getDigitsFromTimestamp(newTimestamp);
    const nextDigits = getDigitsFromTimestamp(nextTimestamp);
    // console.log(newDigits);
    const changingDigits = {};
    newDigits.forEach((digit, idx) => {
      if (digit !== nextDigits[idx]) {
        changingDigits[idx] = true;
      }
    });
    // console.log(newDigits);
      this.setState({
        changingDigits: changingDigits,
        digits: newDigits
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { digits, changingDigits } = this.state;
    return (
      <div>
        <h3>The current Timestamp is:</h3>
        {digits.map((digit, idx) => {
          return (
            <span key={idx}>
              <span>{digit}</span>
              {/* {changingDigits[idx] ? '(' + ((digit + 1) % 10) + ')' : null} */}
            </span>
          );
        })}
      </div>
    );
  }
}

export default CurrentTimeStamp;
