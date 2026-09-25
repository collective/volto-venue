import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { defineMessages, useIntl } from 'react-intl';
import {
  Map,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  ZoomControl,
} from 'react-leaflet';
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
  pinClick: {
    id: 'osmmap - pin click',
    defaultMessage: 'Click to view details',
  },
  zoomIn: {
    id: 'osmmap - zoom in',
    defaultMessage: 'Zoom in',
  },
  zoomOut: {
    id: 'osmmap - zoom out',
    defaultMessage: 'Zoom out',
  },
  mapLabel: {
    id: 'osmmap - map label',
    defaultMessage: 'Map',
  },
});

const defaultIconOptions = {
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12.5, 20.5],
  shadowAnchor: [12.5, 20.5],
};

let DefaultIcon = L.icon(defaultIconOptions);

/* a11y: a clickable marker is announced as a plain image, because Leaflet
   only sets tabindex on it (role="button" arrives with Leaflet 1.9) and the
   icon options don't accept extra attributes. Adding the role while the icon
   element is created also covers the markers built later on, on clustering
   and on zoom. */
const withButtonRole = (Base) =>
  Base.extend({
    createIcon(oldIcon) {
      const iconElement = Base.prototype.createIcon.call(this, oldIcon);
      iconElement.setAttribute('role', 'button');
      return iconElement;
    },
  });

const ButtonIcon = withButtonRole(L.Icon);
const ButtonDivIcon = withButtonRole(L.DivIcon);
const DefaultButtonIcon = new ButtonIcon(defaultIconOptions);

/* The role is set only where the marker really does something, to avoid
   announcing a button that can't be activated. */
const getMarkerIcon = (position, isInteractive) => {
  if (position.divIcon) {
    return isInteractive
      ? new ButtonDivIcon(position.divIcon)
      : L.divIcon(position.divIcon);
  }
  return isInteractive ? DefaultButtonIcon : DefaultIcon;
};

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
  ariaLabel,
  role = 'region',
}) => {
  const intl = useIntl();
  const mapRef = useRef(null);
  const bounds = L.latLngBounds(
    markers.map((marker) => [marker.latitude, marker.longitude]),
  );

  /* a11y: the map container is focusable (Leaflet sets tabindex="0" on it),
     so it needs a role and an accessible name. They can't be passed as props:
     react-leaflet only forwards className, id and style to the container,
     hence they are set on the Leaflet element itself. */
  useEffect(() => {
    const container = mapRef.current?.leafletElement?.getContainer();
    if (!container) return;

    container.setAttribute('role', role);
    container.setAttribute(
      'aria-label',
      ariaLabel || intl.formatMessage(messages.mapLabel),
    );
  }, [role, ariaLabel, intl]);

  const renderMarkers = (
    <>
      {markers.map((position, i) => {
        /* A marker is actionable when it has a click handler, but also when it
           just carries a popup: Leaflet opens that on activation. */
        const hasPopup = Boolean(showPopup && position.popupContent);
        const isInteractive =
          typeof position.onMarkerClick === 'function' || hasPopup;

        return (
          <Marker
            key={`${position.latitude}${position.longitude}${i}`}
            position={[position.latitude, position.longitude]}
            draggable={draggable}
            onDragend={onMarkerDragEnd}
            onClick={position.onMarkerClick}
            onKeyDown={(event) => {
              const key = event.originalEvent.key;
              /* a11y: a button is activated with both Enter and Space.
                 Leaflet only handles Enter, and Space would scroll the page. */
              if (key !== 'Enter' && key !== ' ') return;
              event.originalEvent.preventDefault();

              if (position.onMarkerClick) {
                position.onMarkerClick(event);
              } else if (event.target.getPopup?.()) {
                event.target.openPopup();
              }
            }}
            icon={getMarkerIcon(position, isInteractive)}
            alt={position.title + ' - ' + intl.formatMessage(messages.pinClick)}
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
        );
      })}
    </>
  );

  return (
    <React.Fragment>
      <Map
        ref={mapRef}
        center={center ?? [markers[0].latitude, markers[0].longitude]}
        zoom={zoom}
        zoomControl={false}
        id="geocoded-result"
        bounds={bounds}
        {...mapOptions}
      >
        <ZoomControl
          position="topleft"
          zoomInTitle={intl.formatMessage(messages.zoomIn)}
          zoomOutTitle={intl.formatMessage(messages.zoomOut)}
        />
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
  ariaLabel: PropTypes.string,
  role: PropTypes.string,
};

export default React.memo(OSMMap);
