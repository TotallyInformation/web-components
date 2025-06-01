# component-template

## Example

```html
<component-template name="myComponent" inherit-style="./myComponent.css"></component-template>

See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
```

## Properties

| Property        | Attribute       | Type                         | Default               | Description                                      |
|-----------------|-----------------|------------------------------|-----------------------|--------------------------------------------------|
| `$`             |                 | `function(string): Element`  |                       | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`            |                 | `function(string): NodeList` |                       | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `connected`     |                 | `boolean`                    | false                 | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `inherit-style` | `inherit-style` | `string\|boolean`            |                       | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `name`          | `name`          | `string`                     |                       | Optional. HTML name attribute. Included in output _meta prop.<br /><br />Other watched attributes:<br />None<br /><br />PROPS FROM BASE: (see TiBaseComponent)<br />OTHER STANDARD PROPS: |
| `opts`          |                 | `object`                     | {}                    | Runtime configuration settings                   |
| `uib`           |                 | `boolean`                    | false                 | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`     |                 |                              | "window['uibuilder']" |                                                  |

## Methods

| Method                  | Type                                         | Description                                      |
|-------------------------|----------------------------------------------|--------------------------------------------------|
| `config`                | `(config: object\|undefined): object`        | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createShadowSelectors` | `(): void`                                   | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                          | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`              | `(): void`                                   | Ensure that the component instance has a unique ID & check again if uib loaded |
| `prependStylesheet`     | `(cssText: string, order?: number): Element` | Attaches a new stylesheet before all other stylesheets in the light DOM<br /><br />**cssText**: CSS text to inject directly<br />**order**: Optional order/priority for stylesheet placement. Lower numbers = higher priority (inserted first). Defaults to 0. |
| `uibSend`               | `(evtName: string, data: string): void`      | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |

## Slots

| Name | Description        |
|------|--------------------|
|      | Container contents |


# component-template

A uibuilder for Node-RED Theme Changer component

## Attributes

| Attribute       |
|-----------------|
| `inherit-style` |

## Properties

| Property           | Type                                             | Default      | Description                                      |
|--------------------|--------------------------------------------------|--------------|--------------------------------------------------|
| `$`                | `function(string): Element`                      |              | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`               | `function(string): NodeList`                     |              | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `data-*`           | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` |              | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object.<br /><br />slot Container contents |
| `opts`             | `object`                                         | {}           | Runtime configuration settings                   |
| `scheme`           | `undefined`                                      | "undefined"  | What is the current scheme? 'light', 'dark' or 'auto' |
| `uib`              | `boolean`                                        | false        | Is UIBUILDER for Node-RED loaded?                |
| `uibThemeSettings` | `object`                                         | {}           | Holds the uib theme settings for all pages in this domain (from/to localStorage) |
| `version`          | `string`                                         | "2024-09-21" | Component version                                |

## Methods

| Method             | Type                                  | Description                                      |
|--------------------|---------------------------------------|--------------------------------------------------|
| `config`           | `(config: object\|undefined): object` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `doInheritStyles`  | `(url: *): Promise<void>`             | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `evtClickChooser`  | `(evt: MouseEvent): void`             | Handle the light/dark theme chooser. Override contrast css variables and set appropriate class on html<br /><br />**evt**: _ |
| `evtClickContrast` | `(evt: MouseEvent): void`             | Handle contrast click. Override contrast css variables and set appropriate class on html<br /><br />**evt**: Click event |
| `evtClickReset`    | `(evt: MouseEvent): void`             | Handle reset button. Override contrast css variables and set appropriate class on html<br /><br />**evt**: _ |
| `evtClickToggle`   | `(evt: MouseEvent): void`             | TODO Handle the icon<br /><br />**evt**: _       |
| `setTheme`         | `(theme: *): string`                  | **theme**: _                                     |

## Events

