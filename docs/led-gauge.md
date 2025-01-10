---
title: led-gauge
description: |
  A Zero dependency web component that displays a horizontal or vertical gauge with an LED-like appearance.
created: 2025-01-09 10:44:17
updated: 2025-01-09 10:44:22
---

> [!NOTE]
> STATUS: Alpha. Experimental, still in early development. [Demo](https://wc.totallyinformation.net/tests/led-gauge).



## Useage

```html
<led-gauge></led-gauge>
```
```js

```

## Attributes & Properties

### Attributes

None

### Properties



## Slots



## Styling

### CSS Variables

## Events

The standard events for this library of components are available:

```js
/**
 * @fires led-gauge:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires led-gauge:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires led-gauge:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires led-gauge:attribChanged - When a watched attribute changes. `evt.details.data` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.
 */
```

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

These methods can be used from JavaScript by first getting a reference to the appropriate element instance. As shown in the examples.

### Utility

### Standard methods

`LedGauge.version` will return a string containing both the component version and the base class version.

## Extensions for UIBUILDER for Node-RED

None at this time.

## Original Requirements

* [x] Value attribute & property: defines the current value to be shown
* [x] Set the number of segments.
* [x] Segmented (led style, with LED's "lit" up to the current value)
* [x] Max & Min limit options (defaulting to 0-100)
* [x] Optional Unit attribute: Default to `%`, text string used to indicate what the measure represents
* [x] Optional label attribute
* [x] `segments` property: defines how many "ticks" - (max-min)/#ticks = the step value of each tick.
* [x] Show segment value beneath the display - where the color changes & min/max values only. Have the segment value as a title attribute so it shows on hover.
* [x] Allow click handler for each display segment.
* [x] Use CSS classes where possible. Use CSS Variables to allow overrides of key CSS properties.
* [ ] Set colours for each segment - ideally grouped.
* [ ] Horizontal/vertical layout option - using one of CSS grid or flex (whichever is best for the component)
* [ ] Label position attribute - left/right/above/below - defaults to above. Allow HTML in the label.
* [ ] Option to display the current value and/or the unit string. To appears inside the label. Option to show before or after any label text.
* [ ] Colour segments property (array): Allows setting each segment to a defined colour.

Refs: [1](https://discourse.nodered.org/t/gauges-for-dashboard-2-0-made-with-ui-template/85955), Discourse vert indicators.
 [2](https://discourse.nodered.org/t/led-bar-graph-display-template-conversion-to-dashboard2-0/94463)

## Nice-to-have features

* Logarithmic scale option
* UIBUILDER for Node-RED integration
  * [ ] Direct update from UIBUILDER for Node-RED via msg.topic = html id and msg.payload = value
  * [ ] Click handler sends back to Node-RED
* [ ] Maybe allow override (e.g. an array of tick definitions) to facilitate non-linear gauges.
