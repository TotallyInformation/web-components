# uib-theme-changer

A Theme Changer component

## Attributes

| Attribute | Type                                             | Description                                      |
|-----------|--------------------------------------------------|--------------------------------------------------|
| `data-*`  | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |

## Properties

| Property           | Attribute | Type        | Default     | Description                                      |
|--------------------|-----------|-------------|-------------|--------------------------------------------------|
| `$`                |           |             |             | Mini jQuery-like shadow dom selector (see constructor) |
| `name`             | `name`    | `string`    | "undefined" | Sync'd from name attribute<br /><br />slot Container contents |
| `scheme`           |           | `undefined` | "undefined" | What is the current scheme? 'light', 'dark' or 'auto' |
| `uibThemeSettings` |           | `object`    | {}          | Holds the uib theme settings for all pages in this domain (from/to localStorage) |

## Methods

| Method             | Type                      | Description                                      |
|--------------------|---------------------------|--------------------------------------------------|
| `evtClickChooser`  | `(evt: MouseEvent): void` | Handle the light/dark theme chooser. Override contrast css variables and set appropriate class on html<br /><br />**evt**: undefined |
| `evtClickContrast` | `(evt: MouseEvent): void` | Handle contrast click. Override contrast css variables and set appropriate class on html<br /><br />**evt**: Click event |
| `evtClickReset`    | `(evt: MouseEvent): void` | Handle reset button. Override contrast css variables and set appropriate class on html<br /><br />**evt**: undefined |
| `evtClickToggle`   | `(evt: MouseEvent): void` | TODO Handle the icon<br /><br />**evt**: undefined |
| `setTheme`         | `(theme: any): any`       |                                                  |

## Events

| Event                             | Description                                      |
|-----------------------------------|--------------------------------------------------|
| `uib-theme-changer:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance. |
| `uib-theme-changer:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `uib-theme-changer:construction`  | Document object event. evt.details contains the data |
| `uib-theme-changer:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |
