# led-gauge

## Properties

| Property              | Attribute             | Type                         | Default               | Description                                      |
|-----------------------|-----------------------|------------------------------|-----------------------|--------------------------------------------------|
| `$`                   |                       | `function(string): Element`  |                       | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`                  |                       | `function(string): NodeList` |                       | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `colors`              |                       |                              |                       | Set the value of the gauge                       |
| `connected`           |                       | `boolean`                    | false                 | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `hide-segment-labels` | `hide-segment-labels` | `string`                     |                       | PROPS FROM BASE: (see TiBaseComponent)<br />OTHER STANDARD PROPS: |
| `hideSegmentLabels`   |                       | `string \| boolean`          |                       | Set whether to hide the segment labels           |
| `inherit-style`       | `inherit-style`       | `string\|boolean`            |                       | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `max`                 | `max`                 | `string \| number`           |                       | Set the maximum value of the gauge               |
| `min`                 | `min`                 | `string \| number`           |                       | Set the minimum value of the gauge               |
| `name`                | `name`                | `string`                     |                       | Optional. HTML name attribute. Included in output _meta prop.<br /><br />Other watched attributes: |
| `opts`                |                       | `object`                     | {}                    | Runtime configuration settings                   |
| `segContainerEl`      |                       | `HTMLElement`                |                       |                                                  |
| `segmentElements`     |                       | `HTMLCollection`             |                       |                                                  |
| `segments`            | `segments`            | `string \| number`           |                       | Set the number of segments                       |
| `uib`                 |                       | `boolean`                    | false                 | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`           |                       |                              | "window['uibuilder']" |                                                  |
| `unit`                | `unit`                | `string`                     |                       | Set the unit of the gauge                        |
| `valsContainerEl`     |                       | `HTMLElement`                |                       |                                                  |
| `value`               | `value`               | `string \| number`           |                       | Set the value of the gauge                       |
| `valueEl`             |                       | `HTMLElement`                |                       |                                                  |

## Methods

| Method                  | Type                                         | Description                                      |
|-------------------------|----------------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): object`        | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                                   | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                          | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`              | `(): void`                                   | Ensure that the component instance has a unique ID & check again if uib loaded |
| `prependStylesheet`     | `(cssText: string, order?: number): Element` | Attaches a new stylesheet before all other stylesheets in the light DOM<br /><br />**cssText**: CSS text to inject directly<br />**order**: Optional order/priority for stylesheet placement. Lower numbers = higher priority (inserted first). Defaults to 0. |
| `uibSend`               | `(evtName: string, data: string): void`      | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Container contents<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