| Event                             | Type                                             |
|-----------------------------------|--------------------------------------------------|
| `uib-theme-changer:attribChanged` | `CustomEvent<{ id: string; name: string \| null \| undefined; attribute: string; newVal: string; oldVal: string; }>` |
| `uib-theme-changer:connected`     | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` |
| `uib-theme-changer:disconnected`  | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |


# uib-theme-changer

A uibuilder for Node-RED Theme Changer component

## Attributes

| Attribute       |
|-----------------|
| `inherit-style` |

## Properties

| Property           | Type                                             | Default      | Description                                      |
|--------------------|--------------------------------------------------|--------------|--------------------------------------------------|
| `$`                | `function(string): Element`                      |              | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`               | `function(string): NodeList`                     |              | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `data-*`           | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` |              | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object.<br /><br />slot Container contents |
| `opts`             | `object`                                         | {}           | Runtime configuration settings                   |
| `scheme`           | `undefined`                                      | "undefined"  | What is the current scheme? 'light', 'dark' or 'auto' |
| `uib`              | `boolean`                                        | false        | Is UIBUILDER for Node-RED loaded?                |
| `uibThemeSettings` | `object`                                         | {}           | Holds the uib theme settings for all pages in this domain (from/to localStorage) |
| `version`          | `string`                                         | "2024-09-21" | Component version                                |

## Methods

| Method             | Type                                  | Description                                      |
|--------------------|---------------------------------------|--------------------------------------------------|
| `config`           | `(config: object\|undefined): object` | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `doInheritStyles`  | `(url: *): Promise<void>`             | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `evtClickChooser`  | `(evt: MouseEvent): void`             | Handle the light/dark theme chooser. Override contrast css variables and set appropriate class on html<br /><br />**evt**: _ |
| `evtClickContrast` | `(evt: MouseEvent): void`             | Handle contrast click. Override contrast css variables and set appropriate class on html<br /><br />**evt**: Click event |
| `evtClickReset`    | `(evt: MouseEvent): void`             | Handle reset button. Override contrast css variables and set appropriate class on html<br /><br />**evt**: _ |
| `evtClickToggle`   | `(evt: MouseEvent): void`             | TODO Handle the icon<br /><br />**evt**: _       |
| `setTheme`         | `(theme: *): string`                  | **theme**: _                                     |

## Events

| Event                             | Type                                             |
|-----------------------------------|--------------------------------------------------|
| `uib-theme-changer:attribChanged` | `CustomEvent<{ id: string; name: string \| null \| undefined; attribute: string; newVal: string; oldVal: string; }>` |
| `uib-theme-changer:connected`     | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` |
| `uib-theme-changer:disconnected`  | `CustomEvent<{ id: string; name: string \| null \| undefined; }>` |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |


# component-template

## Example

```html
<visible-console></visible-console>

METHODS FROM BASE:
```

## Properties

| Property        | Attribute       | Type                                             | Default                                          | Description                                      |
|-----------------|-----------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`             |                 | `function(string): Element`                      |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`            |                 | `function(string): NodeList`                     |                                                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `bgColors`      |                 | `{ info: string; warn: string; error: string; }` | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`        |                 | `{ log: string; error: string; warn: string; }`  | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `connected`     |                 | `boolean`                                        | false                                            | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `icons`         |                 | `{ log: string; info: string; debug: string; trace: string; warn: string; error: string; }` | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `inherit-style` | `inherit-style` | `string\|boolean`                                |                                                  | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `name`          | `name`          | `string`                                         |                                                  | Optional. HTML name attribute. Included in output _meta prop.<br /><br />Other watched attributes:<br />None<br /><br />PROPS FROM BASE: (see TiBaseComponent)<br />OTHER STANDARD PROPS: |
| `nativeConsole` |                 | `{ assert(condition?: boolean \| undefined, ...data: any[]): void; assert(value: any, message?: string \| undefined, ...optionalParams: any[]): void; clear(): void; clear(): void; count(label?: string \| undefined): void; count(label?: string \| undefined): void; ... 19 more ...; profileEnd(label?: string \| undefined): v...` | {}                                               |                                                  |
| `opts`          |                 | `object`                                         | {}                                               | Runtime configuration settings                   |
| `uib`           |                 | `boolean`                                        | false                                            | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`     |                 |                                                  | "window['uibuilder']"                            |                                                  |
| `wrapper`       |                 | `any \| any`                                     |                                                  |                                                  |

## Methods

| Method                  | Type                                         | Description                                      |
|-------------------------|----------------------------------------------|--------------------------------------------------|
| `checkType`             | `(input: *): string`                         | Find out the input JavaScript var type<br /><br />**input**: The JavaScript var to type |
| `config`                | `(config: object\|undefined): object`        | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createHTMLVisualizer`  | `(input: *): HTMLDivElement`                 | Creates an HTML visualisation of the input<br /><br />**input**: Input data value to visualise |
| `createShadowSelectors` | `(): void`                                   | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                          | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`              | `(): void`                                   | Ensure that the component instance has a unique ID & check again if uib loaded |
| `newLog`                | `(type: string, args: string): void`         | Creates a new HTML log entry<br /><br />**type**: The log type<br />**args**: The arguments to log |
| `prependStylesheet`     | `(cssText: string, order?: number): Element` | Attaches a new stylesheet before all other stylesheets in the light DOM<br /><br />**cssText**: CSS text to inject directly<br />**order**: Optional order/priority for stylesheet placement. Lower numbers = higher priority (inserted first). Defaults to 0. |
| `redirectConsole`       | `(): void`                                   | Capture console.xxxx and write to the div<br />NB: Cannot use bind here and so console output will have the wrong file/line number |
| `uibSend`               | `(evtName: string, data: string): void`      | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |

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

## Properties

| Property        | Attribute       | Type                                             | Default                                          | Description                                      |
|-----------------|-----------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`             |                 | `function(string): Element`                      |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `$$`            |                 | `function(string): NodeList`                     |                                                  | Mini jQuery-like shadow dom multi-selector (see constructor) |
| `bgColors`      |                 | `{ info: string; warn: string; error: string; }` | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`        |                 | `{ log: string; error: string; warn: string; }`  | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `connected`     |                 | `boolean`                                        | false                                            | True when instance finishes connecting.<br />Allows initial calls of attributeChangedCallback to be<br />ignored if needed. |
| `icons`         |                 | `{ log: string; info: string; debug: string; trace: string; warn: string; error: string; }` | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `inherit-style` | `inherit-style` | `string\|boolean`                                |                                                  | Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load. |
| `name`          | `name`          | `string`                                         |                                                  | Optional. HTML name attribute. Included in output _meta prop.<br /><br />Other watched attributes:<br />None<br /><br />PROPS FROM BASE: (see TiBaseComponent)<br />OTHER STANDARD PROPS: |
| `nativeConsole` |                 | `{ assert(condition?: boolean \| undefined, ...data: any[]): void; assert(value: any, message?: string \| undefined, ...optionalParams: any[]): void; clear(): void; clear(): void; count(label?: string \| undefined): void; count(label?: string \| undefined): void; ... 19 more ...; profileEnd(label?: string \| undefined): v...` | {}                                               |                                                  |
| `opts`          |                 | `object`                                         | {}                                               | Runtime configuration settings                   |
| `uib`           |                 | `boolean`                                        | false                                            | Is UIBUILDER for Node-RED loaded?                |
| `uibuilder`     |                 |                                                  | "window['uibuilder']"                            |                                                  |
| `wrapper`       |                 | `any \| any`                                     |                                                  |                                                  |

## Methods

| Method                  | Type                                         | Description                                      |
|-------------------------|----------------------------------------------|--------------------------------------------------|
| `checkType`             | `(input: *): string`                         | Find out the input JavaScript var type<br /><br />**input**: The JavaScript var to type |
| `config`                | `(config: object\|undefined): object`        | OPTIONAL. Update runtime configuration, return complete config<br /><br />**config**: If present, partial or full set of options. If undefined, fn returns the current full option settings |
| `createHTMLVisualizer`  | `(input: *): HTMLDivElement`                 | Creates an HTML visualisation of the input<br /><br />**input**: Input data value to visualise |
| `createShadowSelectors` | `(): void`                                   | Creates the $ and $$ fns that do css selections against the shadow dom |
| `doInheritStyles`       | `(): Promise<void>`                          | Optionally apply an external linked style sheet (called from connectedCallback)<br />param {*} url The URL for the linked style sheet |
| `ensureId`              | `(): void`                                   | Ensure that the component instance has a unique ID & check again if uib loaded |
| `newLog`                | `(type: string, args: string): void`         | Creates a new HTML log entry<br /><br />**type**: The log type<br />**args**: The arguments to log |
| `prependStylesheet`     | `(cssText: string, order?: number): Element` | Attaches a new stylesheet before all other stylesheets in the light DOM<br /><br />**cssText**: CSS text to inject directly<br />**order**: Optional order/priority for stylesheet placement. Lower numbers = higher priority (inserted first). Defaults to 0. |
| `redirectConsole`       | `(): void`                                   | Capture console.xxxx and write to the div<br />NB: Cannot use bind here and so console output will have the wrong file/line number |
| `uibSend`               | `(evtName: string, data: string): void`      | Send a message to the Node-RED server via uibuilder if available<br />NB: These web components are NEVER dependent on Node-RED or uibuilder.<br /><br />**evtName**: The event name to send<br />**data**: The data to send |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | No slot<br /><br />See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc |
