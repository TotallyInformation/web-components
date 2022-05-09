---
title: Totally Information web-components Roadmap
description: >
  This page outlines the future direction of the components. Including specific things that will almost certainly happen as well as more speculative ideas.
created: 2022-04-08 17:12:11
lastUpdated: 2022-05-09 19:49:19
---

## Components In Progress

Please see the main README file.

## Other supporting files and folders

* `docs/`

* `vscode-descriptors/ti-web-components.html-data.json`

  Enables IntelliSense for the components while editing HTML in VSCode.

  May not always be in step with the code until everything is finalised.

* `libs/uibuilder.module.js` - an alternative, uibuilder v5 compatible client library specifically designed for use as an ECMA module. Not quite feature comparible with the standard `uibuilderfe.js` library but is the future direction of the client. Written as a class, self-loads the correct socket.io client library, has brand new logging features. Provides a simple, jQuery like `$` selector function.

  Most importantly, it contains a new, data-driven UI creator that lets you send configuration messages to build a UI dynamically.

  Still a work in progress but quite usable already.

* `libs/uib-brand.css` - a copy of the alternate (new) stylesheet from uibuilder that these components can use.

## Changes/Improvements to Existing Components

* 

## Other Development

* A way to create a visual layout based on an input JSON. With a way to dynamically change the layout.

  The idea being to enable an entire page to be laid out using configuration instead of code with input msgs/events allowing real-time changes.

## Possible Additional Components

| Name            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `simple-button` | A button that triggers a custom document event and sends to uibuilder (if available). Automatically includes attrib and prop data, id, name, etc. Includes basic formatting and a slot for text (which allows some HMTL formatting). |
| `visual-log`    | Creates a log element on-page that expands to a set number of lines then drops from the start |
| `simple-table`  | Takes a JSON or JavaScript object or array and displays the contents in a simple table format. |
| `data-table`    | Similar to `simple-table` but with more options such as nested tables and multiple headers/bodies. Probably also with CRUD controls. |
| `data-card`     | A data-driven card with headers, footers, etc. Also acts as a container for other HTML as part of a grid view. |
| `grid-view`     | A controllable grid layout.                                  |
| `simple-input`  | An input tag with a label. With option to be part of a form (button submission) or to give output on lost focus. |
| `labelled-text` | Text output with a label.                                    |
| `chart-*`       | Various different chart outputs using different libraries. Chart.js, Uplot, EChart |
| `on-off`        | A dedicated on/off button.    |
| `simple-dialog` | Simple wrapper for a [dialog box](https://www.tutorialrepublic.com/codelab.php?topic=html5&file=dialog-tag) with options for modal, button list |
| `simple-pie` | https://dev.to/dannyengelman/web-components-using-unknownhtmlelements-for-better-semantic-html-5d8c |
| `nav-bar` | |

