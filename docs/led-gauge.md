---
title: led-gauge
description: |
  A Zero dependency web component that displays a horizontal gauge with an LED-like appearance.
created: 2025-01-09 10:44:17
updated: 2025-01-11 16:47:41
---

> [!NOTE]
> STATUS: Live. Ready for extended use. [Demo](https://wc.totallyinformation.net/tests/led-gauge).

## Useage

```html
<led-gauge segments="10" min="0" max="100" unit="%" value="20">Gauge label</led-gauge>
```

## Attributes & Properties

### Attributes

All of the attributes are optional.

* `hide-segment-labels` - If present, hides the segment labels (`hideSegmentLabels` when used as a property).
* `inherit-style` - Load external styles into component. If present but empty, will default to './index.css'. Optionally give a URL to load.
* `max` - The maximum value. Default `100`.
* `min` - The minimum value. Default `0`.
* `name` - HTML name attribute. Included in output _meta prop.
* `segments` - The number of segments to display. Default `10`.
* `unit` - The unit of measure. Default `%`.
* `value` - The current value to be displayed. Default `0`.

### Properties

Each attribute has a corresponding property. You can set the property directly in JavaScript or by using the `setAttribute` method. Note that setting the property will not change the attribute

* {number} `value` The current value of the gauge. #value is the private equivalent property. (Default=0)
* {boolean} `hideSegmentLabels` If true, hide the segment labels. (hide-segment-labels attribute, default=false)
* {number} `segments` The number of segments in the gauge. #segments is the private equivalent property. (Default=10)
* {number} `min` The minimum value of the gauge. (Default=0)
* {number} `max` The maximum value of the gauge. (Default=100)
* {string} `unit` The unit of the gauge value. (Default="%")
* {string[]} `colours` The color of each segment in the gauge. (Default={})
* {HTMLElement} `segContainerEl` The container for the gauge segments.
* {HTMLElement} `valsContainerEl` The container for the segment values.
* {HTMLElement} `valueEl` The container for the gauge value.
* {HTMLCollection} `segmentElements` The collection of the segment div elements.

* Properties inherited from the `BaseComponent`:

  * {number} `_iCount` Static. The count of instances of this component that weren't given an id. Creates a unique id as needed.
  * {boolean} `uib` True if UIBUILDER for Node-RED is loaded. (Default=FALSE)
  * {object} `uibuilder` Reference to loaded UIBUILDER for Node-RED client library if loaded (else undefined).
  * {function(string): Element} `$` jQuery-like shadow dom selector (or undefined if shadow dom not used).
  * {function(string): NodeList} `$$`  jQuery-like shadow dom multi-selector (or undefined if shadow dom not used).
  * {boolean} `connected` False until connectedCallback finishes.
  * {string} `name` Placeholder for the optional name attribute.
  * {object} `opts` This components controllable options - get/set using the `config()` method - empty object by default.
  * {string} `baseVersion` Static. The base component version string (date updated).

* Other standard properties:

  * `{string} componentVersion` Static. The component version string (date updated). Also has a getter that returns component and base version strings.

> [!NOTE]
> Static properties have to be accessed via the component's classname. e.g. `LedGauge.componentVersion`

## Slots

The default component slot is used for the gauge's *label*. Leave the tag content empty if you don't want a label. e.g. With label: `<led-gauge>My Gauge</led-gauge>`, without label: `<led-gauge></led-gauge>`.

## Styling

The LED gauge uses a default colour hue of **green** (hue = 120). The saturation and luminosity is standard for all LED segments so as to get an on/off appearance. You can override the default hue using the `--hue` CSS variable. On and off luminosity and saturation levels can also be set using CSS variables but are always the same for all segments.

### Segment Colours

You can use the `colors` component object property to set different colour hues based on value.

> [!TIP]
> Because the `colors` object is key'd on gauge `value`, not on segment number, if you dynamically change the number of segments, you will still retain the correct colouring.
>
> The `hue` value runs from 0 to 360. 0 and 360 are both red, 120 is green, 240 is blue. Use an `hsl` colour wheel to find the hue you want.

```js
const myGauge = document.querySelector('led-gauge')
myGauge.colors = {
  // default (green) from 0-60
  60: 40, // orange from 60-80
  80: 0, // red from 80-100
}
```

Note that the `colors` property is an object even though it uses numeric keys. This is because the keys are actually the start of the range for the colour. The value is the hue value.

By default, all of the segments are coloured green. You can override this by setting the `--hue` CSS variable. e.g. `<led-gauge style="--hue: 120;"></led-gauge>` for blue.

If you really want to, you can also change the style of each segment separately. The `segmentElements` property is an array of the segment elements.

```js
// Get a reference to the component instance
const myGauge = document.querySelector('led-gauge')
// Set the colour of the first segment to blue
myGauge.segmentElements[0].style.setProperty('--hue', 240)
```

### Inheriting Styles

This component uses the Shadow DOM to encapsulate its styles. This means that the component will not inherit styles from the main document. However, you can still style the component using [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). You can also use the `inherit-styles` attribute to allow the component to inherit styles from a style link (usually the same as the main page's style sheet).

### CSS Variables

The following CSS variables are available for styling:

* `--gauge-background-color`: The background colour of the whole gauge. *Default `--surface2` or `inherit`.*
* `--hue`: The default colour of the LED segments. 0 (or 360) = red, 120 = green, 240 = blue. *Default `0`.*
* `--label-color`: Colour for all label text. *Default `--value-color`.*
* `--off-lum`: Luminosity level when the segment is OFF. *Default `25%`.*
* `--off-sat`: Saturation level when the segment is OFF. *Default `20%`.*
* `--on-lum`: Colour luminosity level when the segment is ON. *Default `45%`.*
* `--on-sat`: Colour saturation level when the LED segment is turned ON. *Default `100%`.*
* `--segment-gap`: Gap between each segment. *Default `0.3rem`.*
* `--value-color`: The text colour for the numeric value display. *Default `--text2` or `inherit`.*
* `--value-justification`: Position control over the value output. May be any valid value of the `justify-self` CSS Grid property. *Default `end`.*

* `--gauge-layout`: The gauge uses CSS grid, this defines the layout. You can simply remove or change parts of the layout as needed. 

    *Default grid layout*
    ``` 
    "label value"
    "segments segments"
    "segvals segvals";
    ```

## Events

* `led-gauge:value-changed` - When the value changes. `evt.details.data` contains the new value.

  > [!NOTE]
  > If using this component with UIBUILDER for Node-RED, the value-changed event also sends a message back to Node-RED in the form:
  > ```json
  > {
  >   "topic": "led-gauge:value-changed",
  >   "payload": {
  >     "value": ..., "oldValue": ...
  >   },
  >   "id": <html id>, "name": <html name>
  > }
  > ```

* `led-gauge:segment-click` - When a segment is clicked. `evt.details.data` contains the details of the segment & current value.

  > [!NOTE]
  > If using this component with UIBUILDER for Node-RED, the segment-click event also sends a message back to Node-RED in the form:
  > ```json
  > {
  >   "topic": "led-gauge:segment-click",
  >   "payload": {
  >      "gaugeValue": ...,
  >      "segment": ..., // Segment number
  >      "segmentValue": ..., // Start value of the segment
  >    }
  >    "id": <html id>, "name": <html name>
  > }
  > ```

The standard events for this library of components are also available:

* `led-gauge:connected` - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
* `led-gauge:ready` - Alias for connected. The instance can handle property & attribute changes
* `led-gauge:disconnected` - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
* `led-gauge:attribChanged` - When a watched attribute changes. `evt.details.data` contains the details of the change.

NOTE that event listeners can be attached either to the `document` or to the specific element instance. Use `document.addEventListener` if your web app might be adding new instances of the component dynamically.

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

These methods can be used from JavaScript by first getting a reference to the appropriate element instance. As shown in the examples.

### Utility

* `uibSend(evtName, data)` - If using this component with UIBUILDER for Node-RED, this method will send a message back to Node-RED.
  
  `evtName` is added to `let-gauge:` as the `msg.topic`.
  
  `data` is sent as the `msg.payload`. It can take any serialisable data.

### Standard methods

`LedGauge.version()` will return a string containing both the component version and the base class version.

## Extensions for UIBUILDER for Node-RED

### Browser to Node-RED

As mentioned above, when used with uibuilder, value-changed and segment-click events are sent back to Node-RED using msg.topic settings of `led-gauge:value-changed` and `led-gauge:segment-click`. The payload contains the new value and the segment details respectively. The id and name properties are also sent back.

### Node-RED to Browser

You can send messages to the component from Node-RED via the `uibuilder` node. The `msg.topic` should be set to the `led-gauge::<htmlid>` (note the double `:`). Where `<htmlid>` is the HTML ID of the component instance. If you have not set an id manually, the component automatically creates one for you in the format `led-gauge-<number>` where number is derived from a count of the components on the page (counting from top to bottom).

The `msg.payload` should be an object containing the component properties you want to change.

#### Examples

```json
{
  "topic": "led-gauge-1",
  "payload": {
    "value": 50
  }
}
```

or

```json
{
  "topic": "led-gauge-1",
  "payload": {
    "colors": {
      "60": 40,
      "80": 0
    }
  }
}
```

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
* [x] Set colours for each segment - ideally grouped.
* [x] Option to display the current value and/or the unit string.
* [x] Colour segments property (array): Allows setting each segment to a defined colour.
* UIBUILDER for Node-RED integration
  * [x] Send value changes back to Node-RED
  * [x] Click handler sends back to Node-RED
  * [x] Direct update from UIBUILDER for Node-RED via msg.topic = html id and msg.payload = value

## Nice-to-have features

Possibly in future versions.

* [ ] Logarithmic scale option
* [ ] Horizontal/vertical layout option - using one of CSS grid or flex (whichever is best for the component)
* [ ] Label position attribute - left/right/above/below - defaults to above. Allow HTML in the label.
* [ ] Option to show value/unit before or after any label text.
* [ ] Maybe allow non-linear gauges?

## Design References

* [1](https://discourse.nodered.org/t/gauges-for-dashboard-2-0-made-with-ui-template/85955)
* [2](https://discourse.nodered.org/t/led-bar-graph-display-template-conversion-to-dashboard2-0/94463)
