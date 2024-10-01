# component-template

## Attributes

| Attribute       | Type              | Description                                      |
|-----------------|-------------------|--------------------------------------------------|
| `inherit-style` | `string\|boolean` | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |

## Properties

| Property    | Attribute | Type                         | Default      | Description                                      |
|-------------|-----------|------------------------------|--------------|--------------------------------------------------|
| `$`         |           | `function(string): Element`  |              | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`        |           | `function(string): NodeList` |              | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected` |           | `boolean`                    | false        | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `name`      | `name`    | `string`                     |              | Placeholder for the optional name attribute      |
| `opts`      |           | `object`                     | {}           | Runtime configuration settings                   |
| `uib`       |           | `boolean`                    | false        | Is UIBUILDER for Node-RED loaded?                |
| `version`   |           | `string`                     | "2024-09-30" | Component version                                |

## Methods

| Method                  | Type                               | Description                                      |
|-------------------------|------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): any` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                         | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `ensureId`              | `(): void`                         | Ensure that the component instance has a unique ID & check again if uib loaded |

## Events

| Event                              | Description                                      |
|------------------------------------|--------------------------------------------------|
| `component-template:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance.<br /><br />Standard watched attributes (common across all my components): |
| `component-template:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `component-template:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |
| `component-template:ready`         | Alias for connected. The instance can handle property & attribute changes |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Container contents<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |


# component-template

A uibuilder for Node-RED Theme Changer component

## Attributes

| Attribute       | Type                                             | Description                                      |
|-----------------|--------------------------------------------------|--------------------------------------------------|
| `data-*`        | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `inherit-style` |                                                  |                                                  |

## Properties

| Property           | Type                         | Default      | Description                                      |
|--------------------|------------------------------|--------------|--------------------------------------------------|
| `$`                | `function(string): Element`  |              | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`               | `function(string): NodeList` |              | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `name`             | `string`                     |              | Sync'd from name attribute<br /><br />slot Container contents |
| `opts`             | `object`                     | {}           | Runtime configuration settings                   |
| `scheme`           | `undefined`                  | "undefined"  | What is the current scheme? 'light', 'dark' or 'auto' |
| `uib`              | `boolean`                    | false        | Is UIBUILDER for Node-RED loaded?                |
| `uibThemeSettings` | `object`                     | {}           | Holds the uib theme settings for all pages in this domain (from/to localStorage) |
| `version`          | `string`                     | "2024-09-21" | Component version                                |

## Methods

| Method             | Type                                  | Description                                      |
|--------------------|---------------------------------------|--------------------------------------------------|
| `config`           | `(config: object\|undefined): object` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `doInheritStyles`  | `(url: *): Promise<void>`             | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `evtClickChooser`  | `(evt: MouseEvent): void`             | Handle the light/dark theme chooser. Override contrast css variables and set appropriate class on html<br /><br />**evt**: undefined |
| `evtClickContrast` | `(evt: MouseEvent): void`             | Handle contrast click. Override contrast css variables and set appropriate class on html<br /><br />**evt**: Click event |
| `evtClickReset`    | `(evt: MouseEvent): void`             | Handle reset button. Override contrast css variables and set appropriate class on html<br /><br />**evt**: undefined |
| `evtClickToggle`   | `(evt: MouseEvent): void`             | TODO Handle the icon<br /><br />**evt**: undefined |
| `setTheme`         | `(theme: *): any`                     | **theme**: undefined                             |

## Events

| Event                             | Type                                             | Description                                      |
|-----------------------------------|--------------------------------------------------|--------------------------------------------------|
| `uib-theme-changer:attribChanged` | `CustomEvent<{ id: string; name: string \| null \| undefined; attribute: string; newVal: string; oldVal: string; }>` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance. |
| `uib-theme-changer:connected`     | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `uib-theme-changer:construction`  |                                                  | Document object event. evt.details contains the data |
| `uib-theme-changer:disconnected`  | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |


# uib-theme-changer

A uibuilder for Node-RED Theme Changer component

## Attributes

| Attribute       | Type                                             | Description                                      |
|-----------------|--------------------------------------------------|--------------------------------------------------|
| `data-*`        | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `inherit-style` |                                                  |                                                  |

## Properties

| Property           | Type                         | Default      | Description                                      |
|--------------------|------------------------------|--------------|--------------------------------------------------|
| `$`                | `function(string): Element`  |              | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`               | `function(string): NodeList` |              | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `name`             | `string`                     |              | Sync'd from name attribute<br /><br />slot Container contents |
| `opts`             | `object`                     | {}           | Runtime configuration settings                   |
| `scheme`           | `undefined`                  | "undefined"  | What is the current scheme? 'light', 'dark' or 'auto' |
| `uib`              | `boolean`                    | false        | Is UIBUILDER for Node-RED loaded?                |
| `uibThemeSettings` | `object`                     | {}           | Holds the uib theme settings for all pages in this domain (from/to localStorage) |
| `version`          | `string`                     | "2024-09-21" | Component version                                |

## Methods

| Method             | Type                                  | Description                                      |
|--------------------|---------------------------------------|--------------------------------------------------|
| `config`           | `(config: object\|undefined): object` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `doInheritStyles`  | `(url: *): Promise<void>`             | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `evtClickChooser`  | `(evt: MouseEvent): void`             | Handle the light/dark theme chooser. Override contrast css variables and set appropriate class on html<br /><br />**evt**: undefined |
| `evtClickContrast` | `(evt: MouseEvent): void`             | Handle contrast click. Override contrast css variables and set appropriate class on html<br /><br />**evt**: Click event |
| `evtClickReset`    | `(evt: MouseEvent): void`             | Handle reset button. Override contrast css variables and set appropriate class on html<br /><br />**evt**: undefined |
| `evtClickToggle`   | `(evt: MouseEvent): void`             | TODO Handle the icon<br /><br />**evt**: undefined |
| `setTheme`         | `(theme: *): any`                     | **theme**: undefined                             |

## Events

| Event                             | Type                                             | Description                                      |
|-----------------------------------|--------------------------------------------------|--------------------------------------------------|
| `uib-theme-changer:attribChanged` | `CustomEvent<{ id: string; name: string \| null \| undefined; attribute: string; newVal: string; oldVal: string; }>` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance. |
| `uib-theme-changer:connected`     | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `uib-theme-changer:construction`  |                                                  | Document object event. evt.details contains the data |
| `uib-theme-changer:disconnected`  | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |
