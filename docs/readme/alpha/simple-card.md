# simple-card

A simple card component

## Attributes

| Attribute | Type                                             | Description                                      |
|-----------|--------------------------------------------------|--------------------------------------------------|
| `data-*`  | `string} variant - Optional. Sets the cards colour variant<br />attr {string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |

## Properties

| Property  | Type           | Default     | Description                              |
|-----------|----------------|-------------|------------------------------------------|
| `footer`  | `string\|html` |             | Populates the cards footer slot content  |
| `header`  | `string\|html` |             | Populates the cards header slot content  |
| `name`    | `undefined`    | "undefined" |                                          |
| `slot`    | `string\|html` |             | Populates the cards default slot content |
| `variant` | `string`       |             | Sync'd from name attribute               |

## Methods

| Method                     | Type                                             | Description                                      |
|----------------------------|--------------------------------------------------|--------------------------------------------------|
| `$`                        | `(selection: keyof HTMLElementTagNameMap): HTMLElement \| HTMLObjectElement \| HTMLAnchorElement \| ... 60 more ... \| null` | Mini jQuery-like shadow dom selector<br /><br />**selection**: HTML element selector |
| `DEPRECATED_uibMsgHandler` | `(evt: CustomEvent<any>): void`                  | Handle a `uibuilder:msg:_ui:update:${this.id}` custom event<br /><br />**`**: custom event evt.details contains the data |

## Events

| Event                       | Description                                      |
|-----------------------------|--------------------------------------------------|
| `simple-card:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance. |
| `simple-card:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `simple-card:construction`  | Document object event. evt.details contains the data |
| `simple-card:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | Container contents                               |
| `footer` | Content to go in the footer section of the card<br /><br />csspart ??? - Uses the uib-styles.css uibuilder master for variables where available. |
| `header` | Content to go in the header section of the card  |
