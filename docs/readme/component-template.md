# component-template

## Example

```html
<visible-console></visible-console>
```

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.<br />Other watched attributes:<br />None<br /><br />Standard props (common across all my components): |

## Properties

| Property          | Type                         | Default                                          | Description                                      |
|-------------------|------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`               | `function(string): Element`  |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`              | `function(string): NodeList` |                                                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `bgColors`        | `object`                     | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`          | `object`                     | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `icons`           | `object`                     | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `opts`            | `object`                     | {}                                               | Is UIBUILDER for Node-RED loaded?                |
| `originalConsole` | `object`                     | {}                                               |                                                  |
| `uib`             | `boolean`                    | false                                            | Is UIBUILDER for Node-RED loaded?                |
| `version`         | `string`                     | "2024-09-21"                                     | Component version                                |
| `wrapper`         | `any \| any`                 |                                                  |                                                  |

## Methods

| Method                  | Type                                  | Description                                      |
|-------------------------|---------------------------------------|--------------------------------------------------|
| `checkType`             | `(input: *): string`                  | Find out the input JavaScript var type<br /><br />**input**: The JavaScript var to type |
| `config`                | `(config: object\|undefined): object` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createHTMLVisualizer`  | `(input: *): HTMLDivElement`          | Creates an HTML visualisation of the input<br /><br />**input**: undefined |
| `createShadowSelectors` | `(): void`                            |                                                  |
| `doInheritStyles`       | `(): Promise<void>`                   | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                            | Ensure that the component instance has a unique ID & check again if uib loaded |
| `newLog`                | `(type: string, args: string): void`  | Creates a new HTML log entry<br /><br />**type**: The log type<br />**args**: The arguments to log |
| `redirectConsole`       | `(): void`                            | Capture console.xxxx and write to the div        |

## Events

| Event                           | Description                                      |
|---------------------------------|--------------------------------------------------|
| `visible-console:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `visible-console:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `visible-console:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |


# visible-console

## Example

```html
<visible-console></visible-console>
```

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.<br />Other watched attributes:<br />None<br /><br />Standard props (common across all my components): |

## Properties

| Property          | Type                         | Default                                          | Description                                      |
|-------------------|------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`               | `function(string): Element`  |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`              | `function(string): NodeList` |                                                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `bgColors`        | `object`                     | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`          | `object`                     | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `icons`           | `object`                     | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `opts`            | `object`                     | {}                                               | Is UIBUILDER for Node-RED loaded?                |
| `originalConsole` | `object`                     | {}                                               |                                                  |
| `uib`             | `boolean`                    | false                                            | Is UIBUILDER for Node-RED loaded?                |
| `version`         | `string`                     | "2024-09-21"                                     | Component version                                |
| `wrapper`         | `any \| any`                 |                                                  |                                                  |

## Methods

| Method                  | Type                                  | Description                                      |
|-------------------------|---------------------------------------|--------------------------------------------------|
| `checkType`             | `(input: *): string`                  | Find out the input JavaScript var type<br /><br />**input**: The JavaScript var to type |
| `config`                | `(config: object\|undefined): object` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createHTMLVisualizer`  | `(input: *): HTMLDivElement`          | Creates an HTML visualisation of the input<br /><br />**input**: undefined |
| `createShadowSelectors` | `(): void`                            |                                                  |
| `doInheritStyles`       | `(): Promise<void>`                   | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                            | Ensure that the component instance has a unique ID & check again if uib loaded |
| `newLog`                | `(type: string, args: string): void`  | Creates a new HTML log entry<br /><br />**type**: The log type<br />**args**: The arguments to log |
| `redirectConsole`       | `(): void`                            | Capture console.xxxx and write to the div        |

## Events

| Event                           | Description                                      |
|---------------------------------|--------------------------------------------------|
| `visible-console:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `visible-console:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `visible-console:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |
