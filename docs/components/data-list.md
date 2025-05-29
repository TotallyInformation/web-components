---
title: data-list
description: >
  A Zero dependency web component lets you create a ul or ol list from a JavaScript object or array.
created: 2022-04-24 16:57:57
lastUpdated: 2025-05-29 20:32:10
status: alpha # alpha, beta, live
---

Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Usage

You can use this with or without Node-RED and uibuilder but it is most use when used with uibuilder.

When used without uibuilder, you need to detect the custom event that is fired on the document object.

### Without uibuilder

#### index.html

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
    <data-list id="dl1"></data-list>

    <!-- If you give it a name, it will be used as its ID but with spaces replace with underscores. -->
    <!-- <data-list name="jims list">Jim's Simple List</data-list> -->

    <!-- If you don't give an ID or name, the component will apply an ID for you. -->
    <!-- <data-list>Simple List</data-list> -->
</div>

</body></html>
```

#### index.js

```js
/** Main app script
 * NOTES: 
 * - Any imports are relative to THIS script.
 */

// Load the component. The component self-registers & adds the `DataList` object to the `window` global.
import '../uibuilder/vendor/@totallyinformation/web-components/components/data-list.js'

// Get a reference to your data-list tag
const dl1 = document.querySelector('#dl1')

// Initialise the data-list.
dl1.data = {
    "one": "This is the first list entry",
    "two": "This is the second list entry",
    "three": "This is the third list entry",
}

// Change one of the entries in the list after 4 seconds
setTimeout(function(){

    dl1.entry('two', 'This is the second entry amended')

}, 4000)
```

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

----

The remainder of this documentation is produced using [web-component-analyzer](https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc)

TBC
