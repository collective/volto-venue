import React from 'react';
import loadable from '@loadable/component';

export const GeoLocationWidget = loadable(
  () => import('./Widgets/GeoLocationWidget/GeoLocationWidget'),
  { fallback: <div>Loading...</div> },
);

export const OSMMap = loadable(() => import('./OSMMap/OSMMap'), {
  fallback: <div>Loading...</div>,
});
