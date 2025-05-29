---
title: smart-table
description: |
  A Zero dependency web component that displays an HTML table from input data
created: 2024-10-06 22:32:05
updated: 2025-05-29 15:32:16
status: alpha # alpha, beta, live
---

Automatically creates an HTML table layout from input data. The purpose of this component is to make it very easy to produce good quality HTML tables simply based on standard input data, this is normally a complex HTML authoring task.

Data has to be set using JavaScript since HTML attributes do not allow complex data. Optionally can also provide column meta-data to improve the table display.

Rows, columns and cells are all labelled to allow for fine-grained styling and calculations.

The table is created in the light (main page) DOM for easy styling and further manipulation if desired.

## Useage

```html
<smart-table id="st1"></smart-table>
```
```js
const arrObj = [
  {"COL1":"R1C1","COL2":"R1C2","COL3":"R1C3"},
  {"COL1":"R2C1","COL2":"R2C2","COL3":"R2C"},
  {"COL1":"R3C1","COL2":"R3C2","COL3":"R3C3"}
]
const st1 = document.getElementById('st1')
/** We need to wait for everything to be loaded before using components from JavaScript */
addEventListener("DOMContentLoaded", (event) => {
    st1.data = arrObj
})
```

## Attributes & Properties

### Attributes

None

### Properties

* `data` - the data that will be used to create the table.
  
  Can be an array of objects (as shown above), the most common tabular data type. But can also be an object of objects (named rows) or even an array of arrays (unnamed rows and columns).

* `cols` - an object that specifies meta-data describing the table columns
  
  Each key must match a column id in the data array/object. Each entry can contain the following properties: 
  
  * `id` - the unique column id matching a column key in the data
  * `name` - a column display name
  * `type` - the column type (`string`, `number`, ...)
  * `title` - Optional title string that will be added as a title attribute to the column headings
  
  If not explicitly provided, the cols meta-data will be calculated from the first entry in the data array/object. You can recover the cols data by grabbing a reference to the element and accessing the cols property. This can be used to create customised cols metadata.

  If setting manually, set the `cols` property before the `data` property.

As for all of the components in this library, if you do not explicitly set an `id` attribute, one will be auto-created in the format `id="smart-table-1"`. Where the number is unique on-page. Please note that changing the order of `smart-table` elements on the HTML page will change the numbering. It is always best to add your own unique id's.

## Slots

This component uses the light (main-page) DOM, not a shadow dom so slots are not used.

## Styling

### CSS Variables

## Events

The standard events for this library of components are available:

```js
/**
 * @fires smart-table:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires smart-table:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires smart-table:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires smart-table:attribChanged - When a watched attribute changes. `evt.details.data` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.
 */
```

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

These methods can be used from JavaScript by first getting a reference to the appropriate element instance. As shown in the examples.

### `getCellById` - Get an HTML element reference to a cell using `RxCx` referencing

This returns an HTML element reference so the content of the cell will be a text or HTML string.

You can easily use this to change styling on a specific cell.

```js
const tbl1 = document.getElementById('smart-table-1') // @type {HTMLTableElement}
const cellEl = tbl1.getCellById('R2C3') // @type {HTMLTableCellElement}
if (cellEl) {
  console.log('Reference to cell in row 2, column 3: ', cellEl)
  console.log('The text content of cell R2C3 is: ', cellEl.innerText)
  // At present, this kind of processing is not responsive to data changes
  if ( tbl1.getValueByCellId('R2C3') === 'R2C3' ) {
    cellEl.style.backgroundColor = 'darkgreen' // background-color: 'darkgreen'
  }
} else {
  console.warn('Cell R2C3 not found')
}
```

### `getValueByCellId` - Get the data value of a cell using `RxCx` referencing

This references the actual dataset given to the smart-table instance and so will return the correct data type

```js
const tblEl = document.getElementById('st1') // @type {HTMLTableElement}
const cellValue = tblEl.getValueByCellId('R3C4') // @type {*}
console.log(cellValue, ' <= Value of cell 4th inner property of the 3rd outer property')
```

### Utility

- `getValueByOffset(obj, rowOffset, colOffset)` - Get the data value of a cell in an tabular array/object using row/column numbers
  
  This works both when `obj` is an array or an object.

### Standard methods

`SmartTable.version` will return a string containing both the component version and the base class version.

## Extensions for UIBUILDER for Node-RED

None at this time.
