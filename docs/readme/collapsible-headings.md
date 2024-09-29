# collapsible-headings

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |

## Properties

| Property    | Attribute | Type                         | Default          | Description                                      |
|-------------|-----------|------------------------------|------------------|--------------------------------------------------|
| `$`         |           | `function(string): Element`  |                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`        |           | `function(string): NodeList` |                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected` |           | `boolean`                    | false            | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `levels`    | `levels`  | `string`                     | "h2, h3, h4, h5" | Optional. Default='h2, h3, h4, h5'. A single string detailing the heading levels to make collapsible.<br /><br />Standard props (common across all my components): |
| `name`      | `name`    | `string`                     |                  | Placeholder for the optional name attribute      |
| `opts`      |           | `object`                     | {}               | Runtime configuration settings                   |
| `uib`       |           | `boolean`                    | false            | Is UIBUILDER for Node-RED loaded?                |
| `version`   |           | `string`                     | "2024-09-29"     | Component version                                |

## Methods

| Method                  | Type                               | Description                                      |
|-------------------------|------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): any` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                         | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                         | Ensure that the component instance has a unique ID & check again if uib loaded |
| `processElement`        | `(element: HTMLElement): void`     | Process each found element node. Adds pointer cursor to the heading and wraps content in a div that can be collapsed.<br /><br />**element**: The HTML element to process |
| `processSlotContent`    | `(): void`                         | Walk through slot content.<br />Called once when connected and then every time slot content changes<br />param {*} records Mutated records<br />param {*} observer Reference to the observer object |

## Events

| Event                                | Description                                      |
|--------------------------------------|--------------------------------------------------|
| `collapsible-headings:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `collapsible-headings:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `collapsible-headings:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |
| `component-template:ready`           | Alias for connected. The instance can handle property & attribute changes |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Container contents<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
