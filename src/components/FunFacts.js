import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import dateFormat from 'date-fns/format';

const Wrapper = styled.p`
  max-width: 360px;
  text-align: center;
`;

class FunFacts extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date)
  };

  state = {
    loading: false,
    funFact: null
  };

  componentDidMount() {
    this.setFunFact(this.props.date);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.setFunFact(this.props.date);
    }
  }

  // We do a debounce function to prevent being rate limited
  setFunFact = debounce(date => {
    if (!date) {
      this.setState({
        loading: false,
        funFact: null
      });
      return;
    }
    this.setState({
      loading: true
    });
    const formattedDate = dateFormat(date, 'M/D');
    // We put a proxy in front of numbersapi.com in order to get https
    fetch(`https://epochalypsenow.io/${formattedDate}/date?json`)
      .then(response => response.json())
      .then(data => {
        if (data && data.found) {
          this.setState({
            funFact: data.text
          });
        }
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }, 200);

  render() {
    const { funFact, loading } = this.state;
    return funFact ? <Wrapper>{funFact}</Wrapper> : null;
  }
}

export default FunFacts;
