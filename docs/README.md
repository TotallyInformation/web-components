---
title: Totally Information's web components documentation
description: |
  This is the documentation for TotallyInformation's pure Web Components.
created: 2022-04-07 16:51:03
updated: 2025-06-07 20:48:42
---

These components mostly do not require any external modules or frameworks. However, they do contain (optional) features to use with node-red-contrib-uibuilder.

They require a reasonably modern, standards compliant browser. No Internet Explorer support (though you may be able to get them to work with a suitable polyfill).

See the _tests_ folder which contains an html web page for each component. Both demonstrating their use and testing them.

See the main README for how to install and use.

> [!NOTE]
> All of the alpha, beta and live components are run through ESBUILD to produce both ESM and UMD versions in the `dist` folder. The UMD versions are used in the test pages.

## Styling

Some of the components use a shadow-dom to isolate the HTML and CSS. The impact of this is that any CSS style sheets applied to the outer DOM (the page), will NOT normally be reflected into the shadow dom. _Any **CSS variables** though WILL be reflected_.

This is a limitation of the W3C Web Component specification, not of these specific components.

Should you need to get around this limitation of the shadow dom, all components in this package support the `inherit-style` attribute. Adding this attribute will make the component load an external style sheet link into the component so that all styles become available.

Note that slot content is not subject to this restriction since it exists in the main DOM (AKA, the "light DOM"), not the shadow dom.

> [!NOTE]
> Loading external style sheets into the components causes an additional web resource load and in extreme cases can cause a flash of style change.

## Components

