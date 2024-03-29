# volto-venue

An addon for [Volto](https://github.com/plone/volto) as a frontend for collective.venue

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.


## Usage

> If you're using Volto < 12, then use [v2.0.1](https://github.com/collective/volto-venue/tree/v2.0.1)
>
> If you're using Volto < 16, then use [v3.2.0](https://github.com/collective/volto-venue/tree/v3.2.0)

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


### GeolocationWidget

This widget allows to compile a form with an address data, or use the map to select a point using coordinates.


### OSMMap

This component shows a map from OpenStreetMap.
Accepts these props:

| Prop            | Type    | Default    | Description                                                                                  |
| --------------- | ------- | ---------- | -------------------------------------------------------------------------------------------- |
| center          | array   | markers[0] | Array containing `latitude` as the first element and `longitude` as the second one           |
| markers         | object  | `[]`       | Array of objects with the structure: `{ latitude: number, latitude: number, title: string }` |
| zoom            | number  | `15`       | Map zoom                                                                                     |
| onMarkerDragEnd | func    | `() => {}` | Callback to handle marker position change on the map                                         |
| draggable       | boolean | false      | Enables dragging the marker on the map                                                       |
| showTooltip     | boolean | false      | Shows a tooltip with the title on the marker                                                 |
| showPopup       | boolean | false      | Shows a popup on marker click. Content of popup will be passed in marker object in popupContent prop. |
| cluster         | boolean | false      | To show clusters on map if you have a lot of points.                                         |


