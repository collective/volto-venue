import { GeoLocationWidget } from './components';

const applyConfig = (config) => {
  console.log('\n\nCONFIG VOLTO VENUE\n\n');
  config.widgets.id = {
    ...config.widgets.id,
    geolocation: GeoLocationWidget,
  };
};

export default applyConfig;
