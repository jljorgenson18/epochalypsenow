import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { translate } from 'react-i18next';

import TimestampToReadable from './TimestampToReadable/index';
import ReadableToTimestamp from './ReadableToTimestamp/index';
import Tabs from '../components/tabs/Tabs';
import Tab from '../components/tabs/Tab';
import CurrentTimestamp from '../components/CurrentTimestamp';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    font-family: 'Roboto', sans-serif;
    color: #9b9b9b;
  }
`;

const Wrapper = styled.main`
  background-color: #fff2f0;
  display: grid;
  align-items: center;
  height: 100vh;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    '. tabs'
    '. activeSection';

  @media all and (max-width: 768px) {
    grid-template-areas:
      'hd hd'
      'tabs tabs'
      'activeSection activeSection';
    grid-template-rows: auto auto 1fr;
  }
`;

const Header = styled.header`
  background-color: #e5e5e5;
  color: #9b9b9b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  width: 50%;
  grid-area: hd;

  &::after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    right: -20px;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #e5e5e5;
  }

  h1 {
    font-weight: 400;
    text-transform: uppercase;
  }

  @media all and (max-width: 768px) {
    position: relative;
    width: 100%;

    &::after {
      position: absolute;
      content: '';
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      border-right: 20px solid transparent;
      border-top: 20px solid #e5e5e5;
      border-left: 20px solid transparent;
    }
  }
`;
const Calculator = styled.div`
  grid-area: activeSection;
  background-color: white;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const ActiveSection = styled.div``;

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
        <GlobalStyle />
        <Header>
          <h1>Epochalypse Now</h1>
          <CurrentTimestamp />
        </Header>
        <Calculator>
          <Tabs>
            <Tab
              section="readableToTimestamp"
              onClick={this.handleClick}
              activeTab={activeSection}>
              {t('Readable To Timestamp')}
            </Tab>
            <Tab
              section="timestampToReadable"
              onClick={this.handleClick}
              activeTab={activeSection}>
              {t('Timestamp To Readable')}
            </Tab>
          </Tabs>
          <ActiveSection>
            {activeSection === 'readableToTimestamp' ? (
              <ReadableToTimestamp />
            ) : null}
            {activeSection === 'timestampToReadable' ? (
              <TimestampToReadable />
            ) : null}
          </ActiveSection>
        </Calculator>
      </Wrapper>
    );
  }
}

export const AppComponent = App;
export default translate()(App);
