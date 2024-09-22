# component-template

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.<br />Other watched attributes:<br />None<br /><br />Standard props (common across all my components): |

## Properties

| Property  | Type                         | Default      | Description                                      |
|-----------|------------------------------|--------------|--------------------------------------------------|
| `$`       | `function(string): Element`  |              | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`      | `function(string): NodeList` |              | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `opts`    | `object`                     | {}           | Runtime configuration settings                   |
| `uib`     | `boolean`                    | false        | Is UIBUILDER for Node-RED loaded?                |
| `version` | `string`                     | "2024-09-21" | Component version                                |

## Methods

| Method            | Type                                  | Description                                      |
|-------------------|---------------------------------------|--------------------------------------------------|
| `config`          | `(config: object\|undefined): object` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `doInheritStyles` | `(url: *): Promise<void>`             | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |

## Events

| Event                              | Type                                             | Description                                      |
|------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `component-template:attribChanged` | `CustomEvent<{ id: string; name: string \| null \| undefined; attribute: string; newVal: string; oldVal: string; }>` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `component-template:connected`     | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `component-template:disconnected`  | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Container contents<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
