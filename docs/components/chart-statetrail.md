---
title: state-trail
description: |
  A Zero dependency web component that displays a horizontal timeline of states.
created: 2024-12-14 16:51:03
updated: 2024-12-14 16:51:08
status: alpha # alpha, beta, live
---

## Useage

```html
<chart-statetrail></chart-statetrail>
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
 * @fires chart-statetrail:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires chart-statetrail:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires chart-statetrail:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires chart-statetrail:attribChanged - When a watched attribute changes. `evt.details.data` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.
 */
```

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

These methods can be used from JavaScript by first getting a reference to the appropriate element instance. As shown in the examples.

### Utility

### Standard methods

`ChartStatetrail.version` will return a string containing both the component version and the base class version.

## Extensions for UIBUILDER for Node-RED

None at this time.

## Original Requirements

* Optionally start with pre-defined data (web component custom property).
* Send new data (single entry or multiple) - If a new itemId is sent, add a new row. If an existing itemId is sent, add a new entry to that row.
* Data object - see below
  * Missing end timestamp = NOW - only allowed for last entry or new entry - must be updated automatically if the max timestamp changes
  * Missing start timestamp = last entry end or earliest entry or defined start.
* Options
    * caption (top/bottom/hidden) - hidden caption is still added to the DOM to act as a "described-by" for screen readers
    * retain (true/false) - retains the data in browser storage, auto-reloads on page refresh.
    * mapping object - see below - maps the value to a color and title
    * axis (top/bottom/both/none) - x-axis timeline
    * Max entries per row - optional - probably needs a sensible default - 1,000?
    * Max rows - optional
    * Rolling (duration) - optional - if set, automatically moves the min start timestamp to the max timestamp minus the duration
    * topic - optional - if set and if used with UIBUILDER, will create a data listener for the topic
* Trim excess entries automatically if max entries/rows reached.
* When a specific row gets a new entry, only re-render that row if the max timestamp doesn't change. But will also have to re-render al rows if the max timestamp does change.
* No external dependencies, pure HTML/CSS/JS. (No SVG either).
* Not dependent on Node-RED or UIBUILDER. But must have built-in support for UIBUILDER.
* Tooltip on hover - shows the Mapped title, value, start, and end timestamps.
* Click on a row will trigger a custom event. If used with UIBUILDER, will send the item data back to Node-RED.

### Data object

The input data

```json
[
    {
        "id": <itemId>,
        "value": <number>,
        "start": <ISO8601 Timestamp>,
        "end": <ISO8601 Timestamp>
    },
    ...
]
```
### ID mapping object

Allows a nice title to be displayed for each item. Optional.

```json
{
    <itemId>: <string>,
    ...
}
```

### Range mapping object

Maps an input value to a color and title. Required.

```json
[
    { "range": [<number>, <number>], "title": <string>, "color": <CSScolor> },
    ...
]
```

#### Default

```json
{
    [
        "range": [0, 0.3], "title": "Off", "color": "var(--failure, red)",
    ],
    [
        "range": [0.3, 0.6], "title": "Partial", "color": "var(--warning, #c8b421)",
    ],
    [
        "range": [0.6, 1], "title": "On", "color": "var(--success, green)",
    ],
}
```
