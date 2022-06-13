---
title: button-send
description: >
  A Zero dependency button web component that sends a msg or a document event when clicked.
created: 2022-04-07 17:42:42
lastUpdated: 2022-06-12 15:04:46
---

Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Usage

You can use this with or without Node-RED and uibuilder but it is most use when used with uibuilder since the button will, on clicking, send a message back to Node-RED with no JavaScript code required.

When used without uibuilder, you need to detect the custom event that is fired on the document object.

### Without uibuilder

#### index.html

```html
<!doctype html>
<html lang="en"><head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Can load the web components here as type=module but you have to load everything in the right order.
         Alternatively, use a dynamic import in index.js -->
    <script type="module" async src="https://cdn.jsdelivr.net/gh/totallyinformation/web-components@master/components/button-send.js"></script>

    <script defer src="./index.js"></script> 

</head><body>

<div>
    <button-send id="btnSend" topic="my-topic" payload="my payload" 
                 data-something="Something from the button">
        <!-- In ordinary button tags, you cannot include block elements in the slot. 
             But with this custom button, you can. -->
        Send a msg back to Node-RED.
        <p>
            Use <code>topic</code>, <code>payload</code> and <code>data-*</code> 
            attributes to pass to the custom event.
        </p>
        <p>
            Note that you can't normally include block tags 
            (e.g. &lt;br>, &lt;p>, etc) in a &lt;button> but you can now!
        </p>
    </button-send>
</div>

<div>
    <!-- To have a complex payload, you can't add it here because attributes can only be strings.
            Instead, you have to use JavaScript as shown in index.js -->
    <button-send id="btnSend2" topic="my-topic2" name="btn-2" 
                 data-something="Something 2 from the button">
        Send
    </button-send>
</div>

</body></html>
```

#### index.js

```js
/** Main app script
 * NOTES: 
 * - Dynamic imports return a PROMISE. That is fine for importing components but NOT for uibuilderfe. 
 * - Any imports are relative to THIS script.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports
 */

// Adjust to the correct URL - this shows how to load direct from jsdelivr using a dynamic import.
// Alternatively, load these as scripts in html with type=module, see the index.html file.
//import('https://cdn.jsdelivr.net/gh/totallyinformation/web-components@master/components/button-send.js')

// If we want to pass a complex payload, we have to use this method
// because element attributes can only be a string.
const btn = document.getElementById('btnSend2')
btn.payload = {
    "a":"one",
    "b":"two"
}

// Listen for the custom click event. e.detail contains the same data as the msg to uibuilder
document.addEventListener('button-send:click', function (e) {
    console.log('>> EVENT button-send:click >>', e.detail)
})
```

### With uibuilder

#### index.html

```html
<!doctype html>
<html lang="en"><head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Web Components - Node-RED uibuilder</title>
    <meta name="description" content="Node-RED uibuilder - Web Components">
    <link rel="icon" href="./images/node-blue.ico"> 

    <link type="text/css" rel="stylesheet" href="./index.css" media="all">

    <script type="module" src="./index.js"></script> 

</head><body class="uib">
    
    <h1>uibuilder Web Components Example: button-send</h1>

    <div>
        <button-send id="btnSend" topic="my-topic" payload="my payload" 
                     data-something="Something from the client">
            <!-- In ordinary button tags, you cannot include block elements in the slot. 
                 But with this custom button, you can. -->
            Send a msg back to Node-RED.
            <p>
                Use <code>topic</code>, <code>payload</code> and <code>data-*</code> 
                attributes to pass data back to Node-RED.
            </p>
            <p>
                Note that you can't normally include block tags 
                (e.g. &lt;br>, &lt;p>, etc) in a &lt;button> but you can now!
            </p>
        </button-send>
    </div>

    <div>
        <!-- To send complex payload, you can't add it here because attributes can only be strings.
             Instead, you have to use JavaScript as shown in index.js -->
        <button-send id="btnSend2" topic="my-topic2" name="btn-2" data-something="Something 2 from the client">
            Send
        </button-send>
    </div>
    
</body></html>
```

#### index.js

```js
/** Main app script
 * NOTES: 
 * - Dynamic imports return a PROMISE. That is fine for importing components but NOT for uibuilderfe. 
 * - Any imports are relative to THIS script.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports
 */

import './uibuilder.esm.min.js'  // Adds `uibuilder` and `$` to globals
import '../uibuilder/vendor/@totallyinformation/web-components/components/button-send.js'

// No code is needed for the buttons to send messages back to Node-RED via uibuilder
// this happens behind the scenes in the component.

// If we want to pass a complex payload, we have to use this method
// because element attributes can only be a string.
const btn = $('.btnSend2') // Using uibuilders $() shortcut to document.querySelector
btn.payload = {
    "a":"one",
    "b":"two"
}
```

----

The remainder of this documentation is produced using [web-component-analyzer](https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc)

## Attributes

| Attribute | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| `data-*`  | `string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `id`      | `string` | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `name`    | `string` | Optional. HTML name attribute. Included in output _meta prop. |

## Properties

| Property  | Attribute | Type          | Default | Description                                      |
|-----------|-----------|---------------|---------|--------------------------------------------------|
| `payload` | `payload` | `any\|string` | ""      | Can be an attribute or property. If used as property, must not use payload attribute in html, allows any data to be attached to payload. As an attribute, allows a string only. |
| `topic`   | `topic`   | `string`      | ""      | The topic to include in the output @type {string} |

## Methods

| Method        | Type                                             | Description                                      |
|---------------|--------------------------------------------------|--------------------------------------------------|
| `$`           | `(selection: keyof HTMLElementTagNameMap): `<br>`  HTMLElement \| HTMLObjectElement \| HTMLAnchorElement \|`<br>`  ... 66 more ... \| null` | Mini jQuery-like shadow dom selector |
| `handleClick` | `(evt: MouseEvent): void`                        | fn to run when the button is clicked<br /><br />**evt**: The event object |

## Events

| Event               | Type                                             | Description                                      |
|---------------------|--------------------------------------------------|--------------------------------------------------|
| `button-send:click` | `CustomEvent<{ topic: string; payload: string \|`<br>` { [x: string]: string \| undefined; };`<br>`_meta: { id: string; name: string \|`<br>` null; data: { [x: string]: string \| undefined; }; }; }>` | Document object event. evt.details contains the data |        
| `uibuilder.send`    | `function`                                       | Sends a msg back to Node-RED if uibuilder available. topic, payload and _meta props may all be set. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available. |