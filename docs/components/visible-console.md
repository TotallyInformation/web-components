---
title: visible-console
description: |
  A zero-dependency web component that intercepts the browser console output and mirrors it to an on-page element.
created: 2024-09-22 14:34:00
updated: 2025-05-29 15:26:33
status: beta # alpha, beta, live
---

Creates an on-page output block that shows any `console.xxxx()` output created in JavaScript. Also outputs to the browser console.

> [!WARNING]
> The displayed output in the browser console links to the component and its line number and not the original source. This is a limitation of the browser console.
> 
> *This is a debugging tool. Do not use in production.*

It is mostly useful for debugging on devices where the built-in browser cannot easily show browser developer tools - specifically the developer console. For example, mobile phones.

## Useage

Simply load the library, add a `<visible-console></visible-console>` tag to the page. Everything else is automattic.

