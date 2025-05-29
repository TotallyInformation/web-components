---
title: Totally Information's web components documentation
description: |
  This is the documentation for TotallyInformation's pure Web Components.
created: 2022-04-07 16:51:03
updated: 2025-05-29 17:35:00
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

| Component                         | Description                                                  | Class Name |
| ----------------------------------| ------------------------------------------------------------ | ---------- |
| [`button-send`](components/button-send) | A simple button that outputs key info either via a custom document event. When used with UIBUILDER for Node-RED, will send a message back to Node-RED. Also allows block contents on the button. | `ButtonSend` |
| [`call-out`](components/call-out) | Displays nicely formatted GitHub/Obsidian style call-out information boxes. Colour coded with an icon and over-ridable default title. | `CallOut` |
|  [`collapsible-headings`](components/collapsible-headings) | Turns a section of Hn headings and block contents into collapsible content around the heading levels. | `CollapsibleHeadings` |
| [`html-include`](components/html-include) | Dynamically load external HTML content very easily without needing an iFrame. | `HtmlInclude` |
| [`led-gauge`](components/led-gauge) | A simple LED-style gauge widget with easily controlled colours and responsive layout. | `LedGauge` |

### Beta

These components can be considered `beta` quality or better. They may not be fully comprehensive but they have basic usefulness.

| Name                                   | Description                                                  | Class Name |
| -------------------------------------- | ------------------------------------------------------------ | ---------- |
| [`labelled-value`](components/labelled-value)     | A simple label and value pair with easy styling.             | `LabelledValue` |
| [`syntax-highlight`](components/syntax-highlight) | Show JSON or JavaScript object data as highlighted HTML.     | `SyntaxHighlight` |
| [`visible-console`](components/visible-console)   | Reflects (clones) browser `console` log outputs to an on-screen visible block. Useful if needing to debug web apps on mobile devices with no access to the dev tools console. | `VisibleConsole` |

### Alpha


> [!NOTE]
> 
> Currently, all of the alpha components should be considered *experimental*. Most will work fine though may be overly simplistic in places. However, all are subject to significant change.
>
> Also note that the documentation is incomplete and may be wrong in places. Not all of these will have test/demo pages.
>
> However, please do give them a go and let me have some feedback.

| Component                                         | Description                                                       | Class Name        |
| ------------------------------------------------- | ----------------------------------------------------------------- | ----------------- |
| [`chart-statetrail`](components/chart-statetrail) | A chart that shows a trail of states over time (AKA, a timeline). | `ChartStateTrail` |
| *[`dynamic-list`](components/dynamic-list)        | Create a list from a data object. (*) No demo yet                 | `DynamicList`     |
| *[`on-off`](components/on-off.md)                 | A simple on/off switch. (*) No demo yet                           | `OnOff`           |
| [`simple-card`](components/simple-card)           | A card container with optional header and footer.                 | `SimpleCard`      |
| [`simple-container`](components/simple-container) | A UI container for easy, automated layout of contained elements (specifically cards). | `SimpleContainer` |
| [`smart-table`](components/smart-table)           | Turns array or object data into an HTML table with optional column definitions.       | `SmartTable`      |

The following alpha components do not yet have documentation or test/demo pages. They are included in the package and can be used but may not be fully functional or documented.

| Component           | Description                                                                                              | Class Name         |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ------------------ |
| `chart-frappe`      | A chart component using the Frappe chart library.                                                        | `ChartFrappe`      |
| `chart-high`        | A chart component using the HighCharts library.                                                          | `ChartHigh`        |
| `container-br`      | Like `<br>` for flex layouts. Forces a new row in a `simple-container` (or any other flex row container).| `ContainerBr`      |
| `data-list`         | Data-driven UL/OL. Takes a JSON or JavaScript object or array of objects and outputs a formatted list. (replaced by `dynamic-list`?) | `DataList` |
| `definition-list`   | Similar to `data-list` but outputs a DL instead. (replaced by `dynamic-list`?)                           | `DefinitionList`   |
| `gauge-steel`       | A gauge component using the Steel Series library.                                                        | `GaugeSteel`       |
| `ghost-thermometer` | A thermometer style gauge.                                                                               | `GhostThermometer` |
| `multi-way-switch`  | A flexible multi-switch that can display in several styles (buttons, rotary, etc).                       | `MultiWaySwitch`   |
| `nav-bar`           | A standardised navigation menu bar.                                                                      | `NavBar`           |
| `simple-gauge`      | A simple gauge style display component.                                                                  | `SimpleGauge`      |
| `simple-switch`     | A simple 2-way latching switch.                                                                          | `SimpleSwitch`     |
| `state-timeline`    | A horizontal timeline display designed to show status/state.                                             | `StateTimeline`    |
| `uib-theme-changer` | This only works with the `uib-brand` stylesheet or something crafted to be like it. Switch between light/dark/auto schemes, shift the base hue, contrast ratio, and 2 accent colours. | `UibThemeChanger` |

There is also an `alpha/not-complete` folder. This contains some components not yet even considered alpha quality.

| Component       | Description                                                                             | Class Name    |
| --------------- | --------------------------------------------------------------------------------------- | ------------- |
| `chart-apex`    | Charts using the Apex.js chart library.                                                 | `ChartApex`   |
| `chart-js`      | Charts using the Chart.js chart library.                                                | `ChartJs`     |
| `chart-plotly`  | Charts using the Plotly.js chart library.                                               | `ChartPlotly` |
| `floor-plan`    | Display a floor-plan image and add dynamic icons. For example, showing lighting status. | `FloorPlan`   |
| `simple-tree`   | Output's a collapsible tree-style list display.                                         | `SimpleTree`  |
| `super-star`    | A simple animated star emoji that twinkles when clicked or hovered over.                | `SuperStar`   |
| `uib-wrap`      | Makes 3rd-party web components responsive to UIBUILDER for Node-RED.                    | `UibWrap`     |

### Experimental

It is possible that these will never be fully developed. But they represent some ideas that are being explored.

See the [Ideas](ideas.md) document for more information on what is being considered for future components.

* `chart-apex` - Charts using the ApexCharts library.
* `chart-js` - Charts using the ChartJS library.
* `chart-plotly` - Charts using the Plotly library.
* `definition-list` - Create a definition list from a data object.
* `floor-plan` - May become a non-framework version of the uibuilder/SVG/VueJS example.
* `uib-theme-changer` - A theme changer for the uib-brand.css used on this and other sites.
* `uib-wrap` - Web component for UIBUILDER for Node-RED that lets you wrap around a 3rd-party JavaScript library to make it responsive to data from Node-RED.

## Reference and template

* **`component-template`** - A standardised template for creating new components. All components in this package are based on this template.
* **`ti-base-component`** - A base class that all components in this package extend. It provides standard features and methods.
* [`hello-world`](hello-world.md) - Not really useful, just helpful as a development tool.
* `super-star` - this was borrowed from elsewhere. It isn't really useful but shows some web component features.

## Standards, Requirements & Development

See the [Developer Docs](dev.md)
