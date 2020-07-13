import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Grid, Form } from 'semantic-ui-react';
import { settings } from '~/config';

import { OSMMap } from '../../../';

import './GeoLocationWidget.css';

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
     */
    const [geolocation, setGeolocation] = useState({
        latitude:
            value?.latitude ?? settings?.defaultVenueLocation?.latitude ?? 0,
        longitude:
            value?.longitude ?? settings?.defaultVenueLocation?.longitude ?? 0,
    });

    const doSearch = async () => {
        /**
         * TODO:
         * - get searchAddress from formData values
         */
        const searchAddress = 'via Listz 21, Roma';
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

    return (
        <Form.Field inline required={required} id={id}>
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column width="4">
                        <div className="wrapper">
                            <label htmlFor="geolocation-search">
                                {title ??
                                    intl.formatMessage(messages.geolocation)}
                            </label>
                        </div>
                    </Grid.Column>
                    <Grid.Column width="8" className="geolocation-widget">
                        {__CLIENT__ && (
                            <OSMMap
                                position={[geolocation.lat, geolocation.lng]}
                                onMarkerDragEnd={pos => setGeolocation(pos)}
                            />
                        )}
                        <div className="geolocation-selected-wrapper">
                            <Button
                                icon="trash"
                                size="mini"
                                title={intl.formatMessage(
                                    messages.geolocationClear,
                                )}
                                onClick={() => {
                                    onChange(id, null);
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
