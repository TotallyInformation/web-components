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

* 

## Other Development

* A way to create a visual layout based on an input JSON. With a way to dynamically change the layout.

  The idea being to enable an entire page to be laid out using configuration instead of code with input msgs/events allowing real-time changes.

## Possible Additional Components

| Name            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `simple-input`  | An input tag with a label. With option to be part of a form (button submission) or to give output on lost focus. |
| `simple-button` | A button that triggers a custom document event and sends to uibuilder (if available). Automatically includes attrib and prop data, id, name, etc. Includes basic formatting and a slot for text (which allows some HMTL formatting). |
| `visual-log`    | Creates a log element on-page that expands to a set number of lines then drops from the start |
| `simple-table`  | Takes a JSON or JavaScript object or array and displays the contents in a simple table format. |
| `data-table`    | Similar to `simple-table` but with more options such as nested tables and multiple headers/bodies. Probably also with CRUD controls. |
| `data-card`     | A data-driven card with headers, footers, etc. Also acts as a container for other HTML as part of a grid view. |
| `grid-view`     | A controllable grid layout.                                  |
| `chart-*`       | Various different chart outputs using different libraries. Chart.js, Uplot, EChart |
| `on-off`        | A dedicated on/off button.    |
| `simple-dialog` | Simple wrapper for a [dialog box](https://www.tutorialrepublic.com/codelab.php?topic=html5&file=dialog-tag) with options for modal, button list |
| `simple-pie` | https://dev.to/dannyengelman/web-components-using-unknownhtmlelements-for-better-semantic-html-5d8c |
| `nav-bar` | |
| `toast-msg` | |

