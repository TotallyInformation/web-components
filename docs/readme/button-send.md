# button-send

A Zero dependency button web component that sends a msg or a document event when clicked.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `data-*`        | `string`          | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object.<br /><br />Standard props (common across all my components): |
| `id`            | `string`          | Optional. HTML ID, must be unique on page. Included in output _meta prop. |
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.<br /><br />Other watched attributes: |
| `name`          | `string`          | Optional. HTML name attribute. Included in output _meta prop. |

## Properties

| Property     | Attribute | Type                         | Default      | Description                                      |
|--------------|-----------|------------------------------|--------------|--------------------------------------------------|
| `$`          |           | `function(string): Element`  |              | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`         |           | `function(string): NodeList` |              | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `opts`       |           | `object`                     | {}           | Runtime configuration settings                   |
| `payload`    | `payload` | `any\|string`                |              | Can be an attribute or property. If used as property, must not use payload attribute in html, aAllows any data to be attached to payload. As an attribute, allows a string only.<br />By default, all attributes are also created as properties |
| `sendEvents` |           | `boolean`                    | true         |                                                  |
| `topic`      | `topic`   | `string\|undefined`          |              | The topic to include in the output               |
| `uib`        |           | `boolean`                    | false        | Is UIBUILDER for Node-RED loaded?                |
| `version`    |           | `string`                     | "2024-09-22" | Component version                                |

## Methods

| Method                  | Type                                  | Description                                      |
|-------------------------|---------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): object` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                            |                                                  |
| `doInheritStyles`       | `(): Promise<void>`                   | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                            | Ensure that the component instance has a unique ID & check again if uib loaded |
| `handleClick`           | `(evt: PointerEvent): void`           | fn to run when the button is clicked<br /><br />**evt**: The event object |

## Events

| Event                       | Type       | Description                                      |
|-----------------------------|------------|--------------------------------------------------|
| `button-send:attribChanged` |            | When a watched attribute changes. `evt.details` contains the details of the change. |
| `button-send:click`         |            | Document object event. evt.details contains the data |
| `button-send:connected`     |            | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `button-send:disconnected`  |            | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |
| `uibuilder.send`            | `function` | Sends a msg back to Node-RED if uibuilder available. topic, payload and _meta props may all be set.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available. |
