# syntax-highlight

## Example

```javascript
Set the json property on the element
const showMsg = document.getElementsByTagName('syntax-highlight')[0]
showMsg.json({....})

METHODS FROM BASE:
```

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `auto`          |                   |                                                  |
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |

## Properties

| Property    | Attribute | Type                         | Default | Description                                      |
|-------------|-----------|------------------------------|---------|--------------------------------------------------|
| `$`         |           | `function(string): Element`  |         | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`        |           | `function(string): NodeList` |         | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected` |           | `boolean`                    | false   | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `json`      |           |                              |         | Element.json = {...} to show the json object     |
| `jsonData`  |           | `object`                     | {}      |                                                  |
| `name`      | `name`    | `string`                     |         | Placeholder for the optional name attribute      |
| `opts`      |           | `object`                     | {}      | Runtime configuration settings                   |
| `uib`       |           | `boolean`                    | false   | Is UIBUILDER for Node-RED loaded?                |

## Methods

| Method                  | Type                               | Description                                      |
|-------------------------|------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): any` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                         | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                         | Ensure that the component instance has a unique ID & check again if uib loaded |

## Events

| Event                            | Description                                      |
|----------------------------------|--------------------------------------------------|
| `component-template:ready`       | Alias for connected. The instance can handle property & attribute changes |
| `syntax-highlight:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `syntax-highlight:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `syntax-highlight:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Container contents<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
