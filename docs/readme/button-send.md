# button-send

A Zero dependency button web component that sends a msg or a document event when clicked.
Contains relevant data from data-*, topic and payload attributes (or properties),
includes a _meta object showing whether any modifier keys were used, the element id/name

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |

## Properties

| Property     | Attribute | Type                         | Default      | Description                                      |
|--------------|-----------|------------------------------|--------------|--------------------------------------------------|
| `$`          |           | `function(string): Element`  |              | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`         |           | `function(string): NodeList` |              | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected`  |           | `boolean`                    | false        | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `name`       | `name`    | `string`                     |              | Placeholder for the optional name attribute      |
| `opts`       |           | `object`                     | {}           | Runtime configuration settings                   |
| `payload`    | `payload` | `any\|string`                |              | Can be an attribute or property. If used as property, must not use payload attribute in html, aAllows any data to be attached to payload. As an attribute, allows a string only.<br />By default, all attributes are also created as properties |
| `sendEvents` |           | `boolean`                    | true         |                                                  |
| `topic`      | `topic`   | `string\|undefined`          |              | The topic to include in the output               |
| `uib`        |           | `boolean`                    | false        | Is UIBUILDER for Node-RED loaded?                |
| `version`    |           | `string`                     | "2024-09-29" | Component version                                |

## Methods

| Method                  | Type                               | Description                                      |
|-------------------------|------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): any` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                         | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                         | Ensure that the component instance has a unique ID & check again if uib loaded |
| `handleClick`           | `(evt: PointerEvent): void`        | fn to run when the button is clicked<br /><br />**evt**: The event object |

## Events

| Event                       | Type       | Description                                      |
|-----------------------------|------------|--------------------------------------------------|
| `button-send:attribChanged` |            | When a watched attribute changes. `evt.details` contains the details of the change. |
| `button-send:click`         |            | Document object event. evt.details contains the data |
| `button-send:connected`     |            | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `button-send:disconnected`  |            | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |
| `button-send:ready`         |            | Alias for connected. The instance can handle property & attribute changes |
| `uibuilder.send`            | `function` | Sends a msg back to Node-RED if uibuilder available. topic, payload and _meta props may all be set.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags). |

## CSS Shadow Parts

| Part     | Description                                      |
|----------|--------------------------------------------------|
| `button` | Uses the uib-styles.css uibuilder master for variables where available.<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
