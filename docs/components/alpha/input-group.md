---
title: input-group
description: >
  A Zero dependency web component that wraps a group of labeled-input components into a single grid-aligned group.
  The group can either be a form or a fieldset.
created: 2025-09-19 15:35:16
updated: 2025-09-19 17:50:56
author: Julian Knight (Totally Information)
status: alpha # alpha, beta, live
demo: tests/alpha/labeled-input
---

> [!TIP]
> This component is bundled with the [`labeled-input`](components/alpha/labeled-input) component that creates accessible inputs with associated labels.

## Useage

```html
<script defer src="../../dist/alpha/labeled-input.iife.min.js"></script>
...
<input-group type="form" id="ig01">
  <labeled-input type="text">Name</labeled-input>
  <labeled-input type="email">Email Address (Long Label)</labeled-input>
  <labeled-input type="password">Password</labeled-input>
  <input-group type="frame" id="ig02">
    <labeled-input name="ig02" type="radio">Radio 1</labeled-input>
    <labeled-input name="ig02" type="radio">Radio 2</labeled-input>
  </input-group>
</input-group>
```

## Attributes & Properties

### Attributes

All of the attributes are optional.

* Attributes specific to this component

  * `type` - The type of the input group. Can be either `form` (default) or `frame`.
  * `title` - Optional title for the group. For `form` types this creates a heading above the form. For `frame` types this creates a legend for the fieldset.

* Attributes inherited from the `BaseComponent`:

  * `inherit-style` - Load external styles into component. If present but empty, will default to './index.css'. Optionally give a URL to load.
  * `name` - HTML name attribute. Included in output _meta prop.

> [!NOTE]
> A 💫 symbol indicates that the property is dynamic when changed by JavaScript. Technically, this means that the property has a getter and setter function.

### Properties

Each attribute has a corresponding property. You can set the property directly in JavaScript or by using the `setAttribute` method. Note that setting the property will not change the attribute

* Properties specific to this component (that don't have a corresponding attribute):

  * None.

* Properties inherited from the `BaseComponent`:

  * {number} `_iCount` Static. The count of instances of this component that weren't given an id. Creates a unique id as needed.
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
> Static properties have to be accessed via the component's classname. e.g. `CallOut.componentVersion`
>
> If you do not explicitly set an `id` attribute, one will be auto-created in the format `id="input-group-1"`. Where the number is unique on-page. Please note that changing the order of `input-group` elements on the HTML page will change the numbering. It is always best to add your own unique id's.

## Slots

All child content of the component is moved as children of either the `form` or `frameset` element, depending on the `type` attribute.

> [!NOTE]
> Slots are used to allow the component to accept HTML content. By default, the main slot, if defined, will contain any content between the opening and closing tags of the component. You can also define named slots to allow for more complex content arrangements.

## Styling

### Inheriting Styles

This component uses the standard light DOM  and so inherits styles from the main document. It also adds its own scoped styles to the top of the document `head`. This means that you can easily override the component styles from your main document stylesheet.

### CSS Variables

See the documentation for the [`labeled-input`](components/experiments/labeled-input) component for the full list of CSS variables that can be used to style the child `labeled-input` components.
 
## Events

The standard events for this library of components are also available:

* `input-group:connected` - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
* `input-group:ready` - Alias for connected. The instance can handle property & attribute changes
* `input-group:disconnected` - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
* `input-group:attribChanged` - When a watched attribute changes. `evt.details.data` contains the details of the change.

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

None.

### Node-RED to Browser

#### Standard remote control messages

All of the live and beta components support a standard remote control message format. This allows you to control the component from Node-RED via UIBUILDER for Node-RED.

The standard message format is:

```json
{
  // The specific topic format routes the msg to the correct component
  // where `id` is the id of the component to control.
  "topic": "input-group::id",
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

* [x] Align child `labeled-input` components into a single grid-aligned group.
* [x] Support nested `input-group` components.
* [x] Support `type="form"` (default) and `type="frame"` (fieldset). That create the appropriate HTML wrapper elements.
* [x] Support optional `title` attribute that adds a legend to `frame` types and a heading to `form` types.
* [x] Support optional classes of `above` (default), `left`, `right`, `below` that align the child `labeled-input` components accordingly.

## Nice-to-have features

Possibly in future versions.

* [ ] If child `labeled-input` components do not have a `name` attribute, auto-generate using the `input-group` id.
* [ ] Form wrapper:
  * [ ] Should have auto-generated submit and reset buttons.
  * [ ] Should have validation support.

## Design References

* None.
