import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';

import { googleMapsAPIKey } from '../Constants';

class Map extends Component {
  static propTypes = {};

  render() {
    return (
      <GoogleMap
        defaultZoom={2}
        defaultCenter={{ lat: 20, lng: 0 }}
        {...this.props}
      />
    );
  }
}

export const MapComponent = Map;

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?libraries=geometry&key=${googleMapsAPIKey}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: '300px', width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Map);
