---
title: Totally Information web-components Roadmap
description: >
  This page outlines the future direction of the components. Including specific things that will almost certainly happen as well as more speculative ideas.
created: 2022-04-08 17:12:11
lastUpdated: 2022-05-09 19:49:19
---

## Components In Progress

Please see the main README file.

## Changes/Improvements to Existing Components

N/A

## Other Development

N/A

## Started

| Name            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `chart-frappe`  | Frappe Charts. Basic display works |
| `nav-bar`       | Top navbar menu |
| `gauge-steel`   | Steelseries gauges |

* New CSS
* New front-end library (ECMA module)
* A way to create a visual layout based on an input JSON. With a way to dynamically change the layout.

  The idea being to enable an entire page to be laid out using configuration instead of code with input msgs/events allowing real-time changes.


## On-hold

These were started but, for some reason, usually time and/or complexity, I don't currently have the resources to continue or they have slipped down the priority list.

See the `not-complete` folder.

| Name            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `chart-*`       | On-hold due to poor options for ECMA module chart libraries. Including Apex, ChartJS, Plotly, HiCharts. Various different chart outputs using different libraries. Chart.js, Uplot, EChart |
| `simple-tree` | On-hold due to complexity |

## Wanted

| Name            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `data-card`     | A data-driven card with headers, footers, etc. Also acts as a container for other HTML as part of a grid view. A more complex version of `simple-card` |
| `data-table`    | Similar to `simple-table` but with more options such as nested tables and multiple headers/bodies. Probably also with CRUD controls. |
| `grid-view`     | A controllable grid layout.                                  |
| `on-off`        | A dedicated on/off button.    |
| `simple-button` | A button that triggers a custom document event and sends to uibuilder (if available). Automatically includes attrib and prop data, id, name, etc. Includes basic formatting and a slot for text (which allows some HMTL formatting). |
| `simple-dialog` | Simple wrapper for a [dialog box](https://www.tutorialrepublic.com/codelab.php?topic=html5&file=dialog-tag) with options for modal, button list |
| `simple-gauge`  | Maybe using gauge.js? |
| `simple-input`  | A text input tag with a label. With option to be part of a form (button submission) or to give output on lost focus. May need multiple to deal with different input types |
| `simple-map`    | See Dave's WorldMap Dashboard node for inspiration! |
| `simple-pie`    | https://dev.to/dannyengelman/web-components-using-unknownhtmlelements-for-better-semantic-html-5d8c |
| `simple-slider` | |
| `simple-table`  | Takes a JSON or JavaScript object or array and displays the contents in a simple table format. |
| `toast-msg`     | |
| `visual-log`    | Creates a log element on-page that expands to a set number of lines then drops from the start |
| status | List view with colour indication of status (e.g. on/off or RAG) |
| checklist | List view with checkboxes (for multi input) or radio buttons (for single selection) |


