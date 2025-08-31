---
title: syntax-highlight
description: |
   A Zero dependency web component that shows HTML highlighted JSON or JavaScript objects.
created: 2022-04-07 00:30:55
updated: 2025-08-31 15:27:00
status: beta # alpha, beta, live
---

## Useage

```html
<syntax-highlight id="sh1"></syntax-highlight>
```

```js
// Modern browsers auto-create an object for any element with an id!
// So we can just use the id to access the element
sh1.json = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
```

## Attributes

| Attribute | Description |
|-----------|-------------|
| `auto`    | Automatically highlight JSON or JavaScript objects. Default is `true`. |

## Properties

| Property | Attribute | Type      | Default  | Description |
|----------|-----------|-----------|----------|-------------|
| `auto`   | `auto`    | `boolean` | `true`   | Automatically highlight JSON or JavaScript objects. |
| `json`   | N/A       | `string` \| `object` | ""  | The JSON or JavaScript object to highlight. |

## Methods

| Method                | Type                                 |
|-----------------------|--------------------------------------|
| `highlight` (Static)  | `(any): HTMLElement` <br>Returns highlighted JSON wrapped in a `<pre>` tag |
