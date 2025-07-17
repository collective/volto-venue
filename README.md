# volto-venue

An addon for [Volto](https://github.com/plone/volto) as a frontend for [collective.venue](https://github.com/collective/collective.venue).

To be used with ``mrs-developer``, see [Volto docs](https://6.docs.plone.org/volto/development/add-ons/install-an-add-on-dev-18.html#configure-mrs-developer) for further usage information. The following is an example configuration:

```json
  "volto-venue": {
    "output": "./packages/",
    "package": "volto-venue",
    "url": "git@github.com:collective/volto-venue.git",
    "https": "https://github.com/collective/volto-venue.git",
    "branch": "master"
  }
```

## Installation

Add the name of your add-on in the file ``package.json`` in the section dependencies. This example adds ``volto-venue``.

```json
  "addons": [
    ...
    "volto-venue"
    ...
  ],

```

## Usage
>
> If you're using Volto < 16, then use [v3.2.0](https://github.com/collective/volto-venue/tree/v3.2.0)

> If you're using Volto < 12, then use [v2.0.1](https://github.com/collective/volto-venue/tree/v2.0.1)

You can use this in combination with [collective.venue](https://github.com/collective/collective.venue) backend add-on
and it will work out of the box, otherwise you can define a field called `geolocation` or add the `GeoLocationWidget` on a custom field.

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

## License

The project is licensed under the MIT license.
