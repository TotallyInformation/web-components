# button-send

A Zero dependency button web component that sends a msg or a document event when clicked.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Properties

| Property  | Attribute | Type     | Default     | Description                                      |
|-----------|-----------|----------|-------------|--------------------------------------------------|
| `data`    |           | `string` |             | * - Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `id`      |           | `string` |             | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `name`    |           | `string` |             | Optional. HTML name attribute. Included in output _meta prop. |
| `payload` | `payload` | `string` | "undefined" | Optional. Payload string. Mostly for node-red messages. For non-string payload, see props below |
| `topic`   | `topic`   | `string` | "undefined" | Optional. Topic string to use. Mostly for node-red messages |

## Methods

| Method | Type                                             | Description                                      |
|--------|--------------------------------------------------|--------------------------------------------------|
| `$`    | `(selection: keyof HTMLElementTagNameMap): HTMLElement\|null` | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |

## Events

| Event               | Type                                             |
|---------------------|--------------------------------------------------|
| `button-send:click` | `CustomEvent<{ topic: undefined; payload: { [x: string]: string \| undefined; }; _meta: { id: string; name: string \| null; data: { [x: string]: string \| undefined; }; }; }>` |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available.<br /><br />See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document |


# definition-list

A Zero dependency button web component that sends a msg or a document event when clicked.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Properties

| Property  | Attribute | Type     | Default     | Description                                      |
|-----------|-----------|----------|-------------|--------------------------------------------------|
| `data`    |           | `string` |             | * - Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `id`      |           | `string` |             | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `name`    |           | `string` |             | Optional. HTML name attribute. Included in output _meta prop. |
| `payload` | `payload` | `string` | "undefined" | Optional. Payload string. Mostly for node-red messages. For non-string payload, see props below |
| `topic`   | `topic`   | `string` | "undefined" | Optional. Topic string to use. Mostly for node-red messages |

## Methods

| Method | Type                                             | Description                                      |
|--------|--------------------------------------------------|--------------------------------------------------|
| `$`    | `(selection: keyof HTMLElementTagNameMap): HTMLElement\|null` | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |

## Events

| Event               | Type                                             |
|---------------------|--------------------------------------------------|
| `button-send:click` | `CustomEvent<{ topic: undefined; payload: { [x: string]: string \| undefined; }; _meta: { id: string; name: string \| null; data: { [x: string]: string \| undefined; }; }; }>` |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available.<br /><br />See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document |


# button-send

A Zero dependency button web component that will display a circular thermometer display and controller for heating systems.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Properties

| Property       | Type                                             | Default                                          | Description                                      |
|----------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `displayMode`  | `string`                                         | "default"                                        | What is the current display mode?                |
| `id`           | `string`                                         |                                                  | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `maxset`       | `string \| 999`                                  |                                                  |                                                  |
| `minset`       | `string \| -999`                                 |                                                  |                                                  |
| `mode`         | `string`                                         |                                                  |                                                  |
| `modes`        | `{ heating: { label: string; icon: string; }; cooling: { label: string; icon: string; }; off: { label: string; icon: string; }; }` | {"heating":{"label":"heating","icon":"🔥"},"cooling":{"label":"cooling","icon":"❄️"},"off":{"label":"off","icon":"⛔"}} |                                                  |
| `name`         | `string`                                         |                                                  | Optional. HTML name attribute. Included in output _meta prop. |
| `payload`      | `string`                                         | ""                                               | Optional. Payload string. Mostly for node-red messages. For non-string payload, see props below |
| `props`        | `Array<string>`                                  | ["name","id","temperature","setpoint","mode"]    | List of watched HtML Attributes                  |
| `setincrement` | `string \| 0.1`                                  |                                                  |                                                  |
| `setpoint`     | `string`                                         |                                                  |                                                  |
| `switchState`  | `string`                                         | "off"                                            |                                                  |
| `temperature`  | `string`                                         |                                                  |                                                  |
| `topic`        | `string`                                         | ""                                               | Optional. Topic string to use. Mostly for node-red messages |

## Methods

| Method      | Type                                         | Description                                      |
|-------------|----------------------------------------------|--------------------------------------------------|
| `$`         | `(selection: string): HTMLElement \| null`   | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |
| `checkMode` | `(): void`                                   | When the temp or setpoint changes, check the heating/cooling mode and change if needed |
| `doNote`    | `(note: string, lblNote: HTMLElement): void` | Set the note label if required<br /><br />**note**: The text to display<br />**lblNote**: Reference to the SVG <text> element containing the text |
| `str2bool`  | `(strvalue: *): boolean`                     | Convert a string 'true' or 'false' to a boolean true/false<br /><br />**strvalue**: The string representation of the boolean |
| `uibSend`   | `(): void`                                   | uibuilder send                                   |

## Events

| Event               | Type                                             |
|---------------------|--------------------------------------------------|
| `button-send:click` | `CustomEvent<{ topic: string; payload: any; _meta: { id: string; name: string \| null; data: { [x: string]: string \| undefined; }; }; }>` |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available.<br /><br />See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document |


