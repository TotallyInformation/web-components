---
title: Totally Information's web components documentation
description: |
  This is the documentation for TotallyInformation's pure Web Components.
created: 2022-04-07 16:51:03
updated: 2025-02-25 17:13:26
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

* [`button-send`](button-send) - A simple &lt;button> wrapper that exposes useful data and enables block content.
* [`call-out`](call-out) - Creates a GitHub/Obsidian style call-out information box. Colour coded with an icon and over-ridable default title.
* [`collapsible-headings`](collapsible-headings) - Turns a section of Hn headings and block contents into collapsible content around the heading levels.
* [`html-include`](html-include) - Dynamically include HTML snippets or documents from a web server into your current web page.
* [`led-gauge`](led-gauge) - An LED-style gauge.

### Beta

These are certainly fully usable in their current form. However, they will still continue to evolve, possibly fairly dramatically.

* [`labelled-value`](labelled-value) - A simple label and value pair with easy styling.
* [`syntax-highlight`](syntax-highlight) - Show JSON or JavaScript object data as highlighted HTML.
* [`visible-console`](visible-console) - Clones `console.xxxx()` outputs to the web-page.

### Alpha

These probably should not be used in anger just yet. They will generally do something useful but are not yet considered a minimum viable product.

* [`chart-statetrail`](chart-statetrail) - A chart that shows a trail of states over time (AKA, a timeline).
* [`simple-card`](simple-card)
* [`simple-container`](simple-container)
* [`smart-table`](smart-table) - Turns array or object data into an HTML table with optional column definitions.

### Experimental

It is possible that these will never be fully developed. But they represent some ideas that are being explored.

See the [Ideas](ideas.md) document for more information on what is being considered for future components.

* `chart-apex` - Charts using the ApexCharts library.
* `chart-frappe` - Charts using the Frappe library.
* `chart-high` - Charts using the HighCharts library.
* `chart-js` - Charts using the ChartJS library.
* `chart-plotly` - Charts using the Plotly library.
* `definition-list` - Create a definition list from a data object.
* [`dynamic-list`](dynamic-list) - Create a list from a data object.
* `floor-plan` - May become a non-framework version of the uibuilder/SVG/VueJS example.
* `gauge-steel` - A gauge using the SteelSeries library.
* `ghost-thermometer` - A thermometer gauge.
* `multi-way-switch` - A switch that can have multiple states.
* `nav-bar` - A simple navigation bar.
* [`on-off`](on-off) - A simple on/off switch.
* `simple-gauge` - A simple gauge.
* `simple-switch` - A simple switch.
* `uib-theme-changer` - A theme changer for the uib-brand.css used on this and other sites.
* `uib-wrap` - Web component for UIBUILDER for Node-RED that lets you wrap around a 3rd-party JavaScript library to make it responsive to data from Node-RED.

## Reference and template

* [`hello-world`](hello-world.md) - Not really useful, just helpful as a development tool.
* `super-star` - this was borrowed from elsewhere. It isn't really useful but shows some web component features.
* `component-template` - A standardised template for creating new components. All components in this package are based on this template.
* `ti-base-component` - A base class that all components in this package extend. It provides standard features and methods.

## Standards, Requirements & Development

See the [Developer Docs](dev.md)
