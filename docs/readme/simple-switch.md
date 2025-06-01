# simple-switch

## Properties

| Property | Attribute | Type                                             | Default     | Description                                      |
|----------|-----------|--------------------------------------------------|-------------|--------------------------------------------------|
| `$`      |           |                                                  |             | Mini jQuery-like shadow dom selector (see constructor) |
| `data-*` |           | `string} name - Optional. Will be used to synthesize an ID if no ID is provided.<br />attr {string` |             | Optional. All data-* attributes are returned in the _meta prop as a _meta.data object. |
| `name`   | `name`    | `undefined`                                      | "undefined" | Holds the name for this instance of the component |

## Slots

| Name | Description        |
|------|--------------------|
|      | Container contents |

## CSS Shadow Parts

| Part  | Description                                      |
|-------|--------------------------------------------------|
| `???` | Uses the uib-styles.css uibuilder master for variables where available. |
