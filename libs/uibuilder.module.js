/*
  Copyright (c) 2017-2022 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
/**
 * This is the Front-End JavaScript for uibuilder  in HTML Module form
 * It provides a number of global objects that can be used in your own javascript.
 * @see the docs folder `./docs/uibuilderfe-js.md` for details of how to use this fully.
 * 
 * Please use the default index.js file for your own code and leave this as-is.
 */

//#region --- Type Defs --- //
/**
 * A string containing HTML markup
 * @typedef {string} html
 */
//#endregion --- Type Defs --- //

//#region --- Module-level utility functions --- //

//#region --- print/console - debugging output functions --- //
let logLevel = 1
// function changeLogLevel(level) {
//     logLevel = level
//     console.trace = logLevel < 4 ? function(){} : console.trace
//     console.debug = logLevel < 2 ? function(){} : console.debug
//     if ( logLevel < 1 ) {
//         console.log = console.group = console.groupEnd =  function(){}
//     }
// }

// Experimental
const LOG_STYLES = {
    // 0
    error: {
        css: 'background: red; color: black;',
        txtCss: 'color: red; ',
        pre: '⛔ ',
        console: 'error',  // or trace
    },
    // 1
    warn: {
        css: 'background: darkorange; color: black;',
        txtCss: 'color: darkorange; ',
        pre: '⚠ ',
        console: 'warn',
    },
    // 2
    info: {
        css: 'background: aqua; color: black;',
        txtCss: 'color: aqua;',
        pre: '❗ ',
        console: 'info',
    },
    // 3
    log: {
        css: 'background: grey; color: yellow;',
        txtCss: 'color: grey;',
        pre: '',
        console: 'log',
    },
    // 4
    debug: {
        css: 'background: chartreuse; color: black;',
        txtCss: 'color: chartreuse;',
        pre: '',
        console: 'debug',
    },
    // 5
    trace: {
        css: 'background: indigo; color: yellow;',
        txtCss: 'color: hotpink;',
        pre: '',
        console: 'log',
    },

    names: ['error', 'warn', 'info', 'log', 'debug', 'trace'],
    reset: 'color: inherit;',
    head: 'font-weight:bold; font-style:italic;',
    level: 'font-weight:bold; border-radius: 3px; padding: 2px 5px; display:inline-block;',
}

const log = function () {
    // Get the args
    let args = Array.prototype.slice.call(arguments)

    // 1st arg is the log level/type
    let level = args.shift()
    let strLevel
    switch (level) {
        case 'trace':
        case 5: {
            if (logLevel < 5) break
            level = 5 // make sure level is numeric
            strLevel = 'trace'
            break
        }

        case 'debug':
        case 4: {
            if (logLevel < 4) break
            level = 4
            strLevel = 'debug'
            break
        }

        case 'log':
        case 3: {
            if (logLevel < 3) break
            level = 3
            strLevel = 'log'
            break
        }

        case 'info':
        case '':
        case 2: {
            if (logLevel < 2) break
            level = 2
            strLevel = 'info'
            break
        }

        case 'warn':
        case 1: {
            if (logLevel < 1) break
            level = 1
            strLevel = 'warn'
            break
        }

        case 'error':
        case 'err':
        case 0: {
            if (logLevel < 0) break
            level = 0
            strLevel = 'error'
            break
        }

        default: {
            level = -1
            break
        }

    }

    // If set to something unknown, no log output
    if (strLevel === undefined) return function () { }

    // 2nd arg is a heading that will be colour highlighted
    let head = args.shift()

    // Bind back to console.log (could use console[strLevel] but some levels ignore some formatting, use console.xxx directly or dedicated fn)
    return Function.prototype.bind.call(
        console[LOG_STYLES[strLevel].console],
        console,
        `%c${LOG_STYLES[strLevel].pre}${strLevel}%c [${head}]`, `${LOG_STYLES.level} ${LOG_STYLES[strLevel].css}`, `${LOG_STYLES.head} ${LOG_STYLES[strLevel].txtCss}`,
        ...args
    )
}
// log(2, 'here:there', 'jiminy', {fred:'jim'})()

//#endregion

function loadModule(url) {
    let done

    import(url)
        .then(res => {
            log('debug', '>> then >>', res)()
            done = res
        })
        .catch(err => {
            console.error(`[uibuilder:loadModule] Could not load module ${url}`, err)
        })

    while (!done) { }

    return done
}

/** Makes a null or non-object into an object
 * If not null, moves "thing" to {payload:thing}
 *
 * @param {*} thing Thing to check
 * @param {string} [property='payload'] property that "thing" is moved to if not null and not an object
 * @returns {!object} _
 */
function makeMeAnObject(thing, property) {
    if (property === null || property === undefined) property = 'payload'
    if (typeof property !== 'string') {
        log('warn', 'uibuilderfe:makeMeAnObject', `WARNING: property parameter must be a string and not: ${typeof property}`)()
        property = 'payload'
    }
    var out = {}
    if (typeof thing === 'object') {
        out = thing
    } else if (thing !== null) {
        out[property] = thing
    }
    return out
} // --- End of make me an object --- //

/** Joins all arguments as a URL string
 * see http://stackoverflow.com/a/28592528/3016654
 * since v1.0.10, fixed potential double // issue
 * arguments {string} URL fragments
 * @returns {string} _
 */
function urlJoin() {
    var paths = Array.prototype.slice.call(arguments)
    var url = '/' + paths.map(function (e) {
        return e.replace(/^\/|\/$/g, '')
    })
        .filter(function (e) {
            return e
        })
        .join('/')
    return url.replace('//', '/')
} // ---- End of urlJoin ---- //

//#endregion --- Module-level utility functions --- //

//#region --- We need the Socket.IO client - check in decreasing order of likelihood --- //
const ioLocns = [ // Likely locations of the Socket.IO client library
    // Where it should normally be
    '../uibuilder/vendor/socket.io-client/socket.io.esm.min.js',
    // Where it might be if using a custom uib Express server and haven't changed httpNodeRoot
    '/uibuilder/vendor/socket.io-client/socket.io.esm.min.js',
    // Where it might be if using a custom uib Express server and have changed httpNodeRoot
    '../../../../../uibuilder/vendor/socket.io-client/socket.io.esm.min.js',
    '../../../../uibuilder/vendor/socket.io-client/socket.io.esm.min.js',
    '../../../uibuilder/vendor/socket.io-client/socket.io.esm.min.js',
    '../../uibuilder/vendor/socket.io-client/socket.io.esm.min.js',
    // Direct from the Internet - last ditch attempt
    'https://cdn.jsdelivr.net/npm/socket.io-client/+esm',
]
let io
for (const locn of ioLocns) {
    try {
        ({ io } = await import(locn))
        log('trace', 'uibuilder.module.js:io', `Socket.IO client library found at '${locn}'`)()
    } catch (e) {
        log('trace', 'uibuilder.module.js:io', `Socket.IO client library not found at '${locn}'`)()
    }
    if (io) break
}
if (!io) log('error', 'uibuilder.module.js', 'Socket.IO client failed to load')()
//#endregion -------- -------- -------- //

