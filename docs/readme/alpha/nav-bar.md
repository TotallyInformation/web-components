# nav-bar

## Attributes

| Attribute | Type                                             | Description                                      |
|-----------|--------------------------------------------------|--------------------------------------------------|
| `data-*`  | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |

## Properties

| Property | Attribute | Type     | Default     | Description                                      |
|----------|-----------|----------|-------------|--------------------------------------------------|
| `$`      |           |          |             | Mini jQuery-like shadow dom selector (see constructor) |
| `name`   | `name`    | `string` | "undefined" | Sync'd from name attribute                       |

## Events

| Event                   | Description                                      |
|-------------------------|--------------------------------------------------|
| `nav-bar:attribChanged` | When a watched attribute changes. `evt.details` contains the details of the change.<br />NOTE that listeners can be attached either to the `document` or to the specific element instance. |
| `nav-bar:connected`     | When an instance of the component is attached to the DOM. `evt.details` contains the details of the element. |
| `nav-bar:construction`  | Document object event. evt.details contains the data |
| `nav-bar:disconnected`  | When an instance of the component is removed from the DOM. `evt.details` contains the details of the element. |

## Slots

| Name | Description        |
|------|--------------------|
|      | Container contents |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |