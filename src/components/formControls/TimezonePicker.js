import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment-timezone';

import Map from '../Map';

const getSortedTimezones = () => {
  const timezones = moment.tz.names();
  return timezones
    .map(zone => {
      const offset = moment.tz(zone).format('Z');
      return {
        name: zone,
        label: `(GMT ${offset}) ${zone}`.replace(/_/g, ' '),
        offset: offset
      };
    })
    .sort((a, b) => {
      return (
        parseInt(a.offset.replace(':', ''), 10) -
        parseInt(b.offset.replace(':', ''), 10)
      );
    });
};

const Wrapper = styled.div`
  display: flex;
`;

const timezones = getSortedTimezones();

let tzLookup = null;
let tzLookupImporter = null;

const getTimezoneFromMapEvent = mapEvent => {
  if (!tzLookup || !mapEvent) {
    return;
  }
  return tzLookup(mapEvent.latLng.lat(), mapEvent.latLng.lng());
};

class TimezonePicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string
  };

  state = {
    mapOpen: false
  };

  handleMapBtnClick = () => {
    this.setState({
      mapOpen: true
    });
    if (!tzLookupImporter) {
      // Preload the tz-lookup library
      tzLookupImporter = import(/* webpackChunkName: "tz-lookup" */ 'tz-lookup').then(
        tzLookupModule => {
          tzLookup = tzLookupModule.default;
        }
      );
    }
  };

  handleMapDialogClose = () => {
    this.setState({
      mapOpen: false
    });
  };

  getSelectElement = options => {
    const { name, value, onChange, label = 'Timezone' } = this.props;
    return (
      <FormControl>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
          native
          value={value}
          onChange={onChange}
          inputProps={{
            name: name,
            id: name
          }}>
          {options}
        </Select>
      </FormControl>
    );
  };

  handleMapMouseMove = mapEvent => {
    const timezone = getTimezoneFromMapEvent(mapEvent);
  };

  handleMapClick = mapEvent => {
    const { name, onChange } = this.props;
    const timezone = getTimezoneFromMapEvent(mapEvent);
    if (timezone) {
      onChange({
        target: {
          name,
          value: timezone
        }
      });
    }
    console.log(timezone);
  };

  render() {
    const { mapOpen } = this.state;
    const timezoneOptions = timezones.map(zone => {
      return (
        <option value={zone.name} key={zone.name}>
          {zone.label}
        </option>
      );
    });
    const SelectElement = this.getSelectElement(timezoneOptions);
    const DialogSelectElement = this.getSelectElement(timezoneOptions);
    return (
      <Wrapper>
        {SelectElement}
        <IconButton onClick={this.handleMapBtnClick}>
          <MapIcon />
        </IconButton>
        <Dialog
          open={mapOpen}
          onClose={this.handleClose}
          aria-labelledby="timezone-dialog-title"
          fullWidth
          maxWidth="md">
          <DialogTitle id="timezone-dialog-title">
            Select a Timezone
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select your location on the map below
            </DialogContentText>
            {DialogSelectElement}
            <Map
              onMouseMove={this.handleMapMouseMove}
              onClick={this.handleMapClick}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleMapDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Wrapper>
    );
  }
}

export default TimezonePicker;
