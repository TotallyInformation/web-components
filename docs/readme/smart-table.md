# smart-table

## Properties

| Property        | Attribute       | Type                         | Default               | Description                                      |
|-----------------|-----------------|------------------------------|-----------------------|--------------------------------------------------|
| `$`             |                 | `function(string): Element`  |                       | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`            |                 | `function(string): NodeList` |                       | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected`     |                 | `boolean`                    | false                 | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `data`          |                 |                              |                       | Set the value to show                            |
| `elTbody`       |                 | `HTMLTableElement`           |                       | Reference to table body                          |
| `elTfoot`       |                 | `HTMLTableElement`           |                       | Reference to table foot                          |
| `elThead`       |                 | `HTMLTableElement`           |                       | Reference to table head                          |
| `inherit-style` | `inherit-style` | `string\|boolean`            |                       | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.<br /><br />Standard props (common across all my components): |
| `name`          | `name`          | `string`                     |                       | Placeholder for the optional name attribute      |
| `opts`          |                 | `object`                     | {}                    | Runtime configuration settings                   |
| `uib`           |                 | `boolean`                    | false                 | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`     |                 |                              | "window['uibuilder']" |                                                  |

## Methods

| Method                  | Type                                             | Description                                      |
|-------------------------|--------------------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): object`            | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                                       | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                              | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`              | `(): void`                                       | Ensure that the component instance has a unique ID & check again if uib loaded |
| `getCellById`           | `(cellId: string): HTMLTableCellElement\|null`   | Get an element reference from an RxCx cell reference<br /><br />**cellId**: The RxCx cell reference required |
| `getValueByCellId`      | `(cellId: string): *`                            | Get the value of a data cell using RxCx referencing<br /><br />**cellId**: The RxCx cell reference required |
| `getValueByOffset`      | `(obj: object\|Array, rowOffset: number, colOffset: number): *` | Allows access to a cell using numeric row/col offsets<br /><br />**obj**: The 2d object to search<br />**rowOffset**: The row offset<br />**colOffset**: The column offset |
| `prependStylesheet`     | `(cssText: string, order?: number): Element`     | Attaches a new stylesheet before all other stylesheets in the light DOM<br /><br />**cssText**: CSS text to inject directly<br />**order**: Optional order/priority for stylesheet placement. Lower numbers = higher priority (inserted first). Defaults to 0. |
| `uibSend`               | `(evtName: string, data: string): void`          | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | None, this component does not use the shadow dom<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
