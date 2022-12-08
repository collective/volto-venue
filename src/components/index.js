import React from 'react';
import loadable from '@loadable/component';

export const GeoLocationWidget = loadable(
  () =>
    import(
      'volto-venue/components/Widgets/GeoLocationWidget/GeoLocationWidget'
    ),
  { fallback: <div>Loading...</div> },
);

export const OSMMap = loadable(
  () => import('volto-venue/components/OSMMap/OSMMap'),
  {
    fallback: <div>Loading...</div>,
  },
);