// Define and export the Uib class - note that an instance of the class is also exported in the wrap-up
export const Uib = class Uib {

    //#region private class vars

    // How many times has the loaded instance connected to Socket.IO (detect if not a new load?)
    #connectedNum = 0
    // event listener callbacks by property name
    #events = {}
    // Socket.IO channel names
    #ioChannels = { control: 'uiBuilderControl', client: 'uiBuilderClient', server: 'uiBuilder' }
    /** setInterval holder for pings @type {function|undefined} */
    #pingInterval
    // onChange event callbacks
    #propChangeCallbacks = {}
    // onTopic event callbacks
    #msgRecvdByTopicCallbacks = {}
    /** setInterval id holder for Socket.IO checkConnect */
    #timerid = null
    // Placeholder for io.socket - can't make a # var until # fns allowed in all browsers
    _socket

    //#endregion

    //#region public class vars

    //#region ---- Externally read-only (via .get method) ---- //
    // TODO Move to proper getters
    clientId = ''
    cookies = {}
    ctrlMsg = {}  // copy of last control msg object received from sever
    ioConnected = false
    msg = {}  // Latest msg from Node-RED
    msgsSent = 0   // track number of messages sent to server since page load
    msgsReceived = 0   // track number of messages received from server since page load
    msgsSentCtrl = 0   // track number of control messages sent to server since page load
    msgsCtrlReceived = 0   // track number of control messages received from server since page load
    sentCtrlMsg = {}  // copy of last control msg object sent via uibuilder.send() @since v2.0.0-dev3
    sentMsg = {}  // copy of last msg object sent via uibuilder.send()
    serverTimeOffset = null // placeholder to track time offset from server, see fn socket.on(ioChannels.server ...)
    //#endregion ---- ---- ---- ---- //

    //#region ---- Externally Writable (via .set method, read via .get method) ---- //
    // TODO Move to proper getters/setters
    allowScript = true   // Allow incoming msg to contain msg.script with JavaScript that will be automatically executed
    allowStyle = true   // Allow incoming msg to contain msg.style with CSS that will be automatically executed
    removeScript = true   // Delete msg.code after inserting to DOM if it exists on incoming msg
    removeStyle = true   // Delete msg.style after inserting to DOM if it exists on incoming msg
    originator = ''     // Default originator node id
    //#endregion ---- ---- ---- ---- //

    //#region ---- These are unlikely to be needed externally: ----
    autoSendReady = true
    httpNodeRoot = '' // Node-RED setting (via cookie)
    ioNamespace = ''
    ioPath = ''
    // @ts-ignore
    isMinified = !(/param/).test(function (param) { }) // eslint-disable-line no-unused-vars
    retryFactor = 1.5                             // starting delay factor for subsequent reconnect attempts
    retryMs = 2000                            // starting retry ms period for manual socket reconnections workaround
    storePrefix = 'uib_'                          // Prefix for all uib-related localStorage
    socketOptions = {
        path: this.ioPath,
        transports: ['polling', 'websocket'],
        auth: {
            clientId: this.clientId,
        },
        transportOptions: {
            // Can only set headers when polling
            polling: {
                extraHeaders: {
                    'x-clientid': `uibuilderfe; ${this.clientId}`,
                    //Authorization: 'test', //TODO: Replace with self.jwt variable? // Authorization: `Bearer ${your_jwt}`
                }
            },
        },
    }
    started = false
    //#endregion -- not external --

    //#endregion --- End of variables ---

    //#region ------- Static metadata ------- //
    static _meta = {
        version: '5.0.2',
        type: 'module',
        displayName: 'uibuilder',
    }
    get meta() { return Uib._meta }
    //#endregion ---- ---- ---- ---- //

    //#region ------- Getters and Setters ------- //

    // Change logging level dynamically (affects both console. and print.)
    set logLevel(level) { logLevel = level; console.log('%c❗ info%c [logLevel]', `${LOG_STYLES.level} ${LOG_STYLES.info.css}`, `${LOG_STYLES.head} ${LOG_STYLES.info.txtCss}`, `Set to ${level} (${LOG_STYLES.names[level]})`); /*changeLogLevel(level)*/ }
    get logLevel() { return logLevel }

    /** Function to set uibuilder properties to a new value - works on any property except _* or #*
     * Also triggers any event listeners.
     * Example: this.set('msg', {topic:'uibuilder', payload:42});
     * @param {string} prop Any uibuilder property who's name does not start with a _ or #
     * @param {*} val _
     */
    set(prop, val) {
        // Check for excluded properties - we don't want people to set these
        // if (this.#excludedSet.indexOf(prop) !== -1) {
        if (prop.startsWith('_') || prop.startsWith('#')) {
            log('warn', 'Uib:set', `Cannot use set() on protected property "${prop}"`)()
            return
        }

        this[prop] = val

        log('trace', 'Uib:set', `prop set - prop: ${prop}, val: `, val)()

        // Trigger this prop's event callbacks (listeners which are set by this.onChange)
        // this.emit(prop, val)

        // trigger an event on the prop name, pass both the name and value to the event details
        const event = new CustomEvent('uibuilder:propertyChanged', { detail: { 'prop': prop, 'value': val } })
        document.dispatchEvent(event)

        return val
    }
    /** Function to get the value of a uibuilder property
     * Example: uibuilder.get('msg')
     * @param {string} prop The name of the property to get as long as it does not start with a _ or #
     * @returns {*} The current value of the property
     */
    get(prop) {
        if (prop.startsWith('_') || prop.startsWith('#')) {
            log('warn', 'Uib:get', `Cannot use get() on protected property "${prop}"`)()
            return
        }
        if (this[prop] === undefined) {
            log('warn', 'Uib:get', `get() - property "${prop}" does not exist`)()
        }
        return this[prop]
    }

    //#endregion ------- -------- ------- //

    //#region ------- Our own event handling system ---------- //
    // See the this.#events private var

    /** Register on-change event listeners for uibuilder tracked properties
     * Make it possible to register a function that will be run when the property changes.
     * Note that you can create listeners for non-existant properties
     * @example: uibuilder.onChange('msg', function(msg){ console.log('uibuilder.msg changed! It is now: ', msg) })
     *
     * @param {string} prop The property of uibuilder that we want to monitor
     * @param {Function} callback The function that will run when the property changes, parameter is the new value of the property after change
     */
    onChange(prop, callback) {
        // Note: Property does not have to exist yet

        // console.debug(`[Uib:onchange] pushing new callback (event listener) for property: ${prop}`)

        // Create a new array or add to the array of callback functions for the property in the events object
        // if (this.#events[prop]) {
        //     this.#events[prop].push(callback)
        // } else {
        //     this.#events[prop] = [callback]
        // }

        // Make sure we have an object to receive the saved callback, update the latest reference number
        if (!this.#propChangeCallbacks[prop]) this.#propChangeCallbacks[prop] = { _nextRef: 1 }
        else this.#propChangeCallbacks[prop]._nextRef++

        let nextCbRef = this.#propChangeCallbacks[prop]._nextRef

        // Register the callback function. It is saved so that we can remove the event listener if we need to
        let propChangeCallback = this.#propChangeCallbacks[prop][nextCbRef] = function propChangeCallback(e) {
            // If the prop name matches the 1st arg in the onChange fn:
            if (prop === e.detail.prop) {
                const value = e.detail.value
                // console.warn('[Uib:onChange:evt] uibuilder:propertyChanged. ', e.detail)
                // Set the callback fn's `this` and its single argument to the msg
                callback.call(value, value)
            }
        }

        document.addEventListener('uibuilder:propertyChanged', propChangeCallback)

        return nextCbRef
    } // ---- End of onChange() ---- //
    cancelChange(prop, cbRef) {
        document.removeEventListener('uibuilder:propertyChanged', this.#propChangeCallbacks[prop][cbRef])
        delete this.#propChangeCallbacks[prop][cbRef]
        //this.#propChangeCallbacks[topic]._nextRef-- // Don't bother, let the ref# increase
    }

    /** Register a change callback for a specific msg.topic
     * Similar to onChange but more convenient if needing to differentiate by msg.topic.
     * @example: let otRef = uibuilder.onTopic('mytopic', function(){ console.log('Received a msg with msg.topic=`mytopic`. msg: ', this) })
     * To cancel a change listener: uibuilder.cancelTopic('mytopic', otRef)
     *
     * @param {string} topic The msg.topic we want to listen for
     * @param {Function} callback The function that will run when an appropriate msg is received. `this` inside the callback as well as the cb's single argument is the received msg.
     * @returns {number} A reference to the callback to cancel, save and pass to uibuilder.cancelTopic if you need to remove a listener
     */
    onTopic(topic, callback) {
        // Make sure we have an object to receive the saved callback, update the latest reference number
        if (!this.#msgRecvdByTopicCallbacks[topic]) this.#msgRecvdByTopicCallbacks[topic] = { _nextRef: 1 }
        else this.#msgRecvdByTopicCallbacks[topic]._nextRef++

        let nextCbRef = this.#msgRecvdByTopicCallbacks[topic]._nextRef

        // Register the callback function. It is saved so that we can remove the event listener if we need to
        let msgRecvdEvtCallback = this.#msgRecvdByTopicCallbacks[topic][nextCbRef] = function msgRecvdEvtCallback(e) {
            const msg = e.detail
            // console.log('[Uib:onTopic:evt] uibuilder:stdMsgReceived where topic matches. ', e.detail)
            if (msg.topic === topic) {
                // Set the callback fn's `this` and its single argument to the msg
                callback.call(msg, msg)
            }
        }

        document.addEventListener('uibuilder:stdMsgReceived', msgRecvdEvtCallback)

        return nextCbRef
    }
    cancelTopic(topic, cbRef) {
        document.removeEventListener('uibuilder:stdMsgReceived', this.#msgRecvdByTopicCallbacks[topic][cbRef])
        delete this.#msgRecvdByTopicCallbacks[topic][cbRef]
        //this.#msgRecvdCallbacks[topic]._nextRef-- // Don't bother, let the ref# increase
    }

    /** Trigger event listener for a given property
     * Called when uibuilder.set is used
     *
     * @param {*} prop The property for which to run the callback functions
     * arguments: Additional arguments contain the value to pass to the event callback (e.g. newValue)
     */
    // emit(prop) {
    //     var evt = this.#events[prop]
    //     if (!evt) {
    //         return
    //     }
    //     var args = Array.prototype.slice.call(arguments, 1)
    //     for (var i = 0; i < evt.length; i++) {
    //         evt[i].apply(this, args)
    //     }
    //     log('trace', 'Uib:emit', `${evt.length} listeners run for prop ${prop} `)()
    // }

    /** Forcably removes all event listeners from the events array
     * Use if you need to re-initialise the environment
     */
    // clearEventListeners() {
    //     this.#events = []
    // } // ---- End of clearEventListeners() ---- //

    /** Clear a single property event listeners
     * @param {string} prop The property of uibuilder for which we want to clear the event listener
     */
    // clearListener(prop) {
    //     if (this.#events[prop]) delete this.#events[prop]
    // }

    //#endregion ---------- End of event handling system ---------- //

    //#region ------- General Utility Functions -------- //

    $ = document.querySelector.bind(document)
    
    /** Set the default originator. Set to '' to ignore. Used with uib-sender.
     * @param {string} [originator] A Node-RED node ID to return the message to
     */
    setOriginator(originator = '') {
        this.originator = originator
    } // ---- End of setOriginator ---- //

    /** Check supplied msg from server for a timestamp - if received, work out & store difference to browser time
     * @param {object} receivedMsg A message object recieved from Node-RED
     * @returns {void} Updates self.serverTimeOffset if different to previous value
     */
    checkTimestamp(receivedMsg) {
        if (Object.prototype.hasOwnProperty.call(receivedMsg, 'serverTimestamp')) {
            var serverTimestamp = new Date(receivedMsg.serverTimestamp)
            // @ts-ignore
            var offset = Math.round(((new Date()) - serverTimestamp) / 3600000) // in ms / 3.6m to get hours
            if (offset !== this.serverTimeOffset) {
                log('trace', `Uib:checkTimestamp:${this.#ioChannels.server} (server)`, `Offset changed to: ${offset} from: ${this.serverTimeOffset}`)()
                this.set('serverTimeOffset', offset)
            }
        }
    }

    //#endregion -------- -------- -------- //

    //#region ------- UI handlers --------- //

    /** Attach a new remote script to the end of HEAD synchronously
     * NOTE: It takes too long for most scripts to finish loading
     *       so this is pretty useless to work with the dynamic UI features directly.
     * @param {string} url The url to be used in the script src attribute
     */
    loadScriptSrc(url) {
        const newScript = document.createElement("script")
        newScript.src = url
        newScript.async = false
        document.head.appendChild(newScript)
    }

    /** Attach a new text script to the end of HEAD synchronously
     * NOTE: It takes too long for most scripts to finish loading
     *       so this is pretty useless to work with the dynamic UI features directly.
     * @param {string} textFn The text to be loaded as a script
     */
    loadScriptTxt(textFn) {
        const newScript = document.createElement("script")
        newScript.async = false
        newScript.textContent = textFn
        document.head.appendChild(newScript)
    }

    /** Load a dynamic UI from a JSON web reponse */
    loadui(url) {

        fetch(url)
            .then(response => {
                if (response.ok === false) {
                    // log('warn', 'Uib:loadui:then1', `Could not load '${url}'. Status ${response.status}, Error: ${response.statusText}`)()
                    throw new Error(`Could not load '${url}'. Status ${response.status}, Error: ${response.statusText}`)
                }

                log('trace', 'Uib:loadui:then1', `Loaded '${url}'. Status ${response.status}, ${response.statusText}`)()
                // Did we get json?
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError(`Fetch '${url}' did not return JSON, ignoring`)
                }
                // Returns parsed json to next .then
                return response.json()
            })
            .then(data => {
                if (data !== undefined) {
                    log('trace', 'Uib:loadui:then2', 'Parsed JSON successfully obtained')()
                    // Call the _uiManager
                    this._uiManager({ _ui: data })
                }
            })
            .catch(err => {
                log('warn', 'Uib:loadui:catch', 'Error. ', err)()
            })

    } // --- end of loadui

    /** Handle incoming msg._ui add requests
     * @param {*} ui Standardised msg._ui property object
     * @param {*} [payload] Optional. msg.payload
     */
    _uiAdd(ui, payload) {
        log('trace', 'Uib:_uiManager:add', 'Starting _uiAdd')()

        ui.components.forEach((compToAdd) => {
            // Create the new component
            let newEl = document.createElement(compToAdd.type)

            // Add attributes
            if (compToAdd.attributes) Object.keys(compToAdd.attributes).forEach((attrib) => {
                newEl.setAttribute(attrib, compToAdd.attributes[attrib])
            })

            // Add event handlers
            if (compToAdd.events) Object.keys(compToAdd.events).forEach((type) => {
                // @ts-ignore  I'm forever getting this wrong!
                if (type.toLowerCase === 'onclick') type = 'click'
                // Add the event listener - hate eval but it is the only way I can get it to work
                try {
                    newEl.addEventListener(type, (evt) => {
                        eval(`${compToAdd.events[type]}(evt)`)
                    })
                    // newEl.setAttribute( 'onClick', `${compToAdd.events[type]}()` )
                } catch (err) {
                    log('error', 'Uib:_uiAdd', `Add event '${type}' for element '${compToAdd.type}': Cannot add event handler. ${err.message}`)()
                }
            })

            // Add custom properties to the dataset
            if (compToAdd.properties) {
                Object.keys(compToAdd.properties).forEach((prop) => {
                    //TODO break a.b into sub properties
                    newEl[prop] = compToAdd.properties[prop]
                })
            }

            //#region Add Slot content to innerHTML
            if (!compToAdd.slot) compToAdd.slot = payload
            if (compToAdd.slot) {
                // If DOMPurify is loaded, apply it now
                if (window['DOMPurify']) compToAdd.slot = window['DOMPurify'].sanitize(compToAdd.slot)
                // Set the component content to the msg.payload or the slot property
                if (compToAdd.slot !== undefined && compToAdd.slot !== null && compToAdd.slot !== '')
                    newEl.innerHTML = compToAdd.slot ? compToAdd.slot : payload
            }
            //#endregion

            //#region Add Slot Markdown content to innerHTML IF marked library is available
            if (window['markdownit'] && compToAdd.slotMarkdown) {
                const opts = {
                    html: true, linkify: true, _highlight: true, langPrefix: 'language-',
                    highlight(str, lang) {
                        if (lang && window['hljs'] && window['hljs'].getLanguage(lang)) {
                            try {
                                return `<pre class="highlight" data-language="${lang.toUpperCase()}">
                                        <code class="language-${lang}">${window['hljs'].highlightAuto(str).value}</code></pre>`
                            } finally { }
                        }
                        return `<pre class="highlight"><code>${md.utils.escapeHtml(str)}</code></pre>`
                    },
                }
                const md = window['markdownit'](opts)
                compToAdd.slotMarkdown = md.render(compToAdd.slotMarkdown)
                // If DOMPurify is loaded, apply it now
                if (window['DOMPurify']) compToAdd.slotMarkdown = window['DOMPurify'].sanitize(compToAdd.slotMarkdown)
                // Set the component content to the msg.payload or the slot property
                if (compToAdd.slotMarkdown !== undefined && compToAdd.slotMarkdown !== null && compToAdd.slotMarkdown !== '')
                    newEl.innerHTML += compToAdd.slotMarkdown ? compToAdd.slotMarkdown : payload
            }
            //#endregion

            // Where to add the new element?
            let elParent
            if (compToAdd.parentEl) {
                elParent = compToAdd.parentEl
            } else if (ui.parentEl) {
                elParent = ui.parentEl
            } else if (compToAdd.parent || ui.parent) {
                let parent = compToAdd.parent ? compToAdd.parent : ui.parent
                elParent = document.querySelector(parent)
                if (!elParent) {
                    log('info', 'Uib:_uiAdd', `Parent element '${parent}' not found, adding to body`)()
                    elParent = document.querySelector('body')
                }
            } else {
                log('info', 'Uib:_uiAdd', 'No parent specified, adding to body')()
                elParent = document.querySelector('body')
            }

            // Append to the required parent
            elParent.appendChild(newEl)

            // If nested components, go again - but don't pass payload to sub-components
            if (compToAdd.components) this._uiAdd({
                method: ui.method,
                parentEl: newEl,
                components: compToAdd.components,
            }, null)
        })

    } // --- end of _uiAdd ---

    /** Handle incoming _ui remove requests
     * @param {*} ui Standardised msg._ui property object
     */
    _uiRemove(ui) {
        ui.components.forEach((compToRemove) => {
            try {
                document.querySelector(compToRemove).remove()
            } catch (err) { }
        })
    } // --- end of _uiRemove ---

    /** Handle incoming _ui update requests
     * @param {*} ui Standardised msg._ui property object
     */
    _uiUpdate(ui) {

    } // --- end of _uiUpdate ---

    /** Handle incoming _ui load requests
     * @param {*} ui Standardised msg._ui property object
     */
    _uiLoad(ui) {

        // Self-loading ECMA Modules (e.g. web components)
        if (ui.components) {
            if (!Array.isArray(ui.components)) ui.components = [ui.components]

            ui.components.forEach(async component => {
                await import(component)
            })
        }
        // Remote Scripts
        if (ui.srcScripts) {
            if (!Array.isArray(ui.srcScripts)) ui.srcScripts = [ui.srcScripts]

            ui.srcScripts.forEach(script => {
                this.loadScriptSrc(script)
            })
        }
        // Scripts passed as text
        if (ui.txtScripts) {
            if (!Array.isArray(ui.txtScripts)) ui.txtScripts = [ui.txtScripts]

            ui.txtScripts.forEach(script => {
                this.loadScriptTxt(script)
            })
        }

    } // --- end of _uiLoad ---

    /** Handle incoming _ui messages and loaded UI JSON files
     * Called from start()
     * @param {*} msg Standardised msg object containing a _ui property object
     */
    _uiManager(msg) {
        if (!msg._ui) return

        // Make sure that _ui is an array
        if (!Array.isArray(msg._ui)) msg._ui = [msg._ui]

        msg._ui.forEach((ui, i) => {
            if (!ui.method) {
                log('warn', 'Uib:_uiManager', `No method defined for msg._ui[${i}]. Ignoring`)()
                return
            }

            switch (ui.method) {
                case 'add': {
                    this._uiAdd(ui, msg.payload)
                    break
                }

                case 'remove': {
                    this._uiRemove(ui)
                    break
                }

                case 'update': {
                    this._uiUpdate(ui)
                    break
                }

                case 'load': {
                    this._uiLoad(ui)
                    break
                }

                default: {
                    log('error', 'Uib:_uiManager', `Invalid msg._ui[${i}].method (${ui.method}). Ignoring`)()
                    break
                }
            }
        })

    } // --- end of _uiManager ---

    //#endregion -------- -------- -------- //

    //#region ------- Message Handling (To/From Node-RED) -------- //

    /** Internal send fn. Send a standard or control msg back to Node-RED via Socket.IO
     * NR will generally expect the msg to contain a payload topic
     * @param {object} msgToSend The msg object to send.
     * @param {string} [channel=uiBuilderClient] The Socket.IO channel to use, must be in self.ioChannels or it will be ignored
     * @param {string} [originator] A Node-RED node ID to return the message to
     */
    _send(msgToSend, channel, originator = '') {
        if (channel === null || channel === undefined) channel = this.#ioChannels.client

        // Make sure msgToSend is an object
        if (channel === this.#ioChannels.client) {
            msgToSend = makeMeAnObject(msgToSend, 'payload')
        } else if (channel === this.#ioChannels.control) {
            msgToSend = makeMeAnObject(msgToSend, 'uibuilderCtrl')
            if (!Object.prototype.hasOwnProperty.call(msgToSend, 'uibuilderCtrl')) {
                msgToSend.uibuilderCtrl = 'manual send'
            }
            // help remember where this came from as ctrl msgs can come from server or client
            msgToSend.from = 'client'
        }

        /** since 2020-01-02 Added _socketId which should be the same as the _socketId on the server */
        msgToSend._socketId = this._socket.id

        // Track how many messages have been sent & last msg sent
        let numMsgs
        if (channel === this.#ioChannels.client) {
            this.set('sentMsg', msgToSend)
            numMsgs = this.set('msgsSent', ++this.msgsSent)
        } else if (channel === this.#ioChannels.control) {
            this.set('sentCtrlMsg', msgToSend)
            numMsgs = this.set('msgsSentCtrl', ++this.msgsSentCtrl)
        }

        // Add the originator metadata if required
        if (originator === '' && this.originator !== '') originator = this.originator
        if (originator !== '') Object.assign(msgToSend, { '_uib': { 'originator': originator } })

        log('debug', 'Uib:_send', ` Channel '${channel}'. Sending msg #${numMsgs}`, msgToSend)()

        this._socket.emit(channel, msgToSend)
    } // --- End of Send Msg Fn --- //

    /** Send a standard message to NR
     * @example uibuilder.send({payload:'Hello'})
     * @param {object} msg Message to send
     * @param {string} [originator] A Node-RED node ID to return the message to
     */
    send(msg, originator = '') {
        this._send(msg, this.#ioChannels.client, originator)
    }

    /** Send a control msg to NR
     * @param {object} msg Message to send
     */
    sendCtrl(msg) {
        this._send(msg, this.#ioChannels.control)
    }

    /** Easily send a msg back to Node-RED on a DOM event
     * @example In plain HTML/JavaScript
     *    `<button id="button1" name="button 1" data-fred="jim"></button>`
     *    $('#button1').onclick = (evt) => {
     *      uibuilder.eventSend(evt)
     *    }
     * @example
     * In VueJS: `<b-button id="myButton1" @click="doEvent" data-something="hello"></b-button>`
     * In VueJS methods: `doEvent: uibuilder.eventSend,`
     * 
     * All `data-` attributes will be passed back to Node-RED, 
     *    use them instead of arguments in the click function.
     *    All target._ui custom properties are also passed back to Node-RED.
     * 
     * @param {MouseEvent|any} domevent DOM Event object
     * @param {string} [originator] A Node-RED node ID to return the message to
     */
    eventSend(domevent, originator = '') {
        // Handle no argument, e.g. <button onClick="uibuilder.eventSend()"> - event is a hidden variable when fn used in addEventListener
        if (!domevent || !domevent.constructor) domevent = event
        // The argument must be a DOM event
        if ((!domevent.constructor.name.endsWith('Event')) || (!domevent.currentTarget)) {
            log('warn', 'Uib:eventSend', `ARGUMENT NOT A DOM EVENT - use data attributes not function arguments to pass data. Arg Type: ${domevent.constructor.name}`, domevent)()
            return
        }
        const target = domevent.currentTarget

        // Try to get a meaningful ID. id attrib is highest priority, text content is lowest
        let id = ''
        try { if (target.textContent !== '') id = target.textContent.substring(0, 25) } catch (e) { /** */ }
        try { if (target.name !== '') id = target.name } catch (e) { /** */ }
        try { if (target.id !== '') id = target.id } catch (e) { /** */ }

        const msg = {
            topic: this.msg.topic,  // repeats the topic from the last inbound msg if it exists

            uibDomEvent: {
                sourceId: id,
                event: domevent.type,
            },

            // Each `data-xxxx` attribute is added as a property
            // - this may be an empty Object if no data attributes defined
            payload: target.dataset,

            // Add the custom properties to the msg
            uiprops: target._ui,
        }

        log('trace', 'Uib:eventSend', 'Sending msg to Node-RED', msg)()
        if (target.dataset.length === 0) log('warn', 'Uib:eventSend', 'No payload in msg. data-* attributes should be used.')()

        this._send(msg, this.#ioChannels.client, originator)
    }

    _dispatchCustomEvent(title, details) {
        const event = new CustomEvent(title, { detail: details })
        document.dispatchEvent(event)
    }

    // Handle msg._ui - emit specific events on document that make it easy for coders to use
    _msgRcvdEvents(msg) {

        // Message received
        this._dispatchCustomEvent('uibuilder:stdMsgReceived', msg)

        // Topic
        if ( msg.topic ) this._dispatchCustomEvent(`uibuilder:msg:topic:${msg.topic}`, msg)

        // msg._ui events
        if ( msg._ui ) {
            this._dispatchCustomEvent('uibuilder:msg:_ui', msg)

            msg._ui.forEach( action => {
                if ( action.method ) {
                    action.payload = msg.payload
                    action.topic = msg.topic
                    this._dispatchCustomEvent(
                        `uibuilder:msg:_ui:${action.method}${action.id ? `:${action.id}` : ''}`,
                        action
                    )
                }
            })
        }

    } // --- end of _msgRcvdEvents ---

    /** Callback handler for messages from Node-RED
     * NOTE: `this` is the class here rather the `socket` as would be normal since we bind the correct `this` in the call.
     *       Use this._socket if needing reference to the socket.
     * @callback ioSetupFromServer Called from ioSetup/this._socket.on(this.#ioChannels.server, this.stdMsgFromServer.bind(this))
     * @param {object} receivedMsg
     * @this Uib
     */
    _stdMsgFromServer(receivedMsg) {

        // Make sure that msg is an object & not null
        receivedMsg = makeMeAnObject(receivedMsg, 'payload')

        // @since 2018-10-07 v1.0.9: Work out local time offset from server
        this.checkTimestamp(receivedMsg)

        // TODO RE-ENABLE script/style handling
        // If the msg contains a code property (js), insert to DOM, remove from msg if required
        // if ( self.allowScript && Object.prototype.hasOwnProperty.call(receivedMsg, 'script') ) {
        //     self.newScript(receivedMsg.script)
        //     if ( self.removeScript ) delete receivedMsg.script
        // }
        // If the msg contains a style property (css), insert to DOM, remove from msg if required
        // if ( self.allowStyle && Object.prototype.hasOwnProperty.call(receivedMsg, 'style') ) {
        //     self.newStyle(receivedMsg.style)
        //     if ( self.removeStyle ) delete receivedMsg.style
        // }

        // Save the msg for further processing
        this.set('msg', receivedMsg)

        // Track how many messages have been received
        this.set('msgsReceived', ++this.msgsReceived)

        // Emit specific document events on msg receipt that make it easy for coders to use
        this._msgRcvdEvents(receivedMsg)

        log('info', 'Uib:ioSetup:stdMsgFromServer', `Channel '${this.#ioChannels.server}'. Received msg #${this.msgsReceived}.`, receivedMsg)()

        // ! NOTE: Don't try to handle specialist messages here. Add onChange('msg', ...) callbacks in start()

    } // -- End of websocket receive DATA msg from Node-RED -- //

    _ctrlMsgFromServer(receivedCtrlMsg) {

        // Make sure that msg is an object & not null
        if (receivedCtrlMsg === null) {
            receivedCtrlMsg = {}
        } else if (typeof receivedCtrlMsg !== 'object') {
            var msg = {}
            msg['uibuilderCtrl:' + this.#ioChannels.control] = receivedCtrlMsg
            receivedCtrlMsg = msg
        }

        // @since 2018-10-07 v1.0.9: Work out local time offset from server
        this.checkTimestamp(receivedCtrlMsg)

        this.set('ctrlMsg', receivedCtrlMsg)
        this.set('msgsCtrl', ++this.msgsCtrlReceived)

        log('trace', `Uib:ioSetup:_ctrlMsgFromServer`, `Channel '${this.#ioChannels.control}'. Received control msg #${this.msgsCtrlReceived}`, receivedCtrlMsg)()

        /** Process control msg types */
        switch (receivedCtrlMsg.uibuilderCtrl) {
            // Node-RED is shutting down
            case 'shutdown': {
                log('info', `Uib:ioSetup:${this.#ioChannels.control}`, '❌ Received "shutdown" from server')()
                this.set('serverShutdown', undefined)
                break
            }

            /** We are connected to the server - 1st msg from server */
            case 'client connect': {
                log('trace', `Uib:ioSetup:${this.#ioChannels.control}`, 'Received "client connect" from server')()
                log('info', `Uib:ioSetup:${this.#ioChannels.control}`, `✅ Server connected. Version: ${receivedCtrlMsg.version}\nServer time: ${receivedCtrlMsg.serverTimestamp}, Sever time offset: ${this.serverTimeOffset} hours`)()
                if (Uib._meta.version !== receivedCtrlMsg.version)
                    log('warn', `Uib:ioSetup:${this.#ioChannels.control}`, `Server version (${receivedCtrlMsg.version}) not the same as the client version (${Uib._meta.version})`)()

                if (this.autoSendReady === true) { // eslint-disable-line no-lonely-if
                    log('trace', `Uib:ioSetup:${this.#ioChannels.control}/client connect`, 'Auto-sending ready-for-content/replay msg to server')
                    // @since 0.4.8c Add cacheControl property for use with node-red-contrib-infocache
                    this._send({
                        'uibuilderCtrl': 'ready for content',
                        'cacheControl': 'REPLAY',
                    }, this.#ioChannels.control)
                }

                break
            }

            default: {
                log('trace', `uibuilderfe:ioSetup:${this.#ioChannels.control}`, `Received ${receivedCtrlMsg.uibuilderCtrl} from server`)
                // Anything else to do for other control msgs?
            }

        } // ---- End of process control msg types ---- //

    } // -- End of websocket receive CONTROL msg from Node-RED -- //

    //#endregion -------- ------------ -------- //

    //#region ------- Socket.IO -------- //

    /** Return the Socket.IO namespace
     * The cookie method is the most reliable but this falls back to trying to work it
     * out from the URL if cookies not available. That won't work if page is in a sub-folder.
     * since 2017-10-21 Improve method to cope with more complex paths - thanks to Steve Rickus @shrickus
     * since 2017-11-10 v1.0.1 Check cookie first then url. cookie works even if the path is more complex (e.g. sub-folder)
     * since 2020-01-25 Removed httpRoot from namespace to prevent proxy induced errors
     * @returns {string} Socket.IO namespace
     */
    setIOnamespace() {

        let ioNamespace

        /** Try getting the namespace cookie. */
        ioNamespace = this.cookies['uibuilder-namespace']

        // if it wasn't available, try using the current url path
        if (ioNamespace === undefined || ioNamespace === '') {
            // split url path & eliminate any blank elements, and trailing or double slashes
            let u = window.location.pathname.split('/')
                .filter(function (t) { return t.trim() !== '' })

            /** since v2.0.5 Extra check for 0 length, Issue #73. since 2017-11-06 If the last element of the path is an .html file name, remove it */
            if (u.length > 0 && (u[u.length - 1].endsWith('.html'))) u.pop()

            // Get the last part of the url path, this MUST match the namespace in uibuilder
            ioNamespace = u.pop()

            log('trace', 'uibuilder.module.js:setIOnamespace', `Socket.IO namespace found via url path: ${ioNamespace}`)()
        } else {
            log('trace', 'uibuilder.module.js:setIOnamespace', `Socket.IO namespace found via cookie: ${ioNamespace}`)()
        }

        // Namespace HAS to start with a /
        ioNamespace = '/' + ioNamespace

        log('trace', 'uibuilder.module.js:setIOnamespace', `Final Socket.IO namespace: ${ioNamespace}`)()

        return ioNamespace
    } // --- End of set IO namespace --- //

    /** Function used to check whether Socket.IO is connected to the server, reconnect if not (recursive)
     * @param {number} [delay] Initial delay before checking (ms). Default=2000ms
     * @param {number} [factor] Multiplication factor for subsequent checks (delay*factor). Default=1.5
     * @param {number} [depth] Recursion depth
     */
    checkConnect(delay, factor, depth = 1) {
        if (!delay) delay = this.retryMs
        if (!factor) factor = this.retryFactor

        log('trace', 'Uib:checkConnect', `Checking connection. Connected: ${this._socket.connected}. Timer: ${this.#timerid}. Depth: ${depth}. Delay: ${delay}. Factor: ${factor}`, this._socket)()

        // If we are connected ...
        if (this._socket.connected === true) {
            // Clear the setTimeout
            if (this.#timerid) {
                window.clearTimeout(this.#timerid)
                this.#timerid = null
            }
            return
        }

        // ... we aren't connected so:

        // we only want one running at a time
        if (this.#timerid) window.clearTimeout(this.#timerid)

        // Create the new timer
        this.#timerid = window.setTimeout(() => {
            log('warn', 'Uib:checkConnect:setTimeout', `Socket.IO reconnection attempt. Current delay: ${delay}. Depth: ${depth}`)()

            // this is necessary sometimes when the socket fails to connect on startup
            this._socket.close()

            // Try to reconnect
            this._socket.connect()

            // don't need to check whether we have connected as the timer will have been cleared if we have
            this.#timerid = null

            // Create new timer for next time round with extended delay
            this.checkConnect(delay * factor, factor, depth++)
        }, delay)
    } // --- End of checkConnect Fn--- //

    // See message handling section for msg receipt handlers

    /** Setup Socket.io
     * since v2.0.0-beta2 Moved to a function and called by the user (uibuilder.start()) so that namespace & path can be passed manually if needed
     * @returns {void} Attaches socket.io manager to self._socket and updates self.ioNamespace & self.ioPath as needed
     */
    ioSetup() {

        // Just a notification, actual load is done outside the class (see start of file)
        if (io === undefined) log('error', 'Uib:ioSetup', 'Socket.IO client not loaded, Node-RED comms will not work')()

        // If socket is already set up, close it and remove all of the listeners
        if (this._socket) {
            log('trace', 'Uib:ioSetup', 'Removing listeners in preparation for redoing Socket.IO connections')()
            if (this.#timerid) {
                window.clearTimeout(this.#timerid)
                this.#timerid = null
            }
            this._socket.close()
            this._socket.offAny()
            this._socket = undefined
        }

        // Update the URL path to make sure we have the right one
        this.socketOptions.path = this.ioPath

        // Create the socket - make sure client uses Socket.IO version from the uibuilder module (using path)
        log('trace', 'Uib:ioSetup', `About to create IO object. Transports: [${this.socketOptions.transports.join(', ')}]`)()
        this._socket = io(this.ioNamespace, this.socketOptions)

        /** When the socket is connected - set ioConnected flag and reset connect timer  */
        this._socket.on('connect', () => {

            this.#connectedNum++
            log('info', 'Uib:ioSetup', `✅ SOCKET CONNECTED. Connection count: ${this.#connectedNum}\nNamespace: ${this.ioNamespace}`)()

            this.set('ioConnected', true)
            this.checkConnect() // resets any reconnection timers

        }) // --- End of socket connection processing ---

        // RECEIVE a STANDARD, non-control msg from Node-RED server
        this._socket.on(this.#ioChannels.server, this._stdMsgFromServer.bind(this))

        // RECEIVE a CONTROL msg from Node-RED server - see also sendCtrl()
        this._socket.on(this.#ioChannels.control, this._ctrlMsgFromServer.bind(this))

        // When the socket is disconnected ..............
        this._socket.on('disconnect', (reason) => {
            // reason === 'io server disconnect' - redeploy of Node instance
            // reason === 'transport close' - Node-RED terminating
            // reason === 'ping timeout' - didn't receive a pong response?
            this.set('ioConnected', false)
            log('info', 'Uib:ioSetup:socket-disconnect', `⛔ Socket Disconnected. Reason: ${reason}`)()

            /** A workaround for SIO's failure to reconnect after a disconnection */
            this.checkConnect()
        }) // --- End of socket disconnect processing ---

        // Socket.io connection error - probably the wrong ioPath
        this._socket.on('connect_error', (err) => {
            log('error', 'Uib:ioSetup:connect_error', `❌ Socket.IO Connect Error. Reason: ${err.message}`, err)()
            this.set('ioConnected', false)
            this.set('socketError', err)
        }) // --- End of socket connect error processing ---

        // Socket.io error - from the server (socket.use middleware triggered an error response)
        this._socket.on('error', (err) => {
            log('error', 'Uib:ioSetup:error', `❌ Socket.IO Error. Reason: ${err.message}`, err)()
            this.set('ioConnected', false)
            this.set('socketError', err)
        }) // --- End of socket error processing ---

        // Ensure we are connected, retry if not
        this.checkConnect()

        /* We really don't need these, just for interest
            self._socket.io.on('packet', function onPacket(data){
                // we get one of these for each REAL msg (not ping/pong)
                console.debug('PACKET', data)
            })
            self._socket.on('pong', function(latency) {
                console.debug('SOCKET PONG - Latency: ', latency)
                //console.dir(self._socket)
            }) // --- End of socket pong processing ---
            self._socket.io.on('packet', function(data){
                // We get one of these for actual messages, not ping/pong
                console.debug('PACKET', data)
            })
            self._socket.on('connect_timeout', function(timeout) {
                console.debug('SOCKET CONNECT TIMEOUT - Namespace: ' + ioNamespace + ', Timeout: ' + timeout)
            }) // --- End of socket connect timeout processing ---
            self._socket.on('reconnect', function(attemptNum) {
                console.debug('SOCKET RECONNECTED - Namespace: ' + ioNamespace + ', Attempt #: ' + attemptNum)
            }) // --- End of socket reconnect processing ---
            self._socket.on('reconnect_attempt', function(attemptNum) {
                console.debug('SOCKET RECONNECT ATTEMPT - Namespace: ' + ioNamespace + ', Attempt #: ' + attemptNum)
            }) // --- End of socket reconnect_attempt processing ---
            self._socket.on('reconnecting', function(attemptNum) {
                console.debug('SOCKET RECONNECTING - Namespace: ' + ioNamespace + ', Attempt #: ' + attemptNum)
            }) // --- End of socket reconnecting processing ---
            self._socket.on('reconnect_error', function(err) {
                console.debug('SOCKET RECONNECT ERROR - Namespace: ' + ioNamespace + ', Reason: ' + err.message)
                //console.dir(err)
            }) // --- End of socket reconnect_error processing ---
            self._socket.on('reconnect_failed', function() {
                console.debug('SOCKET RECONNECT FAILED - Namespace: ' + ioNamespace)
            }) // --- End of socket reconnect_failed processing ---
            self._socket.on('ping', function() {
                console.debug('SOCKET PING')
            }) // --- End of socket ping processing ---
            self._socket.on('pong', function(latency) {
                console.debug('SOCKET PONG - Latency: ', latency)
            }) // --- End of socket pong processing ---
            */
    } // ---- End of ioSetup ---- //

    //#endregion -------- ------------ -------- //

    //#region ------- External facing utility methods -------- //

    /** Write to localStorage if possible. console error output if can't write
     * Also uses this.storePrefix
     * @example
     *   uibuilder.setStore('fred', 42)
     *   console.log(uibuilder.getStore('fred'))
     * @param {string} id localStorage var name to be used (prefixed with 'uib_')
     * @param {*} value value to write to localstore
     * @returns {boolean} True if succeeded else false
     */
    setStore(id, value) {
        if (typeof value === 'object') {
            try {
                value = JSON.stringify(value)
            } catch (e) {
                log('error', 'uibuilder:setStore', 'Cannot stringify object, not storing. ', e)()
                return false
            }
        }
        try {
            localStorage.setItem(this.storePrefix + id, value)
            return true
        } catch (e) {
            log('error', 'uibuilder:setStore', 'Cannot write to localStorage. ', e)()
            return false
        }
    } // --- end of setStore --- //
    getStore(id) {
        try {
            return JSON.parse(localStorage.getItem(this.storePrefix + id))
        } catch (e) {
            return localStorage.getItem(this.storePrefix + id)
        }
    }
    removeStore(id) {
        try {
            localStorage.removeItem(this.storePrefix + id)
        } catch (e) { }
    }

    /** HTTP Ping/Keep-alive - makes a call back to uibuilder's ExpressJS server and receives a 204 response
     * Can be used to keep sessions alive.
     * @example
     *   uibuilder.setPing(2000) // repeat every 2 sec. Re-issue with ping(0) to turn off repeat.
     *   uibuilder.onChange('ping', function(data) {
     *      console.log('pinger', data)
     *   })
     * @param {number} ms Repeat interval in ms
     */
    setPing(ms = 0) {
        const oReq = new XMLHttpRequest()
        oReq.addEventListener('load', () => {
            const headers = (oReq.getAllResponseHeaders()).split('\r\n')
            //console.log('PING', oReq.status, oReq.getAllResponseHeaders())
            this.set('ping', {
                success: (oReq.status === 201) || (oReq.status === 204) ? true : false,
                status: oReq.status,
                headers: headers,
            })
        })

        if (this.#pingInterval) {
            clearInterval(this.#pingInterval)
            this.#pingInterval = undefined
        }

        if (ms < 1) {
            oReq.open('GET', '../uibuilder/ping')
            oReq.send()
        } else {
            this.#pingInterval = setInterval(() => {
                oReq.open('GET', '../uibuilder/ping')
                oReq.send()
            }, ms)
        }
    } // ---- End of ping ---- //

    //#endregion -------- ------------ -------- //

    //#region ------- Class construction & startup method -------- //

    constructor() {
        log('trace', 'Uib:constructor', 'Starting')()

        document.cookie.split(';').forEach((c) => {
            let splitC = c.split('=')
            this.cookies[splitC[0].trim()] = splitC[1]
        })

        /** Client ID set by uibuilder */
        this.clientId = this.cookies['uibuilder-client-id']
        log('trace', 'Uib:constructor', 'Client ID: ', this.clientId)()

        this.ioNamespace = this.setIOnamespace()

        //#region - Try to make sure client uses Socket.IO client version from the uibuilder module (using cookie or path) @since v2.0.0 2019-02-24 allows for httpNodeRoot

        /** httpNodeRoot (to set path) */
        if ('uibuilder-webRoot' in this.cookies) {
            this.httpNodeRoot = this.cookies['uibuilder-webRoot']
            log('trace', 'Uib:constructor', `httpNodeRoot set by cookie to "${this.httpNodeRoot}"`)()
        } else {
            // split current url path, eliminate any blank elements and trailing or double slashes
            let fullPath = window.location.pathname.split('/').filter(function (t) { return t.trim() !== '' })
            /** handle url includes file name - @since v2.0.5 Extra check for 0 length, Issue #73. */
            if (fullPath.length > 0 && fullPath[fullPath.length - 1].endsWith('.html')) fullPath.pop()
            fullPath.pop() // gives the last path section of the url
            this.httpNodeRoot = '/' + fullPath.join('/')
            log('trace', '[Uib:constructor]', `httpNodeRoot set by URL parsing to "${this.httpNodeRoot}". NOTE: This may fail for pages in sub-folders.`)()
        }
        this.ioPath = urlJoin(this.httpNodeRoot, Uib._meta.displayName, 'vendor', 'socket.io')
        log('trace', 'Uib:constructor', `ioPath: "${this.ioPath}"`)()

        //#endregion

        log('trace', 'Uib:constructor', 'Ending')()
    }

    /** Start up Socket.IO comms and listeners
     * This has to be done separately because if running from a web page in a sub-folder of src/dist, uibuilder cannot
     * necessarily work out the correct ioPath to use. 
     * Also, if cookies aren't permitted in the browser, both ioPath and ioNamespace may need to be specified.
     * @param {object} [options] The start options object.
     * @returns {void}
     */
    start(options) {
        log('trace', 'Uib:start', 'Starting')()

        if (this.started === true) {
            log('warn', 'Uib:start', '❌ Start function already called. You should normally only call this once. Resetting Socket.IO')()
        }

        log('log', 'Uib:start', `Cookies: `, this.cookies, `\nClient ID: ${this.clientId}`)()
        log('trace', 'Uib:start', `ioNamespace: `, this.ioNamespace, `\nioPath: ${this.ioPath}`)()


        // Handle options
        if (options) {
            if (options.ioNamespace !== undefined && options.ioNamespace !== null && options.ioNamespace !== '') this.ioNamespace = options.ioNamespace
            if (options.ioPath !== undefined && options.ioPath !== null && options.ioPath !== '') this.ioPath = options.ioPath
        }

        // this.clearListener('msg')  // Hmm, not ideal as this clears ALL 'msg' listeners

        // Handle specialist messages like reload and _ui
        this.onChange('msg', (msg) => {
            // Process a client reload request from Node-RED - as the page is reloaded, everything else is ignored
            if (msg._uib && msg._uib.reload === true) {
                log('trace', 'Uib:start:onChange:reload', 'reloading')()
                location.reload()
                return
            }

            // Process msg._ui messages
            if (msg._ui) {
                log('trace', 'Uib:start:onChange:_ui', 'Calling _uiManager')()
                this._uiManager(msg)
                return
            }
        })

        // Start up Socket.IO connections and listeners
        this.ioSetup()

        this.started = true
        log('trace', 'Uib:start', 'Start completed')()
    }

    //#endregion -------- ------------ -------- //

} // ==== End of Class Uib

//#region --- Wrap up ---
// Create an instance (we will only ever want one)
const uibuilder = new Uib()

// Assign reference to the instance to the global `window` object
// Only useful if loading via <script> tag - prefer loading via `import uibuilder from ...`
if (!window['uibuilder']) {
    window['uibuilder'] = uibuilder
} else {
    log('error', 'uibuilder.module.js', 'uibuilder already assigned to window. Have you tried to load it more than once?')
}

if (!window['$']) {
    window['$'] = document.querySelector.bind(document)
} else {
    log('warn', 'uibuilder.module.js', 'Cannot allocate the global `$`, it is already in use')
}

// Can import as `import uibuilder from ...` OR `import {uibuilder} from ...`
export { uibuilder }
export default uibuilder
//#endregion --- Wrap up ---

// EOF
