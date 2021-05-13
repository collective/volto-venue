import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';
import MarkerClusterGroup from './MarkerClusterGroup';
import { Helmet } from '@plone/volto/helpers';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import './OSMMap.css';

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
}) => {
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
          icon={position.divIcon ? L.divIcon(position.divIcon) : DefaultIcon}
        >
          {showTooltip && position.title && (
            <Tooltip offset={[0, -22]} direction="top">
              {position.title}
            </Tooltip>
          )}
          {showPopup && position.popupContent && (
            <Popup offset={[0, -22]} direction="top">
              {position.popupContent}
            </Popup>
          )}
        </Marker>
      ))}
    </>
  );
  return (
    <React.Fragment>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />
      </Helmet>

      <Map
        center={center ?? [markers[0].latitude, markers[0].longitude]}
        zoom={zoom}
        id="geocoded-result"
        bounds={bounds}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
};

export default React.memo(OSMMap);
