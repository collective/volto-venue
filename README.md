# volto-venue

An addon for [Volto](https://github.com/plone/volto) as a frontend for collective.venue

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.


## Usage

You can use this in combination with `collective.venue` and it will work out of the box, otherwise you can define a field called `geolocation` or add the geolocation widget on a custom field.

```js
import { GeoLocationWidget } from 'volto-venue';

config.widgets.id = {
  ...config.widgets.id,
  geolocation: GeoLocationWidget,
};
```

### Screenshot

![screenshot volto-venue](docs/screenshot.png)
