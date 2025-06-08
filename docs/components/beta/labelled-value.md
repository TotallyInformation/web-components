---
title: labelled-value
description: |
  A Zero dependency web component that Displays a value with a label prefix.
created: 2022-04-07 21:05:42
updated: 2025-05-29 15:31:23
status: beta # alpha, beta, live
---

This is a simple convenience component. It displays a value attribute/property and prefixes it with a defined label.

It uses CSS Flexbox and has lots of CSS variables to allow overriding of the styles.

The value output uses an `<output>` tag so that screen-readers will automatically announce changes correctly.

## Current limitations

* Accessibility improvements needed
* Needs colour/formatting controls
* Should allow HTML in the label (via a `rich-label` attribute)

## Useage

```html
<labelled-value label="My Label" value="My Value"></labelled-value>
```

## Attributes & Properties

### Attributes

* `label` - Sets the label to the given text string.
* `value` - Sets the displayed output to the given text string.
* `inherit-style` - If present, the component will inherit the [page-level styles](#page-level-css).

### Properties

Both `label` and `value` can be set from JavaScript.

```js
const myLV = document.getElementsByTagName('labelled-value')[0]
myLV.value = 'Some new value'
myLV.label = 'Some new label'
```

As for all of the components in this library, if you do not explicitly set an `id` attribute, one will be auto-created in the format `id="labelled-value-1"`. Where the number is unique on-page. Please note that changing the order of `labelled-value` elements on the HTML page will change the numbering. It is always best to add your own unique id's.

## Slots

There is a single, default slot which is wrapped in a `<div>` tag after the label and value.

## Styling

### CSS Variables

The following CSS variables are set.

```css
--label-before: '';
--label-after: ':';
--output-before: '';
--output-after: '';
--width: 100%;
--label-flex: 1;
--output-flex: 1;
--label-align: left;
--output-align: right;
--label-font: '';
--output-font: '';
```

Each can be overriden either for all instances on page - by setting the variables in a page-level style sheet. Or for a specific instance by setting a style override:

```html
<labelled-value label="My Label" value="My Value" style="--label-font: italic small-caps bold 16px/2 cursive;"></labelled-value>
<labelled-value label="No value label" style="--label-before: '>> ℹ️ &quot;';--label-after: '&quot;';"></labelled-value>
```

See the demo page for examples.

### Page-level CSS

As with all of the components in this library that make use of the shadow dom (which normally excludes page-level CSS and only allows through page-level CSS variables), you can override the default and include page-level CSS using the `inherit-style` attribute.

The `inherit-style` attribute must contain a URL pointing to a loadable CSS resource. If no URL is provided, `./index.css` will be used (in line with UIBUILDER for Node-RED standards).

```html
<labelled-value label="My Label" value="My Value" inherit-style="https://example.com/path/to/mystyles.css"></labelled-value>
```

## Events

The standard events for this library of components are available:

 * "labelled-value:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * "labelled-value:ready" - Alias for connected. The instance can handle property & attribute changes
 * "labelled-value:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * "labelled-value:attribChanged" - When a watched attribute changes. `evt.details.data` contains the details of the change.

> [!NOTE]
> Listeners can be attached either to the `document` or to the specific element instance.

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

`LabelledValue.version` will return the version numbers of the component and the base component.

## Extensions for UIBUILDER for Node-RED

None at this time. Use the uibuilder client library's standard features to interact with this component.
