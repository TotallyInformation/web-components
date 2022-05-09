# Documentation for uibuilder.module.js

## How to use

This version of the library _has_ to be used as a module.

### The quick guide

In `index.html`:

```html
<!doctype html>
<html lang="en"><head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>TotallyInformation - Node-RED uibuilder</title>
    <meta name="description" content="Node-RED uibuilder - TotallyInformation">
    <link rel="icon" href="./images/node-blue.ico"> 

    <link type="text/css" rel="stylesheet" href="./index.css" media="all">

    <script type="module" async src="./index.js"></script> 

</head><body class="uib">
    
    <!-- Your custom HTML -->
    
</body></html>
```

In `index.js`

```javascript
import {uibuilder} from './uibuilder.module.js'
uibuilder.start()

// ... your custom code ...

window.onload = (ev) => {
    // Put code in here if you need to delay it until everything is really loaded and ready.
    // You probably won't need this most of the time.
}

```

### More information

Because the library has to be loaded as a module, it no longer needs an IIFE wrapper. Modules are already isolated. This has greatly simplified the code.

The library consists of a new class `Uib`. That class is auto-instanciated on load. If loading via a script tag, the `window.uibuilder` global is set. However, it is best to load from your own module code. In doing so, you have the option to load both the raw class as well as the `uibuilder` instance. `import {Uib, uibuilder} from './uibuilder.module.js'`

It also adds `window.$` as long as it doesn't already exist (e.g. if you already loaded jQuery). `$` is bound to `document.querySelector` which means that you can use it as a shortcut to easily reference HTML entities in a similar way to a very simplisting jQuery. e.g. `$('#button1').innerHTML = 'boo!'`.

!> Please note that this version requires a browser supporting ES2019. This is probably only an issue if you are stuck on Internet Explorer or on a version of Apple Safari <15.1.

Because you should ideally be loading uibuilder in your own module code. For example `<script type="module" async src="./index.js"></script>` in your `index.html` `head` section and then `import {Uib, uibuilder} from './uibuilder.module.js'` in your `index.js` file. You can now choose to use a different name for the uibuilder library if you wish. For example `import {uibuilder as uib} from './uibuilder.module.js'` will give you a `uib` object instead. Use as `uib.start()`, etc. However, you should note that, at present, the global `uibuilder` object is actually still loaded so make sure that you only use one or the other copy. This is because it does not appear to be possible to detect whether a module has been loaded from a script tag in HTML or from an import statement in JavaScript. Really, only in the former case should the global be set and while `window.uibuilder` is checked for to ensure that it isn't loaded again, when using an `import`, you are in a different module context.

In addition, you could do just `import {Uib} from './uibuilder.module.js'` and then do `const uibuilder = new Uib()`. Not sure why you might want to do that but it is possible anyway.

## What is not yet working

There are some features from the old `uibuilderfe.js` library that haven't (yet) made it into this new library. It should be noted that some may never come back as they may have been superceded.

* Minimised, non-ES2019 and non-ECMA-module versions
  
  A minimised version will certainly be made available for you to use in production environments.

  Other versions may be made available if I can work out how to deliver them.

* Ability to load JavaScript and CSS from a msg send from Node-RED.
  
  This will almost certainly return. Though possbily in a different format. It can be worked around by watching for an appropriate msg and adding the script dynamically with something like `document.getElementsByTagName('body')[0].appendChild(newScript)` and `document.head.appendChild(newStyles)`.

  Obviously care must always be taken with a feature like this since it may open your UI to security issues.

* `Toast` - the ability to show a pop-over `toast` message.
  
  This will almost certainly return but possibly in a very different format. This was only ever a convenience anyway and future developments should see better ways of achieving the same ends.

* VueJS specific features.
  
  To be honest, these are unlikely to ever return in their previous form. I am focussed on a more generic approach to adding and using dynamic web components. Hopefully, that approach should work no matter what framework is being used. The previous Vue features were tied to bootstrap-vue and VueJS v2.

  These features were only ever a convenience and should hopefully no longer be needed in the future.

