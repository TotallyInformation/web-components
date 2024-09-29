# component-template

## Example

```html
<visible-console></visible-console>

METHODS FROM BASE:
```

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |

## Properties

| Property          | Attribute | Type                         | Default                                          | Description                                      |
|-------------------|-----------|------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`               |           | `function(string): Element`  |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`              |           | `function(string): NodeList` |                                                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `bgColors`        |           | `object`                     | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`          |           | `object`                     | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `connected`       |           | `boolean`                    | false                                            | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `icons`           |           | `object`                     | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `name`            | `name`    | `string`                     |                                                  | Placeholder for the optional name attribute      |
| `opts`            |           | `object`                     | {}                                               | Runtime configuration settings                   |
| `originalConsole` |           | `object`                     | {}                                               |                                                  |
| `uib`             |           | `boolean`                    | false                                            | Is UIBUILDER for Node-RED loaded?                |
| `version`         |           | `string`                     | "2024-09-29"                                     | Component version                                |
| `wrapper`         |           | `any \| any`                 |                                                  |                                                  |

## Methods

| Method                  | Type                                 | Description                                      |
|-------------------------|--------------------------------------|--------------------------------------------------|
| `checkType`             | `(input: *): string`                 | Find out the input JavaScript var type<br /><br />**input**: The JavaScript var to type |
| `config`                | `(config: object\|undefined): any`   | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createHTMLVisualizer`  | `(input: *): HTMLDivElement`         | Creates an HTML visualisation of the input<br /><br />**input**: undefined |
| `createShadowSelectors` | `(): void`                           | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                  | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                           | Ensure that the component instance has a unique ID & check again if uib loaded |
| `newLog`                | `(type: string, args: string): void` | Creates a new HTML log entry<br /><br />**type**: The log type<br />**args**: The arguments to log |
| `redirectConsole`       | `(): void`                           | Capture console.xxxx and write to the div        |

## Events

| Event                           | Description                                      |
|---------------------------------|--------------------------------------------------|
| `component-template:ready`      | Alias for connected. The instance can handle property & attribute changes |
| `visible-console:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `visible-console:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `visible-console:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | No slot<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |


# visible-console

## Example

```html
<visible-console></visible-console>

METHODS FROM BASE:
```

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |

## Properties

| Property          | Attribute | Type                         | Default                                          | Description                                      |
|-------------------|-----------|------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`               |           | `function(string): Element`  |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`              |           | `function(string): NodeList` |                                                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `bgColors`        |           | `object`                     | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`          |           | `object`                     | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `connected`       |           | `boolean`                    | false                                            | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `icons`           |           | `object`                     | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `name`            | `name`    | `string`                     |                                                  | Placeholder for the optional name attribute      |
| `opts`            |           | `object`                     | {}                                               | Runtime configuration settings                   |
| `originalConsole` |           | `object`                     | {}                                               |                                                  |
| `uib`             |           | `boolean`                    | false                                            | Is UIBUILDER for Node-RED loaded?                |
| `version`         |           | `string`                     | "2024-09-29"                                     | Component version                                |
| `wrapper`         |           | `any \| any`                 |                                                  |                                                  |

## Methods

| Method                  | Type                                 | Description                                      |
|-------------------------|--------------------------------------|--------------------------------------------------|
| `checkType`             | `(input: *): string`                 | Find out the input JavaScript var type<br /><br />**input**: The JavaScript var to type |
| `config`                | `(config: object\|undefined): any`   | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createHTMLVisualizer`  | `(input: *): HTMLDivElement`         | Creates an HTML visualisation of the input<br /><br />**input**: undefined |
| `createShadowSelectors` | `(): void`                           | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                  | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                           | Ensure that the component instance has a unique ID & check again if uib loaded |
| `newLog`                | `(type: string, args: string): void` | Creates a new HTML log entry<br /><br />**type**: The log type<br />**args**: The arguments to log |
| `redirectConsole`       | `(): void`                           | Capture console.xxxx and write to the div        |

## Events

| Event                           | Description                                      |
|---------------------------------|--------------------------------------------------|
| `component-template:ready`      | Alias for connected. The instance can handle property & attribute changes |
| `visible-console:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `visible-console:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `visible-console:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | No slot<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
