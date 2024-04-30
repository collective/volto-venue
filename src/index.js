import { GeoLocationWidget } from 'volto-venue/components';
import { OSMMap } from 'volto-venue/components';
export { GeoLocationWidget, OSMMap };

export default function applyConfig(config) {
  config.widgets.id = {
    ...config.widgets.id,
    geolocation: GeoLocationWidget,
  };

  config.widgets.views.id.geolocation = ({ value }) => (
    <OSMMap markers={[{ ...value, title: '' }]} />
  );

  return config;
}
