---
title: syntax-highlight
description: |
   A Zero dependency web component that shows HTML highlighted JSON or JavaScript objects.
created: 2022-04-07 00:30:55
updated: 2025-05-29 15:32:38
status: beta # alpha, beta, live
---

## Attributes

| Attribute | Description |
|-----------|-------------|
| `auto`    | Automatically highlight JSON or JavaScript objects. Default is `true`. |

## Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `auto`   | `auto`    | `boolean` | `true` | Automatically highlight JSON or JavaScript objects. |
| `json`   | N/A    | `string` \| `object`  | ""  | The JSON or JavaScript object to highlight. |

## Methods

| Method | Type                                 |
|--------|--------------------------------------|
| `highlight` (Static)  | `(any): HTMLElement` <br>Returns highlighted JSON wrapped in a `<pre>` tag |
