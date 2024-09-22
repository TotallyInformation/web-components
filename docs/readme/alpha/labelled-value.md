# labelled-value

## Attributes

| Attribute | Type                                             | Description                                      |
|-----------|--------------------------------------------------|--------------------------------------------------|
| `data-*`  | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |

## Properties

| Property | Attribute | Type        | Default     | Description                                      |
|----------|-----------|-------------|-------------|--------------------------------------------------|
| `$`      |           |             |             | Mini jQuery-like shadow dom selector (see constructor) |
| `label`  | `label`   | `undefined` | "undefined" |                                                  |
| `name`   | `name`    | `string`    | "undefined" | Sync'd from name attribute                       |
| `value`  | `value`   | `undefined` | "undefined" |                                                  |

## Events

| Event                          | Description                                      |
|--------------------------------|--------------------------------------------------|
| `labelled-value:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance. |
| `labelled-value:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `labelled-value:construction`  | Document object event. evt.details contains the data |
| `labelled-value:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name | Description        |
|------|--------------------|
|      | Container contents |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |
