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
    color: #9b9b9b;
  }
`;

const Wrapper = styled.main`
  background-color: #fff2f0;
  display: grid;
  // flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100vh;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(3, minmax(100vh, auto));
  grid-template-areas: 'header activeSection';
`;
const Header = styled.header`
  background-color: #e5e5e5;
  color: #9b9b9b;
  grid-area: header;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-weight: 400;
    text-transform: uppercase;
  }
`;
const ActiveSection = styled.div`
  grid-area: activeSection;
  background-color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
        <Header>
          <h1>Epochalypse Now</h1>
        </Header>
        <ActiveSection>
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
        </ActiveSection>
      </Wrapper>
    );
  }
}

export const AppComponent = App;
export default translate()(App);
