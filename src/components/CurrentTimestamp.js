import React, { Component } from 'react';
import moment from 'moment-timezone';

import { timestampFormats } from '../Constants';

class CurrentTimeStamp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        timestamp: moment().format(timestampFormats.seconds)
      };
    }

    componentDidMount() {
      this.interval = setInterval(() => {
          this.setState({timestamp: moment().format(timestampFormats.seconds)});
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

  
    render() {
      const { timestamp } = this.state;
      return (
        <div>{timestamp}</div>
      );
    }
}

export default CurrentTimeStamp;