Each of the components that are in any form of usable state have a [test/demo page](https://wc.totallyinformation.net/tests/index.html), click on the link to see them.

### Live

These are fully usable in their current form. They may still evolve but are considered relatively stable.

These components can be considered `live` and ready for extended use.

| Component                                      | Description                                                                           | Class Name    |
| -----------------------------------------------| ------------------------------------------------------------------------------------- | ------------- |
| [`button-send`](components/live/button-send)   | A simple button that outputs key info either via a custom document event. When used with UIBUILDER for Node-RED, will send a message back to Node-RED. Also allows block contents on the button. | `ButtonSend` |
| [`call-out`](components/live/call-out)         | Displays nicely formatted GitHub/Obsidian style call-out information boxes. Colour coded with an icon and over-ridable default title. | `CallOut` |
| [`collapsible-headings`](components/live/collapsible-headings) | Turns a section of Hn headings and block contents into collapsible content around the heading levels. | `CollapsibleHeadings` |
| [`data-list`](components/live/data-list)       | Create a list from a data object.                                                     | `DataList`    |
| [`h1-title`](components/live/h1-title)         | Uses the page's `<title>`, inserts as an `<h1>` tag. Optionally with slot content as sub-title. | `H1Title` |
| [`html-include`](components/live/html-include) | Dynamically load external HTML content very easily without needing an iFrame.         | `HtmlInclude` |
| [`led-gauge`](components/live/led-gauge)       | A simple LED-style gauge widget with easily controlled colours and responsive layout. | `LedGauge`    |

### Beta

These components can be considered `beta` quality or better. They may not be fully comprehensive but they have basic usefulness.

| Name                                                   | Description                                                  | Class Name        |
| ------------------------------------------------------ | ------------------------------------------------------------ | ----------------- |
| [`labelled-value`](components/beta/labelled-value)     | A simple label and value pair with easy styling.             | `LabelledValue`   |
| [`syntax-highlight`](components/beta/syntax-highlight) | Show JSON or JavaScript object data as highlighted HTML.     | `SyntaxHighlight` |
| [`visible-console`](components/beta/visible-console)   | Reflects (clones) browser `console` log outputs to an on-screen visible block. Useful if needing to debug web apps on mobile devices with no access to the dev tools console. | `VisibleConsole` |

### Alpha


> [!NOTE]
> 
> Currently, all of the alpha components should be considered *experimental*. Most will work fine though may be overly simplistic in places. However, all are subject to significant change.
>
> Also note that the documentation is incomplete and may be wrong in places. Not all of these will have test/demo pages.
>
> However, please do give them a go and let me have some feedback.

| Component                                               | Description                                                                           | Class Name        |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------- |
| [`simple-card`](components/alpha/simple-card)           | A card container with optional header and footer.                                     | `SimpleCard`      |
| [`simple-container`](components/alpha/simple-container) | A UI container for easy, automated layout of contained elements (specifically cards). | `SimpleContainer` |
| [`smart-table`](components/alpha/smart-table)           | Turns array or object data into an HTML table with optional column definitions.       | `SmartTable`      |

### Pre-alpha

These components are probably not usable and may not work at all. They may also be missing documentation or test/demo pages.

#### Partially documented with test/demo pages

| Component                                                     | Description                                                       | Class Name        |
| ------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------- |
| [`chart-statetrail`](components/experiments/chart-statetrail) | A chart that shows a trail of states over time (AKA, a timeline). | `ChartStateTrail` |
| [`on-off`](components/experiments/on-off.md)                  | A simple on/off switch.                                           | `OnOff`           |
| [`todo-app`](components/experiments/todo-app)                 | A simple todo app that can be used to manage a list of tasks.     | `TodoApp`         |

#### Undocumented, no test/demo pages

It is possible that these will never be fully developed. But they represent some ideas that are being explored.

See the [Roadmap](roadmap.md) page for more information on what is being considered for future components.

| Component           | Description                                                                                              | Class Name         |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ------------------ |
| `chart-apex`    | Charts using the Apex.js chart library.                                                 | `ChartApex`   |
| `chart-frappe`      | A chart component using the Frappe chart library.                                                        | `ChartFrappe`      |
| `chart-high`        | A chart component using the HighCharts library.                                                          | `ChartHigh`        |
| `chart-js`      | Charts using the Chart.js chart library.                                                | `ChartJs`     |
| `chart-plotly`  | Charts using the Plotly.js chart library.                                               | `ChartPlotly` |
| `container-br`      | Like `<br>` for flex layouts. Forces a new row in a `simple-container` (or any other flex row container).| `ContainerBr`      |
| `definition-list`   | Similar to `data-list` but outputs a DL instead. (replaced by `dynamic-list`?)                           | `DefinitionList`   |
| `floor-plan`    | Display a floor-plan image and add dynamic icons. For example, showing lighting status. | `FloorPlan`   |
| `gauge-steel`       | A gauge component using the Steel Series library.                                                        | `GaugeSteel`       |
| `ghost-thermometer` | A thermometer style gauge.                                                                               | `GhostThermometer` |
| `multi-way-switch`  | A flexible multi-switch that can display in several styles (buttons, rotary, etc).                       | `MultiWaySwitch`   |
| `nav-bar`           | A standardised navigation menu bar.                                                                      | `NavBar`           |
| `simple-gauge`      | A simple gauge style display component.                                                                  | `SimpleGauge`      |
| `simple-switch`     | A simple 2-way latching switch.                                                                          | `SimpleSwitch`     |
| `simple-tree`   | Output's a collapsible tree-style list display.                                         | `SimpleTree`  |
| `state-timeline`    | A horizontal timeline display designed to show status/state.                                             | `StateTimeline`    |
| `super-star`    | A simple animated star emoji that twinkles when clicked or hovered over.                | `SuperStar`   |
| `uib-theme-changer` | This only works with the `uib-brand` stylesheet or something crafted to be like it. Switch between light/dark/auto schemes, shift the base hue, contrast ratio, and 2 accent colours. | `UibThemeChanger` |
| `uib-wrap`      | Makes 3rd-party web components responsive to UIBUILDER for Node-RED.                    | `UibWrap`     |

## Reference and template

* **`component-template`** - A standardised template for creating new components. All components in this package are based on this template.
* **`ti-base-component`** - A base class that all components in this package extend. It provides standard features and methods.
* [`hello-world`](hello-world.md) - Not really useful, just helpful as a development tool.
* `super-star` - this was borrowed from elsewhere. It isn't really useful but shows some web component features.

## Standards, Requirements & Development

See the [Developer Docs](dev.md)
