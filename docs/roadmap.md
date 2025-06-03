---
title: Totally Information web-components Roadmap
description: >
  This page outlines the future direction of the components. Including specific things that will almost certainly happen as well as more speculative ideas.
created: 2022-04-08 17:12:11
lastUpdated: 2025-06-03 09:56:55
---

## Next

* data-list
  *  [x] Allow nested lists
  *  [ ] Allow lists to have tickbox inputs instead of bullets (or allow both - esp. for numbered lists). (un)tick action sends a message to uibuilder and outputs a custom event.

## Other thoughts

* Expand _uibMsgHandler to allow for msg.payload.attributes. Use a uibuilder fn instead of a local one.

* Use a packaged version of uib-brand.css instead of the one in the `dist` folder.

* Allow an option on base to listen for specific events - only with uibuilder, send the events to Node-RED.

* Some way to create a visual layout based on an input JSON. With a way to dynamically change the layout. The idea being to enable an entire page to be laid out using configuration instead of code with input msgs/events allowing real-time changes.

* Any way to have a component that is able to get meta-data from another component. Eg version, docs, etc?

* Article elements with headings should be collapsible

* Move `const template` to static var for all components.

* Each component could have a getter to output their own TODO lists!

* https://github.com/microsoft/vscode-custom-data

* Extended input. Refs: [1](https://stackoverflow.com/questions/25495849/can-a-custom-element-extend-an-input-element), [2](https://elements-x.com/?path=/docs/getting-started--docs), [3](https://medium.com/@andresander/extending-html-inputs-in-a-framework-agnostic-way-with-web-components-9227532b6139), [4](https://blog.revillweb.com/extending-native-dom-elements-with-web-components-233350c8e86a).

* Ideas from [elements-x](https://elements-x.com/?path=/docs/getting-started--docs)


## Components started but not yet ready for use

See also the [Home](/) page.

| Name            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `chart-frappe`  | Frappe Charts. Basic display works |
| `nav-bar`       | Top navbar menu |
| `gauge-steel`   | Steelseries gauges |

## On-hold

These were started but, for some reason, usually time and/or complexity, I don't currently have the resources to continue or they have slipped down the priority list.

See the `not-complete` folder.

| Name            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `chart-*`       | On-hold due to poor options for ECMA module chart libraries. Including Apex, ChartJS, Plotly, HiCharts. Various different chart outputs using different libraries. Chart.js, Uplot, EChart |
| `simple-tree`   | On-hold due to complexity |

## Wanted

| Name            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `data-card`     | A data-driven card with headers, footers, etc. Also acts as a container for other HTML as part of a grid view. A more complex version of `simple-card` |
| `data-table`    | Similar to `simple-table` but with more options such as nested tables and multiple headers/bodies. Probably also with CRUD controls. Search, col groups. |
| `grid-view`     | A controllable grid layout.                                  |
| `multi-select`  | https://web.dev/building-a-multi-select-component/ |
| `on-off`        | A dedicated on/off button.    |
| `progress-bar`  | https://web.dev/building-a-loading-bar-component/ |
| `rag-list`      | A list with a RAG status icon for each entry |
| `simple-button` | A button that triggers a custom document event and sends to uibuilder (if available). Automatically includes attrib and prop data, id, name, etc. Includes basic formatting and a slot for text (which allows some HMTL formatting). |
| `simple-dialog` | Simple wrapper for a [dialog box](https://www.tutorialrepublic.com/codelab.php?topic=html5&file=dialog-tag) with options for modal, button list |
| `simple-gauge`  | Maybe using gauge.js? Or possibly [pure-knob](https://github.com/andrepxx/pure-knob) |
| `simple-input`  | A text input tag with a label. With option to be part of a form (button submission) or to give output on lost focus. May need multiple to deal with different input types |
| `simple-map`    | See Dave's WorldMap Dashboard node for inspiration! |
| `simple-pie`    | https://dev.to/dannyengelman/web-components-using-unknownhtmlelements-for-better-semantic-html-5d8c |
| `simple-router` | https://www.google.com/search?q=web+component+router&oq=web+component+router |
| `simple-slider` | |
| `simple-switch` | https://web.dev/building-a-switch-component/ |
| `simple-table`  | Takes a JSON or JavaScript object or array and displays the contents in a simple table format. |
| `switch-list    | https://web.dev/building-a-switch-component/ |
| `toast-msg`     | |
| `visual-log`    | Creates a log element on-page that expands to a set number of lines then drops from the start |
| status          | List view with colour indication of status (e.g. on/off or RAG) |
| checklist       | List view with checkboxes (for multi input) or radio buttons (for single selection) |

## Possible future components

Note that some of these might not even be possible.

### `button-group` - A group of buttons

### `count-down` - A visual and/or audible countdown timer

* Visual and audible options.
* Length of time to count down. Number with options for hours, minutes, seconds. (Days?)
* Option to Auto-start after previous time-er ends.
* Visuals: Circular or linear countdown display.
* Audible: Beep, chime, etc.
* Optional pause, stop, reset buttons.
* Optional start time.

### `editable-list` - A list that can be edited in place

Updates the list data when the list is edited.

```html
<editable-list data="myData" type="unordered" prefix="date" checkbox></editable-list>
```

* `data` - The data that the list is based on
* `type` - The type of list, e.g. ordered, unordered
* `prefix` - The prefix to use for each item
* `checkbox` - Whether to include a checkbox for each item

If using uibuilder, updates will be returned to Node-RED.

### `for-next` - A looping component

```html
<for-next from="1" to="10" step="1">
  <p>Count: <for-var></for-var></p>
</for-next>
```

```html
<ol><for-next input="myvar" key="colId">
  <for-item><li><for-var col="colId"></for-var><li></for-item>
</for-next></ol>
```

### `h1-title` - Use the page's title tag as the `<h1>`

Maybe with optional sub-title. Also option to use different string instead.

### `image-meta` - access to image exif metadata

* [exiftool-vendored](https://github.com/photostructure/exiftool-vendored.js)
* [ref](https://jsdev.space/howto/javascript-exif-parser/)

### `layout-area` - Switch between a few core layouts such as blog & dash

#### `area-*` - Define an area for a layout, e.g. `area-main`, `area-head`, `area-foot`, `area-sidebar` - all included in the parent component's package.

### `light-switch` - on/off, level, colour. Location.

### `linear-gauge`

* horizontal/vertical layout option - using one of CSS grid or flex (whichever is best for the component)
* Segmented (led style, with LED's "lit" up to the current value) or smooth display (with pointer showing the current value)
* Max & Min limit options (defaulting to 0-100)
* Measure option: Default to %, text string used to indicate what the measure represents
* Optional label attribute + label position attribute - left/right/above/below - defaults to above
* Value attribute & property: defines the current value to be shown
* `segments` property: defines how many "ticks" - (max-min)/#ticks = the step value of each tick.
  * For LED style, show segment value beneath the display - where the color changes only. Have the segment value as a title attribute so it shows on hover.
  * For smooth style, 
  * Maybe allow override to facilitate non-linear gauges
* colour segments property: Allows setting each segment to a defined colour.
* Optional current value with positioning

Refs: [1](https://discourse.nodered.org/t/gauges-for-dashboard-2-0-made-with-ui-template/85955), Discourse vert indicators.

### `todo-list` - A managable list of TODO items or shopping list

[ref](https://discourse.nodered.org/t/convert-dashboard-shopping-list-to-v2/96553)

### `simple-timeline`

### `simple-gallery`

* A simple image gallery with optional captions and/or descriptions
* Requires a list of urls pointing to images that will be dynamically loaded
* Possible extensions
  * Use [exiftool-vendored](https://github.com/photostructure/exiftool-vendored.js) library to load metadata
  * Add automated image rotation when the gallary overflows
  * Dialog version option (rather than just inline)

[ref](https://discourse.nodered.org/t/created-image-gallery-using-the-template-node-in-dashboard-2/96601)
[ref 2](https://jsdev.space/howto/javascript-exif-parser/)

### `smart-list` - 2-way data controllable list wrapper

* Wraps around lists to easily add different entry formats including numbering (nested), icons, checkboxes, prefixes (e.g. dates)
* Dynamic property to store contents - ideally 2-way
* Multiple ways to update content: DOM changes, custom event, proxied property. For uibuilder: auto-topic updates
* Optionally drag/drop to re-order with data property updated
* Optionally content editable - double-click on icon, prefix and text to edit
* Optional checkbox with data store
* UIBUILDER data enabled. Controllable updates back to Node-RED (e.g. when no longer visible or immediate)

```html
<smart-list data="myData" type="ordered" prefix="date" checkbox>
  <smart-item><span>1</span> <span>Item 1</span></smart-item>
</smart-list>
```

### `smart-report` - Like collapsible-headings but also data controllable

* Wraps around a collection of `<hx>` and `<p>`/`<div>`/`<img>` tags adding smarter formatting and control
* Optional collapsible headings
* Optional numbered headings (including nested numbers), format controllable
* Dynamic property to store contents - ideally 2-way
* Multiple ways to update content: DOM changes, custom event, proxied property. For uibuilder: auto-topic updates
* *Maybe - Optional drag/drop re-oder*
* *Maybe - double-click to content edit*

### `standard-footer` or extend `page-meta` - (c), date (range), author, version and other metadata

### `tab-view` - A tabbed view

### Other ideas

* Steppper - step through a form
* Status tracker - show the status/steps of a process
* Data map - map data to a visual representation
* Data tree - show a tree of data
* Guitar Chord - show a guitar chord diagram [ref](https://dev.to/madsstoumann/guitar-chords-in-css-3hk8)
* Scheduler - show/edit a schedule of events [ref](https://discourse.nodered.org/t/announce-scheduler-node-for-dashboard-2-0/95076)

## Probably not

These are ideas that I don't think are worth the effort, are better done other ways, or that I probably would not have the time to implement.

### `show-var` Version of uib-var - probably not worth the effort

Better to simply update the innerText of a selected element.

* Shows content from a JavaScript variable.
* Possibly allows dynamic overrides of attributes.
* Test with component version text.

### `key-value-list` (or possibly `property-list`?) - A list of key/value pairs using various views

`data-list` and `data-table` (AKA `smart-table`) components are probably better suited to this purpose.

Views include:
* Table
* List
* Checkbox list
* Cards

