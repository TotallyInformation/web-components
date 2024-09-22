# visible-console

## Properties

| Property          | Type                                             | Default                                          | Description                                      |
|-------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`               |                                                  |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `bgColors`        | `{ info: string; warn: string; error: string; }` | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`          | `{ log: string; error: string; warn: string; }`  | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `css`             |                                                  |                                                  |                                                  |
| `icons`           | `{ log: string; info: string; debug: string; trace: string; warn: string; error: string; }` | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `originalConsole` | `object`                                         | {}                                               |                                                  |
| `uib`             | `boolean`                                        | false                                            | Is UIBUILDER loaded?                             |
| `wrapper`         | `any \| any`                                     |                                                  |                                                  |

## Methods

| Method                 | Type                           | Description                                      |
|------------------------|--------------------------------|--------------------------------------------------|
| `checkType`            | `(input: any): string`         | Convert JSON to Syntax Highlighted HTML<br /><br />**json**: A JSON/JavaScript Object |
| `createHTMLVisualizer` | `(input: any): HTMLDivElement` |                                                  |
| `newLog`               | `(type: any, args: any): void` |                                                  |
| `redirectConsole`      | `(): void`                     |                                                  |

## Events

| Event                                   |
|-----------------------------------------|
| `visible-console:construction-complete` |