# ghost-thermometer

A Zero dependency button web component that will display a circular thermometer display and controller for heating systems.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Properties

| Property       | Type                                             | Default                                          | Description                                      |
|----------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `displayMode`  | `string`                                         | "default"                                        | What is the current display mode?                |
| `id`           | `string`                                         |                                                  | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `maxset`       | `string \| 999`                                  |                                                  |                                                  |
| `minset`       | `string \| -999`                                 |                                                  |                                                  |
| `mode`         | `string`                                         |                                                  |                                                  |
| `modes`        | `{ heating: { label: string; icon: string; }; cooling: { label: string; icon: string; }; off: { label: string; icon: string; }; }` | {"heating":{"label":"heating","icon":"🔥"},"cooling":{"label":"cooling","icon":"❄️"},"off":{"label":"off","icon":"⛔"}} |                                                  |
| `name`         | `string`                                         |                                                  | Optional. HTML name attribute. Included in output _meta prop. |
| `payload`      | `string`                                         | ""                                               | Optional. Payload string. Mostly for node-red messages. For non-string payload, see props below |
| `props`        | `Array<string>`                                  | ["name","id","temperature","setpoint","mode"]    | List of watched HtML Attributes                  |
| `setincrement` | `string \| 0.1`                                  |                                                  |                                                  |
| `setpoint`     | `string`                                         |                                                  |                                                  |
| `switchState`  | `string`                                         | "off"                                            |                                                  |
| `temperature`  | `string`                                         |                                                  |                                                  |
| `topic`        | `string`                                         | ""                                               | Optional. Topic string to use. Mostly for node-red messages |

## Methods

| Method      | Type                                         | Description                                      |
|-------------|----------------------------------------------|--------------------------------------------------|
| `$`         | `(selection: string): HTMLElement \| null`   | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |
| `checkMode` | `(): void`                                   | When the temp or setpoint changes, check the heating/cooling mode and change if needed |
| `doNote`    | `(note: string, lblNote: HTMLElement): void` | Set the note label if required<br /><br />**note**: The text to display<br />**lblNote**: Reference to the SVG <text> element containing the text |
| `str2bool`  | `(strvalue: *): boolean`                     | Convert a string 'true' or 'false' to a boolean true/false<br /><br />**strvalue**: The string representation of the boolean |
| `uibSend`   | `(): void`                                   | uibuilder send                                   |

## Events

| Event               | Type                                             |
|---------------------|--------------------------------------------------|
| `button-send:click` | `CustomEvent<{ topic: string; payload: any; _meta: { id: string; name: string \| null; data: { [x: string]: string \| undefined; }; }; }>` |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available.<br /><br />See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document |


# button-send

A Zero dependency button web component that sends a msg or a document event when clicked.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Example

```html
<button-send id="myButton">
     Click me to send a message
 </button-send>

See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
```

## Properties

| Property        | Attribute       | Type                         | Default               | Description                                      |
|-----------------|-----------------|------------------------------|-----------------------|--------------------------------------------------|
| `$`             |                 | `function(string): Element`  |                       | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`            |                 | `function(string): NodeList` |                       | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected`     |                 | `boolean`                    | false                 | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `inherit-style` | `inherit-style` | `string\|boolean`            |                       | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `name`          | `name`          | `string`                     |                       | Optional. HTML name attribute. Included in output _meta prop.<br /><br />Other watched attributes: |
| `opts`          |                 | `object`                     | {}                    | Runtime configuration settings                   |
| `payload`       | `payload`       | `string`                     |                       | Optional. Payload string. Mostly for node-red messages. For non-string payload, see props below<br /><br />PROPS FROM BASE: (see TiBaseComponent)<br />OTHER STANDARD PROPS: |
| `sendEvents`    |                 | `boolean`                    | true                  |                                                  |
| `topic`         | `topic`         | `string`                     |                       | Optional. Topic string to use. Mostly for node-red messages |
| `uib`           |                 | `boolean`                    | false                 | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`     |                 |                              | "window['uibuilder']" |                                                  |

## Methods

| Method                  | Type                                         | Description                                      |
|-------------------------|----------------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): object`        | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                                   | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                          | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`              | `(): void`                                   | Ensure that the component instance has a unique ID & check again if uib loaded |
| `handleClick`           | `(evt: MouseEvent \| PointerEvent): void`    | fn to run when the button is clicked<br /><br />**evt**: The event object |
| `prependStylesheet`     | `(cssText: string, order?: number): Element` | Attaches a new stylesheet before all other stylesheets in the light DOM<br /><br />**cssText**: CSS text to inject directly<br />**order**: Optional order/priority for stylesheet placement. Lower numbers = higher priority (inserted first). Defaults to 0. |
| `uibSend`               | `(evtName: string, data: string): void`      | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available. |
