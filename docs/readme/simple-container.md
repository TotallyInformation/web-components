# simple-container

## Properties

| Property | Attribute | Type                                             | Default     | Description                                      |
|----------|-----------|--------------------------------------------------|-------------|--------------------------------------------------|
| `$`      |           |                                                  |             | Mini jQuery-like shadow dom selector (see constructor) |
| `data-*` |           | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` |             | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `name`   | `name`    | `string`                                         | "undefined" | Sync'd from name attribute                       |

## Events

| Event                            | Description                                      |
|----------------------------------|--------------------------------------------------|
| `simple-container:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance. |
| `simple-container:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `simple-container:construction`  | Document object event. evt.details contains the data |
| `simple-container:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name | Description        |
|------|--------------------|
|      | Container contents |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |


# simple-container

## Example

```html
<simple-container name="myComponent" inherit-style="./myComponent.css"></simple-container>

See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
```

## Properties

| Property        | Attribute       | Type                         | Default               | Description                                      |
|-----------------|-----------------|------------------------------|-----------------------|--------------------------------------------------|
| `$`             |                 | `function(string): Element`  |                       | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`            |                 | `function(string): NodeList` |                       | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected`     |                 | `boolean`                    | false                 | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `inherit-style` | `inherit-style` | `string\|boolean`            |                       | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `name`          | `name`          | `string`                     |                       | Optional. HTML name attribute. Included in output _meta prop.<br /><br />Other watched attributes:<br />None<br /><br />PROPS FROM BASE: (see TiBaseComponent)<br />OTHER STANDARD PROPS: |
| `opts`          |                 | `object`                     | {}                    | Runtime configuration settings                   |
| `uib`           |                 | `boolean`                    | false                 | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`     |                 |                              | "window['uibuilder']" |                                                  |

## Methods

| Method                  | Type                                    | Description                                      |
|-------------------------|-----------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): object`   | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                              | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                     | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`              | `(): void`                              | Ensure that the component instance has a unique ID & check again if uib loaded |
| `uibSend`               | `(evtName: string, data: string): void` | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |

## Slots

| Name | Description        |
|------|--------------------|
|      | Container contents |
