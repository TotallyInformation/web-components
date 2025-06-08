---
title: data-list
description: >
  A Zero dependency web component lets you create a ul or ol list from a JavaScript object or array.
created: 2022-04-24 16:57:57
lastUpdated: 2025-06-08 13:45:04
author: Julian Knight (Totally Information)
status: live # alpha, beta, live
---

## Useage

```html
<data-list></data-list>

<!-- override bullet type -->
<data-list id="dl1" style="--list-style: disclosure-closed">
    Items added by JavaScript
</data-list>

<!-- Using object input, set to ol, override separator between key and value -->
<data-list id="dl2" listvar="mylist1" type="ol" keyvalueseparator=" - ">
    Items added by global object variable
</data-list>

<!-- Using array input, override list style (don't forget to wrap custom entries with quotes) -->
<data-list id="dl3" listvar="mylist2" liststyle="'➡️'">
    Items added by global array variable
</data-list>

<!-- Override decimal list with upper case roman numerals -->
<data-list type="ol" liststyle="upper-roman"></data-list>
```

Note that input data can be either an array or an object. If it is an object, then the keys will be displayed as well as the values. The `keyvalueseparator` attribute can be used to change the separator between the key and value. If you set it to `"NULL"`, then the keys will not be displayed.

You can create nested lists simply by using arrays or objects as list entries. A nested list will have a list-entry heading if the parent is an object and `keyvalueseparator` is not "NULL".

> [!TIP]
> Nested lists will start with the same type and styles.
>
> If you want to style a sub-list separately, you can use the class `nested-list` and the `data-depth` attribute to target specific CSS
>
> ```css
> data-list .nested-list[data-depth="2"] {
>     --list-style: square;
>     background-color: var(--warning);
> }
> ```

## Attributes & Properties

### Attributes

All of the attributes are optional.

* Attributes specific to this component

  * `keyvalueseparator` - OPTIONAL. The separator to use between the key and value when input is an object rather than an array. Defaults to `" :: "`. Set to `"NULL"` to disable display of the keys.
  * 💫`listvar` - OPTIONAL. The name of a global variable to use to generate the list. If not specified, the component will use the `data` property which you will need to set directly using JavaScript. No default.
  * 💫`liststyle` - OPTIONAL. The style type to use for the list. Default is `disc` for `ul` and `decimal` for `ol`. May contain any valid CSS list-style string value. When set, will change the `--list-style` CSS variable.
  * 💫`type` - OPTIONAL. The type of list to create. Either `ul` (unordered) or `ol` (ordered). Defaults to `ul`.

  > [!TIP]
  > `listStyle` entries must be wrapped in extra quotes if they are not keywords, e.g. `liststyle="'➡️'"` or `liststyle="decimal"`. This is because the value is a CSS variable and must be a valid CSS string.

* Attributes inherited from the `BaseComponent`:

  * `inherit-style` - OPTIONAL. Load external styles into component. If present but empty, will default to './index.css'. Optionally give a URL to load. No default.
  * `name` - HTML name attribute. Included in output _meta prop.

> [!NOTE]
> The 💫 symbol indicates that the attribute is dynamic. If changed by JavaScript, the list will be rebuilt. Technically, this means that the property has a getter and setter function.

### Properties

Each attribute has a corresponding property. You can set the property directly in JavaScript or by using the `setAttribute` method. Note that setting the property will not change the attribute

* Properties specific to this component (that don't have a corresponding attribute):

  * {object|array} 💫`data` - The data to use to generate the list. This can be an array or an object. If an object, the keys and values will be used as the list items' text separated by the `keyvalueseparator` string. If an array, each item in the array will be used as a list item. If no data is provided, the component will not display a list, only the slot content. If `listvar` is specified, the component will use that global variable to generate the list (the variable must be attached to the `window`/`globalThis` DOM object).

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
> Static properties have to be accessed via the component's classname. e.g. `DataList.componentVersion`

## Slots

This component uses the light (main) DOM and so does not have a slot. However, the list is generated _below_ any existing content.

> [!NOTE]
> Slots are used to allow the component to accept HTML content. By default, the main slot, if defined, will contain any content between the opening and closing tags of the component. You can also define named slots to allow for more complex content arrangements.

## Styling

### Inheriting Styles

This component uses the light (main) DOM. This means that the component will inherit styles from the main document.

It adds its own stylesheet to the TOP of the document's `<head>` so that it can be overridden by your own styles. This is useful for styling nested lists. Its styles are constrained to the `data-list` element and its children.

### CSS Variables

The following CSS variables are available for styling:

* `--list-style` - Maps directly to the `list-style` CSS property. Defaults to `disc` for unordered lists and `decimal` for ordered lists. This is set by the `listStyle` attribute.

   > [!TIP]
   > It is better to use the `listStyle` attribute to set the list style rather than using this variable directly. This is because the attribute will also update the component's internal state and trigger a rebuild of the list if necessary.
   >
   > However, you can use this variable to set a nested list style but it will be overridden if the list gets rebuilt. You can set a watch for this event though and re-apply the variable as needed.

* `--nested-indent` - The indentation for nested lists. Defaults to `40px` which is the default for all browsers. Try setting to `1em` for a less extreme and more responsive indentation.

You can override these variables either in your main CSS file or by using the `style` attribute on the component itself. For example:

```html
<data-list style="--nested-indent: 1em;"></data-list>
```

### Styling Nested Lists
Nested lists will start with the same type and styles as the parent list. If you want to style a sub-list separately, you can use the class `nested-list` and the `data-depth` attribute to target specific CSS.

```css
data-list .nested-list[data-depth="2"] {
    --list-style: '➡️';
    background-color: var(--warning);
}
```

## Events

The standard events for this library of components are also available:

* `data-list:connected` - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
* `data-list:ready` - Alias for connected. The instance can handle property & attribute changes
* `data-list:disconnected` - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
* `data-list:attribChanged` - When a watched attribute changes. `evt.details.data` contains the details of the change.

NOTE that event listeners can be attached either to the `document` or to the specific element instance. Use `document.addEventListener` if your web app might be adding new instances of the component dynamically.

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

These methods can be used from JavaScript by first getting a reference to the appropriate element instance. As shown in the examples.

* `entry(key, value)` - Add or update an entry in the list. If the key already exists, the value will be updated. If the key does not exist, a new entry will be added.  `key` should be a string for object data and an integer number for arrays.

## Extensions for UIBUILDER for Node-RED

See the end of this page for an example Node-RED flow that uses this component.

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
  "topic": "data-list::id",
  // The payload is the data to set for the component.
  "payload": {
    // Each property of the payload must match a property or attribute name of the component.
    // ...
  }
}
```

#### Examples

```json
{
  // The specific topic format routes the msg to the correct component
  // where `id` is the id of the component to control.
  "topic": "data-list::dl1",
  // The payload is the data to set for the component.
  "payload": {
    // Each property of the payload must match a property or attribute name of the component.
    "keyvalueseparator": " 💠 ",
    "liststyle": "'😎 '",
    "data": {
      "xxx": "Triple x",
      "yyy": "Triple y",
      "zzz": "triple z"
    },
    "style": "background-color: var(--surface4);"
  }
}
```

## Original Requirements

* [x] Set a data object/array from which to build a `ul` or `ol` list.
* [x] Have an attribute that defines a global variable that will set the data.
* [x] Allow for both `ul` and `ol` lists via an attribute.
* [x] Allow list text to include HTML formatting.
* [x] Allow for object input data to display both the key and value in the list text. With the ability to turn off the key display.
* [x] Allow for a key/value separator to be set via an attribute.
* [x] Allow for the list style to be set via an attribute.
* [x] Allow for the list to be styled via CSS variables.

## Nice-to-have features

* [x] Allow direct update of data from a uibuilder msg.
* [x] Allow for nested lists to be created from arrays or objects.
* [x] Allow for nested lists to be styled separately.
* [x] Use Light DOM rather than Shadow DOM so that styles can be more easily controlled.
* [ ] Add attribute to turn on list item click events. This will allow for the list items to be clickable and trigger an event (and messge back to Node-RED if using UIBUILDER).
* [ ] Add option to make sub-lists collapsible. This will allow for nested lists to be expanded or collapsed by clicking on the parent list item.
* ~~Add checkbox option to allow for checkboxes to be added to list items.~~ No, use a separate `checkbox-list` component instead.

## Design References

* None.

## Example UIBUILDER for Node-RED Flow

Import this flow into Node-RED.

```json
[{"id":"349a99ecf4a3ad8a","type":"group","z":"2c47031326e8fd01","name":"If the data-list test page is showing. Update the first list. New HTML text content is sent first and then a new list.","style":{"fill":"#e3f3d3","fill-opacity":"0.2","label":true,"color":"#000000"},"nodes":["b6221e56cb4d6652","fd5456075222084c","625003b509fdb71d","f6378b50eef90925","f9139d2d46e53071"],"x":64,"y":359,"w":702,"h":122},{"id":"b6221e56cb4d6652","type":"link out","z":"2c47031326e8fd01","g":"349a99ecf4a3ad8a","name":"link out 56","mode":"link","links":["baf98201102ea713"],"x":725,"y":400,"wires":[]},{"id":"fd5456075222084c","type":"inject","z":"2c47031326e8fd01","g":"349a99ecf4a3ad8a","name":"data-list:","props":[{"p":"str","v":"$formatNumber($random()*100, \"0.0\")\t\t","vt":"jsonata"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":170,"y":400,"wires":[["625003b509fdb71d","f9139d2d46e53071"]]},{"id":"625003b509fdb71d","type":"uib-update","z":"2c47031326e8fd01","g":"349a99ecf4a3ad8a","name":"Change dl1 text","topic":"","mode":"update","modeSourceType":"update","cssSelector":"#dl1","cssSelectorType":"str","slotSourceProp":"<p>List is replaced by a message from Node-RED.</p>","slotSourcePropType":"str","attribsSource":"","attribsSourceType":"msg","slotPropMarkdown":false,"x":370,"y":400,"wires":[["b6221e56cb4d6652"]]},{"id":"f6378b50eef90925","type":"change","z":"2c47031326e8fd01","g":"349a99ecf4a3ad8a","name":"Change dl1 list","rules":[{"t":"set","p":"payload","pt":"msg","to":"{\"keyvalueseparator\":\" 💠 \",\"liststyle\":\"'😎 '\",\"data\":{\"xxx\":\"Triple x\",\"yyy\":\"Triple y\",\"zzz\":\"triple z\"},\"style\":\"background-color: var(--surface4);\"}","tot":"json"},{"t":"set","p":"topic","pt":"msg","to":"data-list::dl1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":560,"y":440,"wires":[["b6221e56cb4d6652"]]},{"id":"f9139d2d46e53071","type":"delay","z":"2c47031326e8fd01","g":"349a99ecf4a3ad8a","name":"","pauseType":"delay","timeout":"1","timeoutUnits":"milliseconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"allowrate":false,"outputs":1,"x":390,"y":440,"wires":[["f6378b50eef90925"]]}]
```
