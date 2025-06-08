---
title: edgewise-meter
description: >
  ???.
created: 2025-06-07 22:07:07
lastUpdated: 2025-06-07 22:07:15
status: pre-alpha # alpha, beta, live
---

## Usage

Loading the component library and add <code>&lt;todo-app>&lt;/todo-app></code> to your HTML. 

Then provide a global array variable to hold the tasks. This variable will be persisted in the browser's local storage. But, in real use, you would probably also want to use a database or some other form of external storage.

The `todo-app` is enhanced for use with UIBUILDER for Node-RED. In that environment, you can easily send a task list to connecting browser clients. Any updates done by the client will be automatically sent back to Node-RED.

An example Node-RED flow will be available in the Node-RED library if you are using UIBUILDER.

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
    <todo-app id="dl1"></todo-app>

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
import '../uibuilder/vendor/@totallyinformation/web-components/components/todo-app.js'


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

## Original requirements and design notes

### Front-end

* Requires a modern browser (ES6+), no IE support. Targetting ES2019+.
* Must be a single web component.
* Must be useable both as a traditional library and as an ES Module.
* Must work on mobile
* Must use browser storage for offline use
* May use web workers for heavy processing & networking
* May be enhanced for use with UIBUILDER for Node-RED for all front-end to back-end real-time communication
* Views:

    * List (with hierarchy)
    * Kanban
    * Calendar
    * Drag & Drop
    * Control forward view (how many days/months forward for dated tasks)

* Entry content

    * Title
    * Group (maps to Kanban column?)
    * Tags (with highlighting)
    * Project
    * Parent/Child
    * Start & Due dates (possibly with separate proposed/actual?)
    * Completion date
    * Repeat options (repeating tasks, eg car insurance, etc)
    * Priority
    * Task List
    * Must allow Markdown in description and notes at least

### Back-end (Node-RED only)

* Permanent storage
* API to update/report independently to the main UI
* Repeating task processor
* Task notifications
* Optional use of Node-RED v4+ and uibuilder v7.2+, assumes Node.js v20+
