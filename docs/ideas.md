---
title: Ideas for future components and enhancements
description: |
  Where might we go?
created: 2024-09-25 02:04:04
updated: 2024-10-04 16:28:11
---

## In progress

### `led-gauge`

* horizontal/vertical layout option - using one of CSS grid or flex (whichever is best for the component)
* Segmented (led style, with LED's "lit" up to the current value)
* Max & Min limit options (defaulting to 0-100)
* Unit attribute: Default to `%`, text string used to indicate what the measure represents
* Optional label attribute + label position attribute - left/right/above/below - defaults to above. Allow HTML in the label.
  * Option to display the current value and/or the unit string. To appears inside the label. Option to show before or after any label text.
* Value attribute & property: defines the current value to be shown
* `segments` property: defines how many "ticks" - (max-min)/#ticks = the step value of each tick.
  * Show segment value beneath the display - where the color changes & min/max values only. Have the segment value as a title attribute so it shows on hover.
  * Maybe allow override (e.g. an array of tick definitions) to facilitate non-linear gauges.
* colour segments property (array): Allows setting each segment to a defined colour.
* Allow click handler for each display segment.
* Use CSS classes where possible. Use CSS Variables to allow overrides of key CSS properties.

Refs: [1](https://discourse.nodered.org/t/gauges-for-dashboard-2-0-made-with-ui-template/85955), Discourse vert indicators.
 [2](https://discourse.nodered.org/t/led-bar-graph-display-template-conversion-to-dashboard2-0/94463)



### `smart-table` - Like smart-list

* Build from data
* Optional columns data - if not provided, auto-build from content
* Save altered data
* Custom event on changed data

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

### `key-value-list` (or possibly `property-list`?) - A list of key/value pairs using various views

Views include:
* Table
* List
* Checkbox list
* Cards

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

## Thoughts

* Any way to have a component that is able to get meta-data from another component. Eg version, docs, etc?

* Article with heading should be collapsible

* Each component could have a getter to output their own TODO lists!

## To Do

* Documentation
  * call-out

## Probably not

### `show-var` Version of uib-var - probably not worth the effort

Better to simply update the innerText of a selected element.

* Shows content from a JavaScript variable.
* Possibly allows dynamic overrides of attributes.
* Test with component version text.

