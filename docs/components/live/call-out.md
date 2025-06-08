---
title: call-out
description: |
  A Zero dependency web component that displays GitHub/Obsidian style callout boxes.
created: 2025-01-14 16:51:19
updated: 2025-05-29 15:29:05
status: live # alpha, beta, live
---

Callouts are also known as "admonitions" or "alerts". They are used to draw attention to specific content.

They typically have a title with an optional icon and a body. The body can contain any content. They are also typically coloured to indicate the type of content.

## Useage

```html
<call-out></call-out>
```

## Attributes & Properties

### Attributes

All of the attributes are optional.

* `inherit-style` - Load external styles into component. If present but empty, will default to './index.css'. Optionally give a URL to load.
* `name` - HTML name attribute. Included in output _meta prop.

### Properties

Each attribute has a corresponding property. You can set the property directly in JavaScript or by using the `setAttribute` method. Note that setting the property will not change the attribute


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
> Static properties have to be accessed via the component's classname. e.g. `CallOut.componentVersion`

## Slots

The default component slot is used for the content of the callout box.

## Styling


### Inheriting Styles

This component uses the Shadow DOM to encapsulate its styles. This means that the component will not inherit styles from the main document. However, you can still style the component using [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). You can also use the `inherit-styles` attribute to allow the component to inherit styles from a style link (usually the same as the main page's style sheet).

### CSS Variables

The following CSS variables are available for styling:


## Events

The standard events for this library of components are also available:

* `call-out:connected` - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
* `call-out:ready` - Alias for connected. The instance can handle property & attribute changes
* `call-out:disconnected` - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
* `call-out:attribChanged` - When a watched attribute changes. `evt.details.data` contains the details of the change.

NOTE that event listeners can be attached either to the `document` or to the specific element instance. Use `document.addEventListener` if your web app might be adding new instances of the component dynamically.

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

These methods can be used from JavaScript by first getting a reference to the appropriate element instance. As shown in the examples.

### Utility

* `uibSend(evtName, data)` - If using this component with UIBUILDER for Node-RED, this method will send a message back to Node-RED.
  
  `evtName` is added to `let-gauge:` as the `msg.topic`.
  
  `data` is sent as the `msg.payload`. It can take any serialisable data.

### Standard methods

`CallOut.version()` will return a string containing both the component version and the base class version.

## Extensions for UIBUILDER for Node-RED

### Browser to Node-RED

None.

### Node-RED to Browser

You can send messages to the component from Node-RED via the `uibuilder` node. The `msg.topic` should be set to the `call-out::<htmlid>` (note the double `:`). Where `<htmlid>` is the HTML ID of the component instance. If you have not set an id manually, the component automatically creates one for you in the format `call-out-<number>` where number is derived from a count of the components on the page (counting from top to bottom).

The `msg.payload` should be an object containing the component properties you want to change.

#### Examples

```json
{
  "topic": "call-out-1",
  "payload": {
    "value": 50
  }
}
```

## Original Requirements

* [x] Focus on callout types that overlap with GitHub and Obsidian.
* [x] Allow for a title and body.
* [x] Allow for an icon.
* [x] Set colour for each pre-defined type.
* [x] Allow for custom colours.
* [x] Allow override of the title.
* [x] Allow override of the icon.
* [x] Allow for custom callout types.

## Nice-to-have features

Possibly in future versions.

* [ ] Use a css var for background transparency
* [ ] Allow for a different background in the head
* [ ] Use html in head, not just text.
* [ ] Allow for image icons
* [ ] use uib-brand css variables with fallbacks
* [ ] Consider backgrounds matching the color but with transparency
* [ ] Move initial processing to connected callback, add setters for type/icon/title and may changes dynamically, change attrib chg to dynamic upds


## Design References

* [Obsidian](https://help.obsidian.md/Editing+and+formatting/Callouts)
* [GitHub](https://github.blog/changelog/2023-12-14-new-markdown-extension-alerts-provide-distinctive-styling-for-significant-content/)
