import { GeoLocationWidget } from './components';

const applyConfig = config => {
  config.widgets.id = {
    ...config.widgets.id,
    geolocation: GeoLocationWidget,
  };

  return config;
};

export default applyConfig;
