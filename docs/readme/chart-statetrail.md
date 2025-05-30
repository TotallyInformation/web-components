# chart-statetrail

## Properties

| Property        | Attribute       | Type                         | Default                                          | Description                                      |
|-----------------|-----------------|------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`             |                 | `function(string): Element`  |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`            |                 | `function(string): NodeList` |                                                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected`     |                 | `boolean`                    | false                                            | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `inherit-style` | `inherit-style` | `string\|boolean`            |                                                  | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `maxTime`       |                 | `number`                     | 0                                                | The maximum timestamp for the time axis          |
| `minTime`       |                 | `number`                     | 0                                                | The minimum timestamp for the time axis          |
| `name`          | `name`          | `string`                     |                                                  | Optional. HTML name attribute. Included in output _meta prop.<br /><br />Other watched attributes:<br />None<br /><br />Standard props (common across all my components): |
| `opts`          |                 | `object`                     | {"data":{},"categoryMap":[{"range":[0,0.3],"title":"Off","color":"var(--failure, red)"},{"range":[0.3,0.6],"title":"Partial","color":"var(--warning, #c8b421)"},{"range":[0.6,1],"title":"On","color":"var(--success, green)"}],"itemMap":{}} | Default component options                        |
| `totalDuration` |                 | `number`                     | 0                                                | The total duration of the time axis              |
| `uib`           |                 | `boolean`                    | false                                            | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`     |                 |                              | "window['uibuilder']"                            |                                                  |

## Methods

| Method                   | Type                                    | Description                                      |
|--------------------------|-----------------------------------------|--------------------------------------------------|
| `config`                 | `(config: object\|undefined): object`   | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createAxisLine`         | `(): HTMLDivElement`                    |                                                  |
| `createShadowSelectors`  | `(): void`                              | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`        | `(): Promise<void>`                     | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`               | `(): void`                              | Ensure that the component instance has a unique ID & check again if uib loaded |
| `uibSend`                | `(evtName: string, data: string): void` | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |
| `updateMinMaxTimestamps` | `(): void`                              |                                                  |

## Events

| Event                            | Description                                      |
|----------------------------------|--------------------------------------------------|
| `chart-statetrail:attribChanged` | When a watched attribute changes. `evt.details.data` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `chart-statetrail:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `chart-statetrail:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |
| `chart-statetrail:ready`         | Alias for connected. The instance can handle property & attribute changes |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Container contents<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
