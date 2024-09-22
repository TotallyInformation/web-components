# state-timeline

## Attributes

| Attribute       |
|-----------------|
| `inherit-style` |

## Properties

| Property   | Type                                             | Default                                          | Description                                      |
|------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`        |                                                  |                                                  | Mini jQuery-like shadow dom selector (see constructor) |
| `bgColors` | `{ info: string; warn: string; error: string; }` | {"info":"hsl(92, 100, 50, 0.3)","warn":"hsl(39, 100, 50, 0.3)","error":"hsl(0, 100, 50, 0.3)"} |                                                  |
| `colors`   | `{ log: string; error: string; warn: string; }`  | {"log":"green","error":"red","warn":"orange"}    |                                                  |
| `icons`    | `{ log: string; info: string; debug: string; trace: string; warn: string; error: string; }` | {"log":"> ","info":"ℹ️ ","debug":"🪲 ","trace":"👓 ","warn":"⚠️ ","error":"⛔ "} |                                                  |
| `online`   | `boolean`                                        | "onLine"                                         | Are we online?                                   |
| `opts`     | `{ states: { undefined: { name: string; label: string; color: string; }; offline: { name: string; label: string; color: string; }; }; timespan: number; maxEntries: number; }` | {"states":"defaultStates","timespan":43200,"maxEntries":10000} | Runtime configuration settings                   |
| `uib`      | `boolean`                                        | false                                            | Is UIBUILDER loaded?                             |
| `version`  | `string`                                         | "2024-09-18"                                     | Component version                                |

## Methods

| Method            | Type                                             | Description                                      |
|-------------------|--------------------------------------------------|--------------------------------------------------|
| `config`          | `(config: any): { states: { undefined: { name: string; label: string; color: string; }; offline: { name: string; label: string; color: string; }; }; timespan: number; maxEntries: number; }` |                                                  |
| `doInheritStyles` | `(url: *): Promise<void>`                        | Optionally apply an external linked style sheet (called from connectedCallback)<br /><br />**url**: The URL for the linked style sheet |
| `updateState`     | `(stateName: string): void`                      | Updates the timeline with a new state<br /><br />**stateName**: Name of the state |
