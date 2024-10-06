---
title: Ideas for future components and enhancements
description: |
  Where might we go?
created: 2024-09-25 02:04:04
updated: 2024-10-04 16:28:11
---

## Possible future components

Note that some of these might not even be possible.

### `show-var` Version of uib-var

* Shows content from a JavaScript variable.
* Possibly allows dynamic overrides of attributes.
* Test with component version text.

### `light-switch` - on/off, level, colour. Location.

### `layout-area` - Switch between a few core layouts such as blog & dash
#### `area-*` - Define an area for a layout, e.g. `area-main`, `area-head`, `area-foot`, `area-sidebar` - all included in the parent component's package.

### `smart-list` - 2-way data controllable list wrapper

* Wraps around lists to easily add different entry formats including numbering (nested), icons, checkboxes, prefixes (e.g. dates)
* Dynamic property to store contents - ideally 2-way
* Multiple ways to update content: DOM changes, custom event, proxied property. For uibuilder: auto-topic updates
* Optionally drag/drop to re-order with data property updated
* Optionally content editable - double-click on icon, prefix and text to edit
* Optional checkbox with data store
* UIBUILDER data enabled. Controllable updates back to Node-RED (e.g. when no longer visible or immediate)

### `smart-table` - Like smart-list

* Build from data
* Optional columns data - if not provided, auto-build from content
* Save altered data
* Custom event on changed data

### `smart-report` - Like collapsible-headings but also data controllable

* Wraps around a collection of `<hx>` and `<p>`/`<div>`/`<img>` tags adding smarter formatting and control
* Optional collapsible headings
* Optional numbered headings (including nested numbers), format controllable
* Dynamic property to store contents - ideally 2-way
* Multiple ways to update content: DOM changes, custom event, proxied property. For uibuilder: auto-topic updates
* *Maybe - Optional drag/drop re-oder*
* *Maybe - double-click to content edit*

### `linear-gauge`

* horizontal/vertical
* Segmented (led style) or smooth
* Multiple colour segments
* Optional current value with positioning

Refs: [1](https://discourse.nodered.org/t/gauges-for-dashboard-2-0-made-with-ui-template/85955), Discourse vert indicators.

### `standard-footer` or extend `page-meta` - (c), date (range), author, version and other metadata

### `h1-title` - Use the page's title tag as the `<h1>`

Maybe with optional sub-title. Also option to use different string instead.

### `image-meta` - access to image exif metadata

* [exiftool-vendored](https://github.com/photostructure/exiftool-vendored.js)

## Thoughts

* Any way to have a component that is able to get meta-data from another component. Eg version, docs, etc?

* Article with heading should be collapsible

* Each component could have a getter to output their own TODO lists!

## To Do

* Documentation
  * call-out
