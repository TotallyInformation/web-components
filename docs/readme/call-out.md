# call-out

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `title`         | `string`          | Optional. If present, will override the callout title text<br /><br />Standard props (common across all my components): |

## Properties

| Property    | Attribute | Type                         | Default | Description                                      |
|-------------|-----------|------------------------------|---------|--------------------------------------------------|
| `$`         |           | `function(string): Element`  |         | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`        |           | `function(string): NodeList` |         | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected` |           | `boolean`                    | false   | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `icon`      | `icon`    | `string`                     | ""      | Optional. If present, will override the callout title icon<br /><br />Non-watched but still used attributes: |
| `name`      | `name`    | `string`                     |         | Placeholder for the optional name attribute      |
| `opts`      |           | `object`                     | {}      | Runtime configuration settings                   |
| `type`      | `type`    | `string`                     | ""      | Optional. If present, a title will be added above other child content |
| `uib`       |           | `boolean`                    | false   | Is UIBUILDER for Node-RED loaded?                |

## Methods

| Method                  | Type                               | Description                                      |
|-------------------------|------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): any` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                         | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `doType`                | `(type: any): void`                |                                                  |
| `ensureId`              | `(): void`                         | Ensure that the component instance has a unique ID & check again if uib loaded |

## Events

| Event                    | Description                                      |
|--------------------------|--------------------------------------------------|
| `call-out:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `call-out:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `call-out:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |
| `call-out:ready`         | Alias for connected. The instance can handle property & attribute changes |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Container contents<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |