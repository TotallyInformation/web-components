---
title: data-list
description: >
  A Zero dependency web component lets you create a ul or ol list from a JavaScript object or array.
created: 2022-04-24 16:57:57
lastUpdated: 2025-05-30 13:44:55
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

## Attributes & Properties

### Attributes

All of the attributes are optional.

* Attributes specific to this component

  * `keyvalueseparator` - OPTIONAL. The separator to use between the key and value when input is an object rather than an array. Defaults to `" :: "`. Set to `"NULL"` to disable display of the keys.
  * 💫`listvar` - OPTIONAL. The name of a global variable to use to generate the list. If not specified, the component will use the `data` property which you will need to set directly using JavaScript. No default.
  * 💫`listStyle` - OPTIONAL. The style type to use for the list. Default is `disc` for `ul` and `decimal` for `ol`. May contain any valid CSS list-style string value. When set, will change the `--list-style` CSS variable.
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

The component has a main slot that can be used to provide additional content. The slot content will be displayed above the list.

> [!NOTE]
> Slots are used to allow the component to accept HTML content. By default, the main slot, if defined, will contain any content between the opening and closing tags of the component. You can also define named slots to allow for more complex content arrangements.

## Styling

### Inheriting Styles

This component uses the Shadow DOM to encapsulate its styles. This means that the component will not inherit styles from the main document. However, you can still style the component using [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). You can also use the `inherit-styles` attribute to allow the component to inherit styles from a style link (usually the same as the main page's style sheet).

### CSS Variables

The following CSS variables are available for styling:

* `--list-style` - Maps directly to the `list-style` CSS property. Defaults to `disc` for unordered lists and `decimal` for ordered lists. This is set by the `listStyle` attribute. However, you can override it in your own stylesheets and/or HTML if you wish.

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

### Browser to Node-RED

None.

### Node-RED to Browser

None.

#### Examples



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

Possibly in future versions.

* [ ] Allow direct update of data from a uibuilder msg.


## Design References

* None.








### With uibuilder

#### index.html

NB: Same as the non-uibuilder version.

```html
<!doctype html>
<html lang="en"><head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Can load the web components here as type=module but you have to load everything in the right order.
         Alternatively, use an import in index.js -->
    <!-- <script type="module" async src="https://cdn.jsdelivr.net/gh/totallyinformation/web-components@main/components/button-send.js"></script> -->

    <script type="module" async src="./index.js"></script> 

</head><body>

<div>
    <!-- The simplest use. Apply the data in your index.js. Give it an ID to make it easier to reference. -->
    <definition-list id="dl1"></definition-list>

    <!-- If you give it a name, it will be used as its ID but with spaces replace with underscores. -->
    <data-list name="jims list">Jim's Simple List</data-list>

    <!-- If you don't give an ID or name, the component will apply an ID for you. -->
    <data-list>Simple List</data-list>
</div>

</body></html>
```

#### index.js

```js
/** Main app script
 * NOTES: 
 * - Any imports are relative to THIS script.
 */

// Load the uibuilder client library - to load here, you have to use the module version.
import '../uibuilder/vendor/@totallyinformation/web-components/libs/uibuilder.module.js'  // Does NOT LOAD any exports

// Load the component. The component self-registers & adds the `DataList` object to the `window` global.
import '../uibuilder/vendor/@totallyinformation/web-components/components/data-list.js'

// Start uibuilder
uibuilder.start()

// Get a reference to your data-list tag
const dl1 = $('#dl1')

/** Initialise the data-list using an Object.
 * Uses uibuilder's $ shortcut to reference.
 * When using an object, each `<li>` will have its id set to the key & the slot text to the value.
 * If you use an array, each `<li>` will get a numbered id.
 */
dl1.data = {
    "one": "This is the first list entry",
    "two": "This is the second list entry",
    "three": "This is the third list entry",
}

// Change one of the entries in the list from a uibuilder msg from Node-RED
uibuilder.onTopic('update dl1', function(msg) {
    console.log('>> onTopic `update dl1` >>', msg)

    dl1.entry(msg.entryRef, msg.payload)
})

/* Example msg
    {
        "topic": "update dl1",
        "entryRef": "two",
        "payload": "This is the second entry amended"
    }
*/
```
