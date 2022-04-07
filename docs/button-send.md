---
title: button-send
description: >
  A Zero dependency button web component that sends a msg or a document event when clicked.
created: 2022-04-07 17:42:42
lastUpdated: 2022-04-07 17:42:47
---

Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Usage

### Without uibuilder

#### index.html

```html
<!doctype html>
<html lang="en"><head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Can load the web components here as type=module but you have to load them in the right order.
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

    <script defer src="../uibuilder/vendor/socket.io/socket.io.js"></script>
    <script defer src="./uibuilderfe.js"></script>

    <!-- Can load the web components here as type=module but you have to load them in the right order.
         Alternatively, use a dynamic import in index.js 
         Loading after installation to uibuilder Library manager -->
    <script type="module" async src="../uibuilder/vendor/@totallyinformation/web-components/components/button-send.js"></script>

    <script defer src="./index.js"></script> 

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

// Adjust to the correct URL - this shows how to load with uibuilder v5+
// Alternatively, load these as scripts in html with type=module
//import('../uibuilder/vendor/@totallyinformation/web-components/components/button-send.js')

// Start up uibuilder
uibuilder.start() 

// Listen for incoming messages from Node-RED
// uibuilder.onChange('msg', function (msg) {
//     console.log('>> msg recvd >>', msg)
// })

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

## Attributes

| Attribute | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| `data-*`  | `string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `id`      | `string` | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `name`    | `string` | Optional. HTML name attribute. Included in output _meta prop. |
| `topic`   | `string` | Optional. Topic string to use. Mostly for node-red messages |

## Properties

| Property  | Attribute | Type          | Description                                      |
|-----------|-----------|---------------|--------------------------------------------------|
| `payload` | `payload` | `any\|string` | Can be an attribute or property. If used as property, must not use payload attribute in html, aAllows any data to be attached to payload. As an attribute, allows a string only. |

## Methods

| Method | Type                                             | Description                                      |
|--------|--------------------------------------------------|--------------------------------------------------|
| `$`    | `(selection: keyof HTMLElementTagNameMap): HTMLElement \| HTMLObjectElement \| HTMLAnchorElement \| ... 66 more ... \| null` | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |

## Events

| Event               | Type                                             | Description                                      |
|---------------------|--------------------------------------------------|--------------------------------------------------|
| `button-send:click` | `CustomEvent<{ topic: any; payload: any; _meta: { id: string; name: string \| null; data: { [x: string]: string \| undefined; }; }; }>` | Document object event. evt.details contains the data |
| `uibuilder.send`    | `function`                                       | Sends a msg back to Node-RED if uibuilder available. topic, payload and _meta props may all be set. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available. |