import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { defineMessages, useIntl } from 'react-intl';
import { Map, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'volto-venue/components/OSMMap/MarkerClusterGroup';

// eslint-disable-next-line import/no-unresolved
import icon from 'volto-venue/components/OSMMap/images/marker-icon.png';
// eslint-disable-next-line import/no-unresolved
import iconShadow from 'volto-venue/components/OSMMap/images/marker-shadow.png';

/* Styles */
import 'volto-venue/components/OSMMap/OSMMap.css';
// eslint-disable-next-line import/no-unresolved
import 'volto-venue/components/OSMMap/leaflet.css';

const messages = defineMessages({
  attribution: {
    id: 'osmmap copyright contributors',
    defaultMessage:
      '<span class="attribution"><a href="http://osm.org/copyright">OpenStreetMap</a> &copy; contributors</span>',
  },
});

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12.5, 20.5],
  shadowAnchor: [12.5, 20.5],
});

L.Marker.prototype.options.icon = DefaultIcon;

const OSMMap = ({
  center,
  markers = [],
  draggable = false,
  onMarkerDragEnd = () => {},
  zoom = 15,
  showTooltip = false,
  showPopup = false,
  cluster = false,
  mapOptions = {},
}) => {
  const intl = useIntl();
  const bounds = L.latLngBounds(
    markers.map((marker) => [marker.latitude, marker.longitude]),
  );

  const renderMarkers = (
    <>
      {markers.map((position, i) => (
        <Marker
          key={`${position.latitude}${position.longitude}${i}`}
          position={[position.latitude, position.longitude]}
          draggable={draggable}
          onDragend={onMarkerDragEnd}
          onClick={position.onMarkerClick}
          onKeyDown={(event) => {
            if (event.originalEvent.key === 'Enter') {
              position.onMarkerClick();
            }
          }}
          icon={position.divIcon ? L.divIcon(position.divIcon) : DefaultIcon}
          aria-label={position.title}
        >
          {showTooltip && position.title && (
            <Tooltip
              offset={[0, -22]}
              direction="top"
              aria-label={position.title}
            >
              {position.title}
            </Tooltip>
          )}
          {showPopup && position.popupContent && (
            <Popup
              offset={[0, -22]}
              direction="top"
              aria-label={position.title}
            >
              {position.popupContent}
            </Popup>
          )}
        </Marker>
      ))}
    </>
  );

  return (
    <React.Fragment>
      <Map
        center={center ?? [markers[0].latitude, markers[0].longitude]}
        zoom={zoom}
        id="geocoded-result"
        bounds={bounds}
        {...mapOptions}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={intl.formatMessage(messages.attribution)}
        />
        {cluster ? (
          <MarkerClusterGroup>{renderMarkers}</MarkerClusterGroup>
        ) : (
          renderMarkers
        )}
      </Map>
    </React.Fragment>
  );
};

OSMMap.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  ),
  zoom: PropTypes.number,
  onMarkerDragEnd: PropTypes.func,
  draggable: PropTypes.bool,
  showTooltip: PropTypes.bool,
  mapOptions: PropTypes.object,
};

export default React.memo(OSMMap);
