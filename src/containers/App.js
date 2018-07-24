import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalize } from 'polished';
import styled, { injectGlobal } from 'styled-components';
import { translate } from 'react-i18next';

import TimestampToReadable from './TimestampToReadable/index';
import ReadableToTimestamp from './ReadableToTimestamp/index';
import Tabs from '../components/tabs/Tabs';
import Tab from '../components/tabs/Tab';

injectGlobal`
  ${normalize()}

  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.main`
  background-color: #fff2f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class App extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  };

  state = {
    activeSection: 'readableToTimestamp'
  };

  handleClick = section => {
    this.setState({ activeSection: section });
  };

  render() {
    const { t } = this.props;
    const { activeSection } = this.state;
    return (
      <Wrapper>
        <h1>Epochalypse Now!</h1>
        <Tabs>
          <Tab
            section="readableToTimestamp"
            onClick={this.handleClick}
            activeTab={activeSection}>
            {t('readableToTimestamp')}
          </Tab>
          <Tab
            section="timestampToReadable"
            onClick={this.handleClick}
            activeTab={activeSection}>
            {t('timestampToReadable')}
          </Tab>
        </Tabs>
        {activeSection === 'readableToTimestamp' ? (
          <ReadableToTimestamp />
        ) : null}
        {activeSection === 'timestampToReadable' ? (
          <TimestampToReadable />
        ) : null}
      </Wrapper>
    );
  }
}

export default translate()(App);
