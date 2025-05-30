# data-list

## Example

```html
<data-list id="myComponent" type="ol" inherit-style="./myComponent.css"></data-list>

See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
```

## Properties

| Property            | Attribute           | Type                         | Default               | Description                                      |
|---------------------|---------------------|------------------------------|-----------------------|--------------------------------------------------|
| `$`                 |                     | `function(string): Element`  |                       | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`                |                     | `function(string): NodeList` |                       | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected`         |                     | `boolean`                    | false                 | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `data`              |                     | `object`                     |                       | 💫 The data to use for the list. Either set directly or via the `listvar` attribute. If an object, the key/value separator is used to separate the key and value in the list items.<br /><br />NB: properties marked with 💫 are dynamic and have getters/setters. They will cause the list to rebuild. |
| `inherit-style`     | `inherit-style`     | `string\|boolean`            |                       | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `keyvalueseparator` | `keyvalueseparator` | `string`                     | " :: "                | Optional. The separator to use between key and value in the list items when input is an object. Default is ' :: '. Set to "NULL" to disable key display. |
| `liststyle`         | `liststyle`         | `string`                     |                       | 💫 Optional. The style type to use for the list. Default is `disc` for `ul` and `decimal` for `ol`. May contain any valid CSS list-style string value.<br /><br />PROPS FROM BASE: (see TiBaseComponent)<br />OTHER STANDARD PROPS: |
| `listvar`           | `listvar`           | `string`                     | null                  | 💫 Optional. The global variable name to use for the list data. If not set, set the data property directly from JS. |
| `name`              | `name`              | `string`                     |                       | Optional. HTML name attribute. Included in output _meta prop.<br /><br />Other watched attributes: |
| `opts`              |                     | `object`                     | {}                    | Runtime configuration settings                   |
| `type`              | `type`              | `string`                     |                       | 💫 Optional. The type of list to use, ul or ol. Default is ul. |
| `uib`               |                     | `boolean`                    | false                 | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`         |                     |                              | "window['uibuilder']" |                                                  |

## Methods

| Method                  | Type                                         | Description                                      |
|-------------------------|----------------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): object`        | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                                   | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                          | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`              | `(): void`                                   | Ensure that the component instance has a unique ID & check again if uib loaded |
| `entry`                 | `(key: string \| number, val: string): void` | Dynamically change/add list entries - rebuilds the list DOM element<br /><br />**key**: Object key or array index to change/add<br />**val**: Updates/new list text (can be HTML) |
| `uibSend`               | `(evtName: string, data: string): void`      | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |

## Slots

| Name | Description        |
|------|--------------------|
|      | Container contents |
