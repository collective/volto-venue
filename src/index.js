import { GeoLocationWidget } from 'volto-venue/components';
export { GeoLocationWidget };

export default config => {
  config.widgets.id = {
    ...config.widgets.id,
    geolocation: GeoLocationWidget,
  };

  return config;
};
