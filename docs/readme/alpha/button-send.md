# button-send

A Zero dependency button web component that sends a msg or a document event when clicked.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

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
| `$`    | `(selection: keyof HTMLElementTagNameMap): HTMLElement \| HTMLObjectElement \| HTMLAnchorElement \| ... 60 more ... \| null` | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |

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
| `button` | Uses the uib-styles.css uibuilder master for variables where available.<br /><br />See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document |


# definition-list

A Zero dependency button web component that sends a msg or a document event when clicked.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

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
| `$`    | `(selection: keyof HTMLElementTagNameMap): HTMLElement \| HTMLObjectElement \| HTMLAnchorElement \| ... 60 more ... \| null` | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |

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
| `button` | Uses the uib-styles.css uibuilder master for variables where available.<br /><br />See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document |


# button-send

A Zero dependency button web component that will display a circular thermometer display and controller for heating systems.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Attributes

| Attribute | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| `data-*`  | `string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `id`      | `string` | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `name`    | `string` | Optional. HTML name attribute. Included in output _meta prop. |

## Properties

| Property       | Attribute | Type                                             | Default                                          | Description                                      |
|----------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `displayMode`  |           | `string`                                         | "default"                                        | What is the current display mode?                |
| `maxset`       |           | `string \| 999`                                  |                                                  |                                                  |
| `minset`       |           | `string \| -999`                                 |                                                  |                                                  |
| `mode`         |           | `string`                                         |                                                  |                                                  |
| `modes`        |           | `{ heating: { label: string; icon: string; }; cooling: { label: string; icon: string; }; off: { label: string; icon: string; }; }` | {"heating":{"label":"heating","icon":"🔥"},"cooling":{"label":"cooling","icon":"❄️"},"off":{"label":"off","icon":"⛔"}} |                                                  |
| `payload`      | `payload` | `any\|string`                                    | ""                                               | Can be an attribute or property. If used as property, must not use payload attribute in html, allows any data to be attached to payload. As an attribute, allows a string only. |
| `props`        |           | `Array<string>`                                  | ["name","id","temperature","setpoint","mode"]    | List of watched HtML Attributes                  |
| `setincrement` |           | `string \| 0.1`                                  |                                                  |                                                  |
| `setpoint`     |           | `string`                                         |                                                  |                                                  |
| `switchState`  |           | `string`                                         | "off"                                            |                                                  |
| `temperature`  |           | `string`                                         |                                                  |                                                  |
| `topic`        | `topic`   | `string`                                         | ""                                               | Optional. Topic string to use. Mostly for node-red messages |

## Methods

| Method      | Type                                         | Description                                      |
|-------------|----------------------------------------------|--------------------------------------------------|
| `$`         | `(selection: string): HTMLElement \| null`   | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |
| `checkMode` | `(): void`                                   | When the temp or setpoint changes, check the heating/cooling mode and change if needed |
| `doNote`    | `(note: string, lblNote: HTMLElement): void` | Set the note label if required<br /><br />**note**: The text to display<br />**lblNote**: Reference to the SVG <text> element containing the text |
| `str2bool`  | `(strvalue: *): boolean`                     | Convert a string 'true' or 'false' to a boolean true/false<br /><br />**strvalue**: The string representation of the boolean |
| `uibSend`   | `(): void`                                   | uibuilder send                                   |

## Events

| Event               | Type                                             | Description                                      |
|---------------------|--------------------------------------------------|--------------------------------------------------|
| `button-send:click` | `CustomEvent<{ topic: string; payload: any; _meta: { id: string; name: string \| null; data: { [x: string]: string \| undefined; }; }; }>` | Document object event. evt.details contains the data |
| `uibuilder.send`    | `function`                                       | Sends a msg back to Node-RED if uibuilder available. topic, payload and _meta props may all be set. |

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

## Attributes

| Attribute | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| `data-*`  | `string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `id`      | `string` | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `name`    | `string` | Optional. HTML name attribute. Included in output _meta prop. |

## Properties

| Property       | Attribute | Type                                             | Default                                          | Description                                      |
|----------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `displayMode`  |           | `string`                                         | "default"                                        | What is the current display mode?                |
| `maxset`       |           | `string \| 999`                                  |                                                  |                                                  |
| `minset`       |           | `string \| -999`                                 |                                                  |                                                  |
| `mode`         |           | `string`                                         |                                                  |                                                  |
| `modes`        |           | `{ heating: { label: string; icon: string; }; cooling: { label: string; icon: string; }; off: { label: string; icon: string; }; }` | {"heating":{"label":"heating","icon":"🔥"},"cooling":{"label":"cooling","icon":"❄️"},"off":{"label":"off","icon":"⛔"}} |                                                  |
| `payload`      | `payload` | `any\|string`                                    | ""                                               | Can be an attribute or property. If used as property, must not use payload attribute in html, allows any data to be attached to payload. As an attribute, allows a string only. |
| `props`        |           | `Array<string>`                                  | ["name","id","temperature","setpoint","mode"]    | List of watched HtML Attributes                  |
| `setincrement` |           | `string \| 0.1`                                  |                                                  |                                                  |
| `setpoint`     |           | `string`                                         |                                                  |                                                  |
| `switchState`  |           | `string`                                         | "off"                                            |                                                  |
| `temperature`  |           | `string`                                         |                                                  |                                                  |
| `topic`        | `topic`   | `string`                                         | ""                                               | Optional. Topic string to use. Mostly for node-red messages |

## Methods

| Method      | Type                                         | Description                                      |
|-------------|----------------------------------------------|--------------------------------------------------|
| `$`         | `(selection: string): HTMLElement \| null`   | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |
| `checkMode` | `(): void`                                   | When the temp or setpoint changes, check the heating/cooling mode and change if needed |
| `doNote`    | `(note: string, lblNote: HTMLElement): void` | Set the note label if required<br /><br />**note**: The text to display<br />**lblNote**: Reference to the SVG <text> element containing the text |
| `str2bool`  | `(strvalue: *): boolean`                     | Convert a string 'true' or 'false' to a boolean true/false<br /><br />**strvalue**: The string representation of the boolean |
| `uibSend`   | `(): void`                                   | uibuilder send                                   |

## Events

| Event               | Type                                             | Description                                      |
|---------------------|--------------------------------------------------|--------------------------------------------------|
| `button-send:click` | `CustomEvent<{ topic: string; payload: any; _meta: { id: string; name: string \| null; data: { [x: string]: string \| undefined; }; }; }>` | Document object event. evt.details contains the data |
| `uibuilder.send`    | `function`                                       | Sends a msg back to Node-RED if uibuilder available. topic, payload and _meta props may all be set. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available.<br /><br />See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document |
