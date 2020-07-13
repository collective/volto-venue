import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Grid, Form } from 'semantic-ui-react';
import { settings } from '~/config';

import { OSMMap } from '../../../';

import './GeoLocationWidget.css';

/* TODO i18n */
const messages = defineMessages({
  geolocation: {
    id: 'geolocation',
    defaultMessage: 'Geolocation',
  },
  geolocationPlaceholder: {
    id: 'geolocation_placeholder',
    defaultMessage: 'Search a venue...',
  },
  geolocationSelected: {
    id: 'geolocation_selected',
    defaultMessage: 'Selected',
  },
  geolocationClear: {
    id: 'geolocationClear',
    defaultMessage: 'Clear',
  },
  searchOnMap: {
    id: 'searchOnMap',
    defaultMessage: 'Search address on map',
  },
});

const GeoLocationWidget = ({
  value,
  id,
  onChange,
  required,
  title,
  description,
  formData,
}) => {
  const intl = useIntl();
  /**
   * TODO:
   * verificare che non esista un defaultValue
   * CAMBIARE DA QUELLO DEI SETTINGS? COME LO PRENDIAMO?
   */
  const [geolocation, setGeolocation] = useState({
    latitude: value?.latitude ?? settings?.defaultVenueLocation?.latitude ?? 0,
    longitude:
      value?.longitude ?? settings?.defaultVenueLocation?.longitude ?? 0,
  });
  console.log(formData);

  const doSearch = async () => {
    // According to the api reference, let's try to use format like
    // "380 New York St, Redlands, CA 92373"
    // const searchAddress = 'via Nino Bixio 4, Ferrara';
    const searchAddress = [
      formData?.street,
      formData?.city,
      formData?.country,
      formData?.zip_code,
    ]
      .filter(Boolean)
      .join(', ');
    // console.log('searching for: ' + searchAddress);
    try {
      const response = await fetch(
        `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${searchAddress}&outFields=Match_addr,Addr_type`,
      );
      const data = await response.json();
      const result = data?.candidates[0];
      setGeolocation({
        latitude: result.location.y,
        longitude: result.location.x,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onChange(id, geolocation);
  }, [geolocation]);

  const onDragend = (params) => {
    setGeolocation({
      latitude: params.target._latlng.lat,
      longitude: params.target._latlng.lng,
    });
  };

  return (
    <Form.Field inline required={required} id={id}>
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor="geolocation-search">
                {title ?? intl.formatMessage(messages.geolocation)}
              </label>
            </div>
          </Grid.Column>
          <Grid.Column width="8" className="geolocation-widget">
            <Button
              onClick={doSearch}
              type="button"
              disabled={
                formData.country ||
                formData.city ||
                formData.zip_code ||
                formData.street
                  ? false
                  : true
              }
            >
              {intl.formatMessage(messages.searchOnMap)}
            </Button>
            {__CLIENT__ && (
              <OSMMap
                position={[geolocation.latitude, geolocation.longitude]}
                onMarkerDragEnd={onDragend}
              />
            )}
            <div className="geolocation-selected-wrapper">
              {/* TODO: da pensarci/graficare ASK SERENA / IRENE */}
              <span className="geolocation-selected">
                <small>
                  {`${intl.formatMessage(messages.geolocationSelected)}: `}
                </small>
                Latitude {geolocation.latitude}, Longitude:{' '}
                {geolocation.longitude}
              </span>
              <Button
                type="button"
                icon="trash"
                size="mini"
                title={intl.formatMessage(messages.geolocationClear)}
                onClick={() => {
                  setGeolocation({
                    latitude: 0.0,
                    longitude: 0.0,
                  });
                }}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">{description}</p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
  );
};

export default GeoLocationWidget;
