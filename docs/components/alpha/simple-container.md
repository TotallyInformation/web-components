---
title: simple-container
description: >
  A Zero dependency web component that acts as a flexible container for other HTML elements.
created: 2025-05-29 16:02:09
updated: 2025-06-07 21:55:56
author: Julian Knight (Totally Information)
status: alpha # alpha, beta, live
demo: /tests/alpha/simple-card
---

A flexbox container that can be used to hold other components or HTML content. It is a simple wrapper that allows you to create a flexible layout without needing to write any CSS.

## Useage

```html
<simple-container>
    <simple-card>This is a simple card.</simple-card>
    <simple-card>This is another simple card.</simple-card>
</simple-container>
```

## Attributes & Properties

### Attributes

All of the attributes are optional.

* Attributes specific to this component

  * None.

* Attributes inherited from the `BaseComponent`:

  * `inherit-style` - Load external styles into component. If present but empty, will default to './index.css'. Optionally give a URL to load.
  * `name` - HTML name attribute. Included in output _meta prop.

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

  * `{string} componentVersion` Static. The component version string (date updated). Also has a getter that returns component and base version strings.

> [!NOTE]
> Static properties have to be accessed via the component's classname. e.g. `SimpleContainer.componentVersion`

## Slots

None.

> [!NOTE]
> Slots are used to allow the component to accept HTML content. By default, the main slot, if defined, will contain any content between the opening and closing tags of the component. You can also define named slots to allow for more complex content arrangements.

## Styling


### Inheriting Styles

This component uses the Shadow DOM to encapsulate its styles. This means that the component will not inherit styles from the main document. However, you can still style the component using [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). You can also use the `inherit-styles` attribute to allow the component to inherit styles from a style link (usually the same as the main page's style sheet).

### CSS Variables

The following CSS variables are available for styling:

N/A

## Events

The standard events for this library of components are also available:

* `simple-container:connected` - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
* `simple-container:ready` - Alias for connected. The instance can handle property & attribute changes
* `simple-container:disconnected` - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
* `simple-container:attribChanged` - When a watched attribute changes. `evt.details.data` contains the details of the change.

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

None.

#### Examples



## Original Requirements

* [ ] 

## Nice-to-have features

Possibly in future versions.

* [ ] 


## Design References

* 
