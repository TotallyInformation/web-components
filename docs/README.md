This is the documentation for TotallyInformation's pure Web Components.

These components do not require any external modules or frameworks. However, they do contain (optional) features to use with node-red-contrib-uibuilder.

They require a reasonably modern, standards compliant browser. No Internet Explorer support (though you may be able to get them to work with a suitable polyfill).

See the examples folder which contains an html and a javascript file for each component that demonstrates their use with and without uibuilder.

See the main README for how to install and use.

## Styling

Most of the components use a shadow-dom to isolate the HTML and CSS. The impact of this is that any CSS style sheets applied to the outer DOM (the page), will NOT be reflected into the shadow dom. However, _any CSS variables WILL be reflected_.

This is a limitation of the W3C Web Component specification, not of these specific components.

Should you need to get around this limitation of the shadow dom, all components in this package support the `inherit-style` attribute. Adding this attribute will make the component load an external style sheet link into the component so that all styles become available.

Note that slot content is not subject to this restriction since it exists in the DOM, not the shadow dom.

> [!NOTE]
> Loading external style sheets into the components causes an additional web resource load and in extreme cases can cause a flash of style change.

## Components

### Usable

While these are certainly fully usable in their current form, they may still continue to evolve, possibly fairly dramatically.

* [`button-send`](button-send) - A simple &lt;button> wrapper that exposes useful data and enables block content.
* [`collapsible-headings`](collapsible-headings) - Turns a section of Hn headings and block contents into collapsible content around the heading levels.
* [`visible-console`](visible-console) - Clones `console.xxxx()` outputs to the web-page.


### Usable with limitations

These will do a job in a basic fashion but still need some work to make them more complete and standardised.

* [`html-include`](html-include) - Dynamically include HTML snippets or documents from a web server into your current web page.
* [`syntax-highlight`](./syntax-highlight) - Show JSON or JavaScript object data as highlighted HTML.
* `data-list`

### Not yet ready for use and/or experimental

* `definition-list`

* `floor-plan` - May become a non-framework version of the uibuilder/SVG/VueJS example.
* [`hello-world`](./hello-world.md) - Not really useful, just helpful as a development tool.
* `super-star` - this was borrowed from elsewhere. It isn't really useful but shows some web component features.

### Coming soon

* `on-off`



## Standards, Requirements & Development

See the [Developer Docs](dev.md)
