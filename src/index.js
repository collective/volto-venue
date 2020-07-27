import { GeoLocationWidget } from './components';

export { OSMMap } from './components';
export { GeoLocationWidget };

export default config => {
  config.widgets.id = {
    ...config.widgets.id,
    geolocation: GeoLocationWidget,
  };

  return config;
};
