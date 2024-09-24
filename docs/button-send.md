---
title: button-send
description: |
  A Zero dependency button web component that sends a msg or a document event when clicked.
created: 2022-04-07 17:42:42
updated: 2024-09-24 19:39:33
---

> [!NOTE]
> STATUS: Beta - ready for basic use

Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

If using UIBUILDER for Node-RED, the button sends a message back to Node-RED with content very similar to using the `uibuilder.eventSend(event)` function.

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

    <script defer src="https://cdn.jsdelivr.net/gh/totallyinformation/web-components@master/dist/button-send.iife.min.js"></script>
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
//#region ---- <button-send> ----

// Get a DYNAMIC reference to all the buttons
const buttons = document.getElementsByTagName('button-send')

/** Add an object payload to the 2nd button
 * If we want to pass a complex payload, we have to use this method
 * because element attributes can only be a string.
 */
buttons[1].payload = {
    "a":"one",
    "b":"two"
}

/** Listen for the custom click event from either button.
 * Not needed when using UIBUILDER unless you want to process the click in front-end code
 * e.detail contains the same data as the msg to uibuilder
 */
document.addEventListener('button-send:click', function (event) {
    console.log('>> EVENT button-send:click >>', event.detail)
})

//#endregion ---- <button-send> ----
```

### With uibuilder

#### index.html

```html
<!doctype html>
<html lang="en"><head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../uibuilder/images/node-blue.ico">

    <title>Testing web-components - Node-RED uibuilder</title>
    <meta name="description" content="Node-RED uibuilder - Testing web-components">

    <!-- Your own CSS -->
    <link type="text/css" rel="stylesheet" href="./index.css" media="all">

    <!-- NOTE: Load component libraries AFTER uibuilder. Load your custom JS at the end -->
    <script defer src="../uibuilder/uibuilder.iife.min.js"></script>
    <script defer src="../uibuilder/vendor/@totallyinformation/web-components/dist/button-send.iife.min.js"></script>
    <script type="module" async src="./index.js"></script>
    
</head><body class="uib">
    
    <h1 class="with-subtitle">Testing Totally Information's web-components package</h1>
    <div role="doc-subtitle">Using the uibuilder ESM library.</div>

    <div id="more"><!-- '#more' is used as a parent for dynamic HTML content in examples --></div>

    <article>
        <h2><code>button-send</code></h2>
        <div>
            <button-send inherit-style topic="my-topic" payload="my payload" data-something="Something from the button">
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
            <button-send topic="my-topic2" name="btn-2" data-something="Something 2 from the button">
                Send
            </button-send>
        </div>    
    </article>    

</body></html>
```

#### index.js

```js
//#region ---- <button-send> ----

// Grab a static reference to all the buttons
const buttons = $$('button-send')
// Or get a DYNAMIC reference to all the buttons
// const buttons = document.getElementsByTagName('button-send')

/** Add an object payload to the 2nd button
 * If we want to pass a complex payload, we have to use this method
 * because element attributes can only be a string.
 */
buttons[1].payload = {
    "a":"one",
    "b":"two"
}

/** Listen for the custom click event from either button.
 * Not needed when using UIBUILDER unless you want to process the click in front-end code
 * e.detail contains the same data as the msg to uibuilder
 */
document.addEventListener('button-send:click', function (event) {
    console.log('>> EVENT button-send:click >>', event.detail)
})

//#endregion ---- <button-send> ----
```

----

The remainder of this documentation is produced using [web-component-analyzer](https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc)

## Attributes

| Attribute | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| `data-*`  | `string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `id`      | `string` | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `name`    | `string` | Optional. HTML name attribute. Included in output _meta prop. |
| `inherit-style` | `string` | Optional. Load an external style sheet into the Shadow DOM. |

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
