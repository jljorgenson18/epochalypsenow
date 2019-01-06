import React from 'react';
import PropTypes from 'prop-types';

const ReadableOutput = props => {
  const { date } = props;
  if (!date) {
    return null;
  }
  return <p>{date.format()}</p>;
};

ReadableOutput.propTypes = {
  date: PropTypes.object
};

export default ReadableOutput;
