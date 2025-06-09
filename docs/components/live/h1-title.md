---
title: h1-title
description: >
  A Zero dependency web component that takes the content of a `<title>` tag in the page's `<head>` and sets it as the content of an `<h1>` tag in the page's body.
created: 2025-05-29 09:41:39
updated: 2025-05-30 14:18:31
author: Julian Knight (Totally Information)
status: live # alpha, beta, live
---

Any content placed between the opening and closing tags of this component will be used as a sub-title with a slightly smaller font size and italic.

## Useage

```html
<h1-title>
  Optionally, some sub-title content
</h1-title>
```

## Attributes & Properties

### Attributes

All of the attributes are optional.

* Attributes specific to this component

  * None.

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
> If you do not explicitly set an `id` attribute, one will be auto-created in the format `id="h1-title-1"`. Where the number is unique on-page. Please note that changing the order of `h1-title` elements on the HTML page will change the numbering. It is always best to add your own unique id's.

## Slots

* Default slot - The main slot for the component. If content is provided, it will be displayed as a sub-title below the main title. The content will be italic and a slightly smaller font than standard.

> [!NOTE]
> Slots are used to allow the component to accept HTML content. By default, the main slot, if defined, will contain any content between the opening and closing tags of the component. You can also define named slots to allow for more complex content arrangements.

## Styling

### Inheriting Styles

This component uses the Shadow DOM to encapsulate its styles. This means that the component will not inherit styles from the main document. However, you can still style the component using [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). You can also use the `inherit-styles` attribute to allow the component to inherit styles from a style link (usually the same as the main page's style sheet).

### CSS Variables

The following CSS variables are available for styling:

* None.

## Events

The standard events for this library of components are also available:

* `h1-title:connected` - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
* `h1-title:ready` - Alias for connected. The instance can handle property & attribute changes
* `h1-title:disconnected` - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
* `h1-title:attribChanged` - When a watched attribute changes. `evt.details.data` contains the details of the change.

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
  "topic": "h1-title::id",
  // The payload is the data to set for the component.
  "payload": {
    // Each property of the payload must match a property or attribute name of the component.
    // The value will be set against the property or attribute.
    // ...
  }
}
```


#### Examples

N/A

## Original Requirements

* [x] Take the content of a `<title>` tag in the page's `<head>` and set it as the content of an `<h1>` tag in the page's body.
* [x] Optionally, allow the content of the `<h1>` tag to be set to a sub-title with a slightly smaller font size and italic.

## Nice-to-have features

Possibly in future versions.

* [ ] Use a MutationObserver to watch for changes to the <slot> content and update the h1 class if needed.
* [ ] Add a check and warning to discourage the use of multiple `h1-title` components on the same page. This is not a good practice for accessibility and SEO.


## Design References

* None.
