import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Helmet } from '@plone/volto/helpers';
import './OSMMap.css';

const OSMMap = ({
  position,
  onMarkerDragEnd = () => {},
  draggable = false,
  zoom = 15,
}) => (
  <React.Fragment>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossOrigin=""
      />
    </Helmet>
    <Map center={position} zoom={zoom} id="geocoded-result">
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        draggable={draggable}
        onDragend={onMarkerDragEnd}
      />
    </Map>
  </React.Fragment>
);

OSMMap.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number), // [lat, lng]
  zoom: PropTypes.number,
  onMarkerDragEnd: PropTypes.func,
  draggable: PropTypes.bool,
};

export default React.memo(OSMMap);
