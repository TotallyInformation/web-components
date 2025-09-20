---
title: labeled-input
description: >
  A Zero dependency web component that creates a self-aligning, grouped input element with an integrated label.
created: 2025-09-17 17:35:34
updated: 2025-09-20 17:35:28
author: Julian Knight (Totally Information)
status: alpha # alpha, beta, live
---

This component automatically creates a accessible inputs with associated labels. The label can be positioned above, below, left or right of the input using a CSS class. The input type can be any valid HTML input type.

Sequential multiple components using the left or right classes will automatically align the labels.

> [!TIP]
> This component is bundled with the [`input-group`](components/alpha/input-group) component that can be used to wrap multiple `labeled-input` components into a single aligned group wrapped in either a form or a fieldset.

## Useage

```html
<script defer src="../../dist/alpha/labeled-input.iife.min.js"></script>
...
<labeled-input type="text" class="above">Text Input</labeled-input>
```

## Attributes & Properties

### Attributes

All of the attributes are optional.

* Attributes specific to this component

  * Standard HTML input attributes that are passed through to the inner `input` element:
  
    `type`, `value`, `placeholder`, `disabled`, `readonly`, `required`,
    `min`, `max`, `minlength`, `maxlength`, `size`, `autocomplete`,
    `autofocus`, `form`, `list`, `pattern`, `step`,

* Attributes inherited from the `BaseComponent`:

  * `inherit-style` - Load external styles into component. If present but empty, will default to `./index.css`. Optionally give a URL to load.
  * `name` - HTML name attribute. Included in output _meta prop.

> [!NOTE]
> A 💫 symbol indicates that the property is dynamic when changed by JavaScript. Technically, this means that the property has a getter and setter function.

### Properties

Each attribute has a corresponding property. You can set the property directly in JavaScript or by using the `setAttribute` method. Note that setting the property will not change the attribute

