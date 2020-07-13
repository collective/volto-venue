import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './OSMMap.css';

/**
 * TODO:
 * aggiungere il <link> agli stili di leaflet con helmet
 */

const OSMMap = ({ position, zoom = 15 }) => (
  <Map center={position} zoom={zoom} id="geocoded-result">
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* TODO: gestione drag n drop con callback onMarkerDragEnd
     * ({ latitude, longitude }) => {}
     */}
    <Marker position={position} />
  </Map>
);

OSMMap.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number), // [lat, lng]
  zoom: PropTypes.number,
  onMarkerDragEnd: PropTypes.func,
};

export default React.memo(OSMMap);