---

## Features

### Exposes global uibuilder and $

For ease of use, both `uibuilder` and `$` objects are added to the global `window` context unless they already exist there.

### start function

The start function is what kick-starts the uibuilder front-end library into action. It attempts to make a connection to Node-RED and exchanges the initial control messages.

It attempts to use some cookie values passed from Node-RED by uibuilder in order to work out how to connect the websocket (actually uses Socket.IO).

Normally, you will not have to pass any options to this function (unlike the equivalent function in the older `uibuilderfe.js` library before uibuilder v5). However, see the troubleshooting section if you are having problems connecting correctly.

If you do need the options, there is now only a single argument with only two possible properties:

```javascript
uibuilder.start({
    ioNamespace: '/components-html', // Will be the uibuilder instance URL prefixed with a leading /
    ioPath: '/uibuilder/vendor/socket.io', // Actual path may be altered if httpNodeRoot is set in Node-RED settings
})
```

### $ function

uibuilder adds the global `$` function when loaded if it can (it won't do it if `$` is already present, such as if jQuery has been loaded before uibuilder). This is for convenience.

The `$` function acts in a similar way to the version provided by jQuery. It is actually bound to [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) which lets you get a reference to an HTML element using a CSS selector.

!> Note that this function will only ever return a **single** element which is differnt to jQuery. You can always redefine it to `querySelectorAll` using `window.$ = document.querySelectorAll.bind(document)` should you need to.

If multiple elements match the selection, the element returned will be the first one found.

Example. With the HTML `<button id="button1">Press me</button>` and the JavaScript `$('#button1').innerHTML = 'boo!'`. The label on the button will change from "Press me" to "Boo!".

See the [MDN documentation on CSS query selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors) for details on selecting elements.

### onChange/cancelChange functions

The `onChange` function will be familiar if you have used previous versions of the `uibuilderfe.js` library. However, it works in a very different way now. The most important change is that it now returns a reference value that can be used to cancel the listener if you need to.

Here are some useful examples:

```javascript
let ocRef = uibuilder.onChange('msg', function(msg) {
    console.log('>> onChange `msg` >>', this, msg)
    // ... do something useful with the msg here ...
})
let ocRefPing = uibuilder.onChange('ping', function(data) {
    console.log('>> onChange `ping` >>', data)
    // ... do something useful with the msg here ...
})
uibuilder.onChange('ioConnected', function(isConnected) {
    console.log('>> onChange `ioConnected` >>', isConnected)
    // ... do something useful with the msg here ...
})
// ... or anything else that is changed using the `set` function ...
```

The `cancelChange` function lets you turn off the event responders:

```javascript
uibuilder.cancelChange('msg', ocRef)
uibuilder.cancelChange('ping', ocRefPing)
```

### onTopic/cancelTopic functions

This is a convenience function pair that lets you take action when a message from Node-RED contains a specific topic. It may save you some awkward coding where you find yourself using `onChange` to listen for `msg` changes but then have to have a long-winded `if` or `switch` statement around the `msg.topic`. That is no longer necessary. Instead just use several different `onTopic` functions.

For example, a message from Node-RED such as `{topic: 'mytopic', payload: 42}` could be actioned using the following code:

```javascript
let otRef = uibuilder.onTopic('mytopic', function(msg) {
    console.log('>> onTopic `mytopic` >>', this, msg)
    // ... do something useful with the msg here ...
})
```

Note that the `onTopic` function returns a reference value. For the most part, this is not required. However, if for some reason, you need to be able to cancel the listener, you can do so with:

```javascript
uibuilder.cancelTopic('mytopic', otRef)
```

It is also worth noting that, as written above, you will see that the console message shows 2 copies of the msg. That is because the value of `this` within the callback function is also set to the `msg`. Obviously, this is not accessible if you use an arrow function as with:

```javascript
let otRef = uibuilder.onTopic('mytopic', (msg) => {
    console.log('>> onTopic `mytopic` >>', this, msg)
    // ... do something useful with the msg here ...
})
```

Because `this` now points to the parent and not to the callback function. You could use a bound function if you really wanted the correct `this` when using an arrow function but at present, there is no real value in doing that as the content of `this` is identical to the `msg` argument. That may change in future releases.

### Internal logging

Internal logging is much improved over previous versions of this library. There is now a dedicated internal `log` function which adds colour highlighting to browsers that support it in the dev tools console. That includes all Chromium-based browsers and Firefox.

You can alter the amount of information that the uibuilder library outputs to the console by changing the `logLevel` with `uibuilder.logLevel = 4` where the number should be between 0 and 5. you can set that at any time in your code, however it will generally be most useful set _before_ calling `uibuilder.start()`.

The default level is set to 2 (info). The levels are: 0 'error', 1 'warn', 2 'info', 3 'log', 4 'debug', 5 'trace'.

Changing the log level outputs an info note to the console telling you what the level is.

At present, this log function is not available to your own code.

### document-level events

In previous versions of the library, a custom event feature was used. In this version, we make use of custom DOM events on the `document` global object.

Each event name starts with `uibuilder:` to avoid name clashes.

The two current events are (other events may be added later):

* `uibuilder:stdMsgReceived`
* `uibuilder:propertyChanged`

You can watch for these events in your own code using something like:

```javascript
document.addEventListener('uibuilder:propertyChanged', function (evt) {
    console.log('>> EVENT uibuilder:propertyChanged >>', evt.detail)
})
```

In each case, `evt.detail` contains the relevant custom data.

In general, you should not need to use these events. There are more focused features that are easier to use such as `onChange` and `onTopic`.

### setPing function

`setPing` accesses a special endpoint (URL) provided by uibuilder. That endpoint returns a single value which really isn't of any use to your code. However, it _does_ do two useful things:

1. It tells the server that your browser tab is alive. 
   
   This may be useful when working either with a reverse Proxy server or with uibuilder's ExpressJS middleware for authentication and/or authorisation.

   Because most communication with uibuilder happens over websockets, telling the server whether a client is still active or whether the client's session has expired is challenging. A ping such as this may be sufficient for the proxy or your custom middleware code to continue to refresh any required security tokens, etc.

2. It returns the uibuilder/Node-RED HTTP headers.

   Normally, the web server headers cannot be accessed by your custom JavaScript code. However, the ping function uses the `Fetch` feature available to modern browsers which does return the headers.

   You can watch for ping responses as follows:

   ```javascript
    uibuilder.setPing(2000) // repeat every 2 sec. Re-issue with ping(0) to turn off repeat.
    uibuilder.onChange('ping', function(data) {
        console.log('>> PING RESPONSE >>', data)
    })
    // Output:
    //    pinger {success: true, status: 201, headers: Array(6)}

    // Turn off the repeating ping with
    uibuilder.setPing(0)
   ```

   The headers are included in the data object.

### set function

the `uibuilder.set()` function is now more flexible than in `uibuilderfe.js`. You can now set anything that doesn't start with `_` or `#`.

!> Please note that there may be some rough edges still in reguard to what should and shouldn't be `set`. Please try to avoid setting an internal variable or function or bad things may happen 😲

This means that you can simulate an incoming message from Node-RED with something like `uibuilder.set('msg', {topic:'uibuilder', payload:42})`.

One interesting possibility is getting your page to auto-reload using `uibuilder.set('msg', {_uib:{reload:true}})`. Perhaps even more useful is the ability to very easily alter your UI on the page by using the dynamic UI feature (detailed below) `uibuilder.set('msg', {_ui:[{method:'add', ...}, {method:'remove', ....}]})`.

Using the `set` function triggers an event `uibuilder:propertyChanged` which is attached to the `document` object. This means that you have two different ways to watch for variables changing.

This will listen for a specific variable changing:

```javascript
uibuilder.onChange('myvar', (myvar) => {
    console.log('>> MYVAR HAS CHANGED >>', myvar)
})
// ...
uibuilder.set('myvar', 42)
// Outputs:
//     >> MYVAR HAS CHANGED >> 42
```

Whereas this will listen for anything changing:

```javascript
document.addEventListener('uibuilder:propertyChanged', function (evt) {
    // evt.detail contains the information on what has changed and what the new value is
    console.log('>> EVENT uibuilder:propertyChanged >>', evt.detail)
})
// ...
uibuilder.set('myvar', 42)
// Outputs:
//     >> EVENT uibuilder:propertyChanged >> {prop: 'myvar', value: 42}
```

### Page auto-reload

By sending a message such as `{_uib:{reload:true}}` from Node-RED, you can make your page reload itself. This is already used by the uibuilder file editor. But you can add a flow in Node-RED that consists of a watch node followed by a set node that will create this message and send it into your uibuilder node. This will get your page to auto-reload when you make changes to the front-end code using an editor such as VSCode. This is what a dev server does in one of the many front-end frameworks that have build steps. You don't need a build step though and you don't need a dev server! 😎

### setStore, getStore, removeStore functions

Stores & retrieves information in the browser's localStorage if allowed. localStorage will survive page reloads as well as tab, window, browser, and machine restarts. However, whether storage is allowed and how much is decided by the browser (the user) and so it may not be available or may be full.

Applies an internal prefix of 'uib_'. Returns `true` if it succeded, otherwise returns `false`. If the data to store is an object or array, it will stringify the data.

Example

```javascript
uibuilder.setStore('fred', 42)
console.log(uibuilder.getStore('fred'))
```

To remove an item from local storage, use `removeStore('fred')`.

### send function

The send function sends a message from the browser to the Node-RED server via uibuilder.

```javascript
uibuilder.send({payload:'Hello'})
```

There is an optional second parameter that specifies an originating uib-send node. Where present, it will return a message back to the sender node. To make use of the sender id, capture it from an incoming message.

### eventSend function

Takes an suitable event object as an argument and returns a message to Node-RED containing the event details along with any data that was included in `data-*` attributes and any custom properties on the source element.

`data-*` attributes are all automatically added as a collection object to `msg.payload`. 

All custom properties under `<element>._ui` are automatically added as a collection to `msg.uiprops`.

Note: Only the `<element>._ui` property is considered for custom properties. This is used by the data-driven UI feature. If you are adding your own custom properties to an element, please attach it to `<element>._ui` to avoid namespace clashes.

#### Plain html/javascript example.

In index.html

```html
<button id="button1" data-life="42"></button>
```

In index.js 

```javascript
$('#button1').onclick = (evt) => { uibuilder.eventSend(evt) }
```

#### VueJS/bootstrap-vue example

In index.html

```html
<b-button id="myButton1" @click="doEvent" data-something="hello"></b-button>
```

In index.js VueJS app `methods` section

```javascript
    // ...
    methods: {
        doEvent: uibuilder.eventSend,
    },
    // ...
```

### Auto-loading of the Socket.IO client

In previous versions of the front-end library, you had to load the correct Socket.IO library yourself in your index.html. This is no longer the case as the correct client is now loaded for you. This is one of the benefits of working as an ECMA module.

---

## Dynamic, data-driven HTML content

This version of the uibuilder front-end library supports the dynamic manipulation of your web pages. This is achieved either by loading a JSON file describing the layout and/or by sending messages from Node-RED via a uibuilder node that contain a `msg._ui` property.

Please see the next section for details.

### Dynamic content details

Dynamic, data-driven UI manipulation is supported directly by this uibuilder front-end library. You can either control the UI via messages sent from Node-RED as shown in the next section, or you can also load a UI from a web URL that returns JSON content in a similar format.

You can also manipulate the UI from within your own front-end code by simulating the receipt of node-red messages (`uibuilder.set('msg', {_ui: [{ ... }]})`).

It is best practice to always include a method-level parent (`_ui[n].parent`) even if you want to attach everything to the `<body>` tag (CSS Selector `body`).

#### Initial load from JSON URL

This is optional but may be useful to pre-populate the dynamic UI.

It is triggered using the command `uibuilder.loadui(<URL>)` where `<URL>` is the URL that will return JSON formatted content in the format described here.

`uibuilder.loadui` can run before `uibuilder.start`. It is best to run it as early as possible.

A common way to provide an initial UI would be to create an `index.json` file in the same folder as your `index.html` file. You can then use `uibuilder.loadui('./index.json')` to get your initial UI on the page. A possible alternative might be to use uibuilder's instance API feature to dynamically create an API URL that returns the JSON. More commonly though, if wanting to dynamically generate the initial layout, would be to use a Node-RED flow that is triggered by a uibuilder client connection control message.

It is best practice to try and always include `id` attributes at least on every top-level component. That will enable you to easily and safely

### Dynamic changes via messages from Node-RED (or local set)

The receipt from Node-RED or local setting (`uibuilder.set('msg', {_ui: { ... }})`) of a `msg` object containing a `msg._ui` property object will trigger the uibuilder front-end library to make changes to the web page if it can.

?> Note that `msg._ui` can be either an Object (which only allows a single method call in the msg) or it can be an Array (which allows multiple method calls in a single msg).

Each method object may contain any number of component descriptors. Component descriptors can contain any number of sub-component descriptors. There is no theoretical limit to the nesting, however expect things to break spectacularly if you try to take things to extremes. If top-level components have no parent defined, they will use the parent at the method level, if that isn't defined, everything will be added to the `<body>` tag and a warning is issued. Sub-components will always be added to the parent component.

All methods and components are processed in the order they appear in the message.

### Available methods

```js
msg._ui.method = 'load' || 'add' || 'remove' || 'update'
```

* `load`: Load a new UI component using `import()` so that it can be used.
* `add`: Add a UI component instance to the web page dynamically.
* `remove`: Remove a UI component instance from the web page dynamically.
* `update`: Update the settings/data of a UI component instance on the web page.

Other future possibilities: `reset`

### Method: load

The load method allows you to dynamically load external web components, ECMA modules, and plain JavaScript.

!> Please take note of the limitations and caveats of the load method. It works well for loading web components before adding them dynamically to your UI but there are a lot of things that can catch you out. If having issues, use an import statement or a script tag.

#### Caveats and limitations

* **WARNING**: Passing code dynamically **IS** a potential security issue. Make sure that only safe code is permitted to be passed. There is no way for the front-end library to check the validity or safety of the code.

* If using a relative url, it is relative to the uibuilder client library and NOT relative to your code.

* For the `components` array

  * You cannot use this feature to load web components that you manually put into your index.html file. That is because they will load too late. Only use this where you will dynamically add a component to the page using the UI methods shown here.

  * At present, only ECMA modules (that use `export` not `exports`) can be dynamically loaded since this feature is primarily aimed at loading [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). This feature requires browser support for [Dynamic Imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports).

  * Dynamic Imports happen asynchronously. While this isn't usually a problem, the load does not wait to complete so very occasionally with a particularly complex component or on a particularly slow network, it is possible that the load will not complete before its use. In that case, simply delay the components use or move the load to earlier in the processing.

* For the `srcScripts` and `txtScripts` arrays
  
  * Scripts attached these ways generally finish loading too slowly. This means that you cannot use the load method and then use the script in an add method straight away. You would have to load the script in your HTML for that. However, you can load them, for example, in the `loadui` function and then use them later when sending `_ui` msgs from Node-RED. Typically, you will need a second or two before the script will have fully loaded.
  
  * `txtScripts` entries must be text, you cannot pass an actual JavaScript function. This is normally OK since Node-RED should convert a function to text as it pushes the data through Socket.IO.

#### Msg schema

```jsonc
{
    "_ui": {
        "method": "load",
        "components": [
            "url1", "url2" // as needed
        ],
        // Note that scripts finish loading too slowly which means that you cannot use the load
        // method and then use the script in an add method. You have to load the script in your HTML.
        // Typically, you will need a second or two before the script will have fully loaded.
        "srcScripts": [
            "https://example.com/some/script.js"
        ],
        "txtScripts": [
            "function fred() { console.log('HEY! This script loaded dynamically.') }"
        ]
    }
}
```

#### Example showing load in your own index.js

Note how this can and usually should be done _before_ calling `uibuilder.start()`.

```javascript
uibuilder.set('msg', {
    _ui: {
            "method": "load",
            "components": [
                "../uibuilder/vendor/@totallyinformation/web-components/components/definition-list.js",
                "../uibuilder/vendor/@totallyinformation/web-components/components/data-list.js",
            ]
    }
})

uibuilder.start()
```

### Method: add

The `add` method will add one or more HTML elements (components) to the page. Components are loaded in order and a component may also have nested components (which in turn can also do so, ...). 

Each component can:

* *Be attached to a specified parent element* selected via a [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) statement (e.g. `#myelementid`, `.myclass`, `li.myclass`, `div[attr|=value]`, etc). 
  
  If the selector results in multiple elements being returned, only the _first_ found element is used.

  Each component is added as a _child_ of the parent.

* *Have HTML attributes set*.
  
  Remember that HTML attributes can only contain string data.

* *Have custom properties set*. This can contain any data that can be passed via JSON. 
  
  !> Note that, because the library adds any custom property direct to the element, you need to take care not to use an existing name (such as internal DOM API names). Doing so will either fail or will have unintended side-effects.

  This allows you to pass complex data into an element, including custom web components.

* *Have the slot content filled with text or HTML*. 
  
  Slot content is what is inserted between the opening and closing tag of an element. 
  
  Slots can be specified for each individual component but if not specified and a `msg.payload` is provided, that will be used instead. This enables you to have multiple components with the same slot content if desired. The payload is not passed down to sub-components however to prevent unexpected bleed when defining tables, etc.

  Slot content set to `undefined`, `null` or `""` (empty string) is ignored.

* *Specify functions to be called for specific HTML events* (e.g. on click, mouseover, etc). 
  
  Do not include trailing `()` when specifying the function name. 
  
  Any function names used must be in a context accessible to the uibuilder library. Typically, where the library is loaded as a module, it means that the function must existing in the window (global) context. You may need to specify this in the name (e.g. `window.myfunction`). 
  
  The `uibuilder.eventSend` built-in function can also be specified. This is designed to automatically send `data-*` attributes and custom properties of the element back to Node-RED without any coding required. All of the `data-*` attributes are attached as a collection to the `msg.payload`, all of the custom properties are attached to `msg.props`.

* _Make use of [DOMPurify](https://github.com/cure53/DOMPurify)_. To sanitise `slot` HTML entries.
  
  Feeding HTML into a web page can be a security issue. However, these features absolutely need to do just that. Because you are sending data from Node-RED for the most part, there is a good chance that you have control over the data being sent and therefore the risk should be low. However, if you need/want to reduce the risk further, you can simply load the [DOMPurify](https://github.com/cure53/DOMPurify) library before you load this uibuilder front-end library. If available to the library, it will be automatically used, you don't need to do anything.

  Simply add this to your HTML before you load your uibuilder/index.js file `<script defer src="https://cdn.jsdelivr.net/npm/dompurify@2.3.6/dist/purify.min.js"></script>`. DOMPurify cannot be loaded as an ECMA module. Make sure, therefore that it loads before you load the uibuilder library.

* _Make use of the [Markdown-IT](https://markdown-it.github.io/) library_. To convert Markdown to HTML dynamically.
  
  By loading the `markdown-it` library into your index.html head `<script defer src="https://cdn.jsdelivr.net/npm/markdown-it@latest/dist/markdown-it.min.js"></script>`, uibuilder client will let you specify a `slotMarkdown` in addition to the `slot`. 

  `slotMarkdown` will be rendered into HTML as the element is rendered dynamically. The rendered HTML is inserted after any `slot` HTML.

  Notes
  
  * Little work has been done on this feature as yet so while it works, it does not have all of the highlighting and extra features you might expect from something like Docsify.
  * If available, `DOMPurify` will be used to sanitise the resulting HTML.
  * You can also make use of [HighlightJS](https://highlightjs.org/) to add code highlighting inside the usual back-tick blocks. Add a reference to the library AND an appropriate CSS file in your index.js file.

#### Msg schema

```jsonc
{
    "_ui": {
        // REQUIRED
        "method": "add",

        // Optional. All components will be added to this in order. Ignored if component provides a parent.
        "parent": "html selector",
        
        // List of component instances to add to the page - results in 1 or more HTML custom elements being added.
        "components": [
            {
                // REQUIRED. The reference name of the component (TBD: May need to be Class name rather than the element name. e.g. SyntaxHighlight rather than syntax-highlight)
                "type": "...",
                
                // Optional. Overrides master parent. If no parent given here or in outer, will be added to <body> element
                "parent": "html selector",
                
                // Optional. HTML to add to slot - if not present, the contents of msg.payload will be used. 
                // This allows multi-components to have their own slot content. 
                // However, the payload is not passed on to sub-components
                "slot": "HTML to <i>add</i> to <sup>slot</sup> instead of <code>msg.payload</code>",

                // Optional. Markdown to add to the slot. Converted Markdown is added after the standard slot.
                "slotMarkdown": "## A heading 2\n\nRendered by **marked** <sub>if loaded</sub>.\n\n```javascript\nvar x = alert('Hey Jim')\n```\n"
                
                // Optional. Each property will be applied to the element attributes
                "attributes": {
                    // Supplying this will make further updates or removals easier. MUST be unique for the page.
                    "id": "uniqueid"
                    // ... not recommended to include `onClick or similar event handlers, specify those in the events property below ...
                },

                // Optional. properties to be added to the element. Unlike attributes, these can contain any data.
                // Where used, will be added under a single <element>._ui property to help avoid name clashes.
                "properties": {
                    // ...
                },

                // Optional. DOM Events to be added to the element
                "events": {
                    // Handler functions must already exist and be in a context reachable by the uibuilder library (e.g. window)
                    // This means that functions defined in index.js, if loaded as a module, will NOT be usable.
                    // If dynamically loading a script in the same msg, make sure it is specified first in the components list.
                    // If defining in index.js when loaded as a module, add a single window.xxxx object containing all of your callback fns
                    // All callback functions are passed a single event argument but an undeclared `event` variable is also
                    //   available inside the callback functions.
                    "click": "uibuilder.eventSend"
                    // "click": "window.myCallbacks.buttonClick1"
                }

                // Optional. You can also NEST components which allows you to easily create lists and tables
                // "components": [ ... ]
            }

            // and others as desired. Each will be added in order.
        ]
    }
}
```

#### Example msgs for nested components

```jsonc
{
    "payload": "This was dynamically added 😁",
    "_ui": {
        "method": "add",
        "parent": "#start",
        "components": [
            {
                "type": "ol",
                "parent": "#start",
                "slot": "A list",
                "attributes": {
                    "id": "ol1",
                    "style": "display:block;margin:1em;border:1px solid silver;"
                },
                "components": [
                    {
                        "type": "li",
                        "slot": "A list entry"
                    },
                    {
                        "type": "li",
                        "slot": "Another list entry"
                    }
                ]
            }
        ]
    },
    "topic": "addme"
}
```

```jsonc
{
    "_ui": [
        {
            "method": "add",
            "components": [
                {
                    "type": "table",
                    "parent": "#start",
                    "attributes": {
                        "id": "t1"
                    },
                    "components": [
                        { // heading row
                            "type": "tr",
                            "components": [
                                { "type": "th", "slot": "Col 1" },
                                { "type": "th", "slot": "Col 2" },
                            ]
                        },
                        { // 1st data row
                            "type": "tr",
                            "components": [
                                { "type": "td", "slot": "Cell 1.1" },
                                { "type": "td", "slot": "Cell 1.2" },
                            ]
                        },
                        { // 2nd data row
                            "type": "tr",
                            "components": [
                                { "type": "td", "slot": "Cell 2.1" },
                                { "type": "td", "slot": "Cell 2.2" },
                            ]
                        },
                        { // a friendly caption heading
                            "type": "caption",
                            "slot": "A <b>simple</b> table example"
                        }
                    ]
                }
            ]
        }
    ]
}
```

### Method: remove

The remove method will remove the listed HTML elements from the page assuming they can be found. The search specifier is a [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) statement.

```jsonc
{
    "_ui": {
        "method": "remove",

        // List of component instances to remove from the page - use CSS Selector
        // - will remove the 1st match found so specify multiple times to remove more than one of same selector
        "components": [
            "selector1",
            "selector2"
            // and others as desired. Each will be removed in order.
        ]
    }
}
```

### Method: update

TBC

?? standardise on data set/get and entry() fn

---

## Troubleshooting

In general, uibuilder is very robust and will rarely give any problems. However, here are a few issues that have been seen in the past.

### Vendor files are not loading

If you are getting 404 errors on your vendor files (such as vue or some other front-end library), it is possible that your source file is in a sub-folder. For example, in many cases you will only have source files in `<uibRoot>/<url>/src`. However, if you try to use files in a sub-folder such as `<uibRoot>/<url>/src/myfolder/index.html`, you will need to adjust the URL references. 

As standard, it is recommended to access files using a relative URL as in `<script type="module" async src="../uibuilder/vendor/@totallyinformation/web-components/components/syntax-highlight.js"></script>` but this is incorrect for a file served from a sub-folder. In the previous example, you would need `<script type="module" async src="../../uibuilder/vendor/@totallyinformation/web-components/components/syntax-highlight.js"></script>` - note the extra level of `../`. This would need to be added to all relative URL's. 

Alternatively, you can, of course, use absolute URLs such as `<script type="module" async src="http://localhost:1880/uibuilder/vendor/@totallyinformation/web-components/components/syntax-highlight.js"></script>`, however *this isn't recommended* since it can make your code rather fragile. If you make any changes to your Node-RED environment, you might have to make changes to all of your URL's as well.

### Socket.IO refuses to connect

Assuming that the Socket.IO client library has actually loaded (check your browser's dev tools networks tab and make sure it isn't returning a 404 error), this is usually because the library cannot work out the correct path or namespace to use.

This version of the library is much better than previous versions. However, it does rely on your browser allowing first-party cookies.

This version of the library uses a simplified `options` object passed to `uibuilder.start()` should you need to pass either of these settings.

### Socket.IO repeatedly disconnects

This is usually due to you trying to pass too large a message. Socket.IO, by default, only allows messages up to 1Mb. If this is insufficient, you can change the default in `settings.js` using the `uibuilder` property:

```javascript
    // ...
    uibuilder: {
        /** Optional: Socket.IO Server options
         * See https://socket.io/docs/v4/server-options/
         * Note that the `path` property will be ignored, it is set by uibuilder itself.
         * You can set anything else though you might break uibuilder unless you know what you are doing.
         * @type {Object}
         */
        socketOptions: {
            // Make the default buffer larger (default=1MB)
            maxHttpBufferSize: 1e8 // 100 MB
        },
    },
    // ...
```

Other similar issues may occur when using a slow network or one with excessive latency. In that case, you may need to adjust the Socket.IO server's timeout value.

### Event/onChange/onTopic callbacks don't fire

Because a lot of things happen asynchronously in JavaScript, it is possible that occasionally an event handler isn't fully registed by the time that an event fires (for example on an incoming msg or a `uibuilder.set`). In these cases, you may need to put your change code into `window.onload = (evt) => { ... }`. That ensures that everything is fully loaded before your code will run.

An alternative way to work would be to load the uibuilder library using a dynamic import as in `import('./uibuilder.module.js').then( ... )` and do all of your custom processing from within the `then` callback. If your browser supports top-level async/await, you could also do `const uibuilder = await import('./uibuilder.module.js')` which will pause until uibuilder is completely loaded and ready.