* Properties specific to this component (that don`t have a corresponding attribute):

  * `id` {string} The HTML id attribute. If not set, one will be auto-generated in the format `labeled-input-#` where # is a unique number. Note that the `input` element inside the component will have an id of `<id>-input` for ease of access.
  
  * `elInput` {Element} Reference to the component`s input element. You should add change listeners to this element, e.g. `$(`#wc01`).elInput.addEventListener(`change`, (evt) => { ... })`
  
  * `elLabel` {Element} Reference to the component`s label element.
  
  * `elErrorMessage` {Element} Reference to the component`s error message element.
  
  * `oldValues` {attributeName, value} Holds the previous values of the component`s properties.

* Properties inherited from the `BaseComponent`:

  * {number} `_iCount` Static. The count of instances of this component that weren`t given an id. Creates a unique id as needed.
  * {boolean} `uib` True if UIBUILDER for Node-RED is loaded. (Default=FALSE)
  * {object} `uibuilder` Reference to loaded UIBUILDER for Node-RED client library if loaded (else undefined).
  * {function(string): Element} `$` jQuery-like shadow dom selector (or undefined if shadow dom not used).
  * {function(string): NodeList} `$$`  jQuery-like shadow dom multi-selector (or undefined if shadow dom not used).
  * {boolean} `connected` False until connectedCallback finishes.
  * {string} `name` Placeholder for the optional name attribute.
  * {object} `opts` This components controllable options - get/set using the `config()` method - empty object by default.
  * {string} `baseVersion` Static. The base component version string (date updated).

* Other standard properties:

  * {string} `componentVersion` Static. The component version string (date updated). Also has a getter that returns component and base version strings.

> [!NOTE]
> Static properties have to be accessed via the component`s classname. e.g. `CallOut.componentVersion`
>
> If you do not explicitly set an `id` attribute, one will be auto-created in the format `id="labeled-input-1"`. Where the number is unique on-page. Please note that changing the order of `labeled-input` elements on the HTML page will change the numbering. It is always best to add your own unique id`s.

## Slots

All child content of the component is moved into the label element.

> [!NOTE]
> Slots are used to allow the component to accept HTML content. By default, the main slot, if defined, will contain any content between the opening and closing tags of the component. You can also define named slots to allow for more complex content arrangements.

## Styling

### Inheriting Styles

This component uses the standard light DOM  and so inherits styles from the main document. It also adds its own scoped styles to the top of the document `head`. This means that you can easily override the component styles from your main document stylesheet.

### CSS Variables

The following CSS variables are available for styling:

* `--input-grid-column-gap` - Gap between columns.
* `--input-grid-gap` - Gap between rows and columns, use the more specific variables if needed. Default is `0.5em`.
* `--input-grid-row-gap` - Gap between rows.
* `--label-after-content` - Content to insert after the label text.
* `--label-before-content` - Content to insert before the label text.
* `--labeled-input-areas` - Defines the areas for the labeled input. Available area names are `label`, `input` and `error`. The areas can be arranged in any grid layout.
  
  The pre-defined layouts are:
  * `above` (default) - `"label" "input" "error"` (1x3)
  * `below` - `"input" "label" "error"` (1x3)
  * `left` - `"label input" "error error"` (2x2)
  * `right` - `"input label" "error error"` (2x2)
  
  Use the `--labeled-input-columns` variable to set the column widths. Use a `.` for any areas you want to leave unused (e.g. `"label input" ". error"`). Each string defines a row, with columns separated by spaces.

* `--labeled-input-columns` - Sets the relative or fixed width of the grid columns. Above/below layouts use a single, full-width column. Left/right layouts use two columns. Left layouts use `minmax(0, 1fr) 1.5fr` (making the inputs slightly wider than the labels) and right layouts use `minmax(0, 0.25fr) 2fr` (making the inputs much smaller than the labels).
* `--labeled-input-justify` - Set the `justify-content` attribute. Normally `default` but uses `start` or `end` for left/right aligned checkboxes and radio buttons.

The `<input-group>` component also uses these variables to control the layout of multiple labeled inputs.

## Events

As this component uses the standard light DOM, all standard HTML input events are available via the inner `input` element. You can add event listeners to the `elInput` property.

The standard events for this library of components are also available:

* `labeled-input:connected` - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
* `labeled-input:ready` - Alias for connected. The instance can handle property & attribute changes
* `labeled-input:disconnected` - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
* `labeled-input:attribChanged` - When a watched attribute changes. `evt.details.data` contains the details of the change.

NOTE that event listeners can be attached either to the `document` or to the specific element instance. Use `document.addEventListener` if your web app might be adding new instances of the component dynamically.

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

These methods can be used from JavaScript by first getting a reference to the appropriate element instance. As shown in the examples.

### Utility

None.

### Standard methods

None.

## Extensions for UIBUILDER for Node-RED

### Browser to Node-RED

As long as the component is **not inside a form**, any changes to the input value will be sent immediately to Node-RED via UIBUILDER for Node-RED.

If the component is inside a form, you should add buttons to the form to submit or reset the form as needed. Noting that UIBUILDER has the `uibuilder.eventSend(event)` function that will capture and return all of the form's data as a single message. Simply attach that as the click action of a button inside the form.

The message format is:

```json
{
  "topic": "labeled-input/change/name-or-id",
  "payload": "new-value",
  "_meta": {
    "type": "input-type",
    "id": "element-id",
    "name": "element-name",
    "previous": "previous-value"
  }
}
```

Where:
* `name-or-id` is the `name` attribute of the input if set, otherwise the `id` attribute of the component.
* `new-value` is the new value of the input. If the input type is numeric, this will be a number, otherwise a string.
* `input-type` is the type of input, e.g. `text`, `number`, `checkbox`, etc.
* `element-id` is the `id` attribute of the component's input element.
* `element-name` is the `name` attribute of the input element if set, otherwise the `id` attribute of the component.
* `previous-value` is the previous value of the input, or `null` if not previously set.

> [!TIP]
> Prioritising the `name` attribute over the `id` attribute allows you to have multiple inputs with the same name (e.g. radio buttons) and have them all send messages with the same topic.

### Node-RED to Browser

#### Standard remote control messages

All of the live and beta components support a standard remote control message format. This allows you to control the component from Node-RED via UIBUILDER for Node-RED.

The standard message format is:

```json
{
  // The specific topic format routes the msg to the correct component
  // where `id` is the id of the component to control.
  "topic": "labeled-input::id",
  // The payload is the data to set for the component.
  "payload": {
    // Each property of the payload must match a property or attribute name of the component.
    // class, style, data-*, and value are all applied as attributes.
    // Anything else is applied as a property of the element rather than an attribute.
    // ...
  }
}
```


#### Examples



## Original Requirements

* [x] Different input types.
* [x] Integrated label. Label text via slot.
* [x] Accessible.
  * [x] Label linked to input via for/id.
  * [x] autocomplete support.
* [x] Support for different label positions. Horizontal (left/right) and vertical (top/bottom).
* [x] Input tag attributes passthrough.
  * [x] autocomplete
  * [x] autofocus
  * [x] disabled
  * [x] form
  * [x] list
  * [x] max
  * [x] maxlength
  * [x] min
  * [x] minlength
  * [x] multiple
  * [x] name
  * [x] pattern
  * [x] placeholder
  * [x] readonly
  * [x] required
  * [x] size
  * [x] step
  * [x] type
  * [x] value
* [x] If used in UIBUILDER for Node-RED, support for sending input to Node-RED. If not in a form, send on change.

## Nice-to-have features

Possibly in future versions.

* [x] Frames (uses outer `<input-group type="frame">`).
* [ ] Button input type: No label, put text inside the button.
* [ ] Add `inputmode` attribute support.
* [ ] Add `spellcheck` attribute support.
* [ ] Add `autocapitalize` attribute support.
* [ ] Add mobile size breakpoints.
* [ ] Error messages - *div and grid area has been added but no functionality yet.*
* [ ] Inner `error-message` component.
  * [ ] Standard way to show error messages.
  * [ ] Link to input via aria-describedby.
  * [ ] Show/hide via attribute or property.
  * [ ] Support for different message types. Error, warning, info, success.
  * [ ] Support for icons.
  * [ ] Support for multiple messages.
* [ ] Help text - needs another grid area.
* [ ] Compound inputs
  * [ ] Text areas
  * [ ] Select boxes
  * [ ] Validation
  * [ ] Button group - a row of connected buttons.
  * [ ] Switch/toggle - alternately styled checkbox.
  * [x] ~~Checkbox group~~ - not required, use an input-group with multiple labeled-input checkboxes sharing the same name attribute.
  * [x] ~~Radio group~~ - not required, use an input-group with multiple labeled-input radio buttons sharing the same name attribute.

## Design References

* None.
