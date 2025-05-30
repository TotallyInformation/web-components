# state-timeline

## Properties

| Property        | Attribute       | Type                                             | Default                                          | Description                                      |
|-----------------|-----------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`             |                 | `function(string): Element`                      |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`            |                 | `function(string): NodeList`                     |                                                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `bgColors`      |                 | `{ info: string; warn: string; error: string; }` | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`        |                 | `{ log: string; error: string; warn: string; }`  | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `icons`         |                 | `{ log: string; info: string; debug: string; trace: string; warn: string; error: string; }` | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `inherit-style` | `inherit-style` | `string\|boolean`                                |                                                  | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.<br />Other watched attributes:<br />None<br /><br />Standard props (common across all my components): |
| `online`        |                 | `boolean`                                        | "onLine"                                         | Are we online?                                   |
| `opts`          |                 | `{ states: { undefined: { name: string; label: string; color: string; }; offline: { name: string; label: string; color: string; }; }; timespan: number; maxEntries: number; }` | {"states":"defaultStates","timespan":43200,"maxEntries":10000} | Runtime configuration settings                   |
| `uib`           |                 | `boolean`                                        | false                                            | Is UIBUILDER loaded?                             |
| `version`       |                 | `string`                                         | "2024-09-18"                                     | Component version                                |

## Methods

| Method            | Type                                             | Description                                      |
|-------------------|--------------------------------------------------|--------------------------------------------------|
| `config`          | `(config: object\|undefined): { states: { undefined: { name: string; label: string; color: string; }; offline: { name: string; label: string; color: string; }; }; timespan: number; maxEntries: number; }` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `doInheritStyles` | `(url: *): Promise<void>`                        | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `updateState`     | `(stateName: string): void`                      | Updates the timeline with a new state<br /><br />**stateName**: Name of the state |

## Events

| Event                          | Type                                             | Description                                      |
|--------------------------------|--------------------------------------------------|--------------------------------------------------|
| `state-timeline:attribChanged` | `CustomEvent<{ id: string; name: string \| null \| undefined; attribute: string; newVal: string; oldVal: string; }>` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `state-timeline:connected`     | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `state-timeline:disconnected`  | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Container contents<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
