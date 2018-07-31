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
  align-items: center;
  height: 100vh;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header tabs'
    'header activeSection';
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
  position: relative;

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
`;
const Calculator = styled.div`
  grid-area: activeSection;
  background-color: white;
  height: 100%;
`;

const ActiveSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
        <Calculator>
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
