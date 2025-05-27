---
title: html-include
description: |
  A zero-dependency web component that pulls in HTML pages, HTML fragments, returned HTML Form data, JSON or text from a URL and displays it in the page.
created: 2024-09-22 14:34:00
updated: 2024-09-22 15:32:13
---

> [!NOTE]
> STATUS: Live. Ready for extended use. [Demo](https://wc.totallyinformation.net/tests/html-include).

## Current Limitations

* `<script>` tags in the included HTML are not currently executed. This will be a future option.

## Useage

```html
<article>
    <h2>include-1 - Full HTML page</h2>
    <html-include id="hi1" src="./resources/include-1.html"></html-include>
</article>
<article>
    <h2>include-2 - HTML Fragment</h2>
    <html-include id="hi2" src="./resources/include-2.html"></html-include>
</article>
<article>
    <h2>include-3 - JSON</h2>
    <html-include id="hi3" src="./resources/include-3.json"></html-include>
</article>
```

## Properties

| Property | Attribute | Type             | Default | Description                                      |
|----------|-----------|------------------|---------|--------------------------------------------------|
| `json`   |           | `object`         | {}      | If JSON imported, the parsed JSON object         |
| `src`    | `src`     | `string \| null` |         | The URL to fetch an HTML document from.<br />Setting this property causes a fetch the HTML from the URL.<br />We are reflecting the src attrib and the src prop. |
| `text`   |           | `string`         | ""      | The text string imported                         |
| `type`   |           | "text" \| "html" \| "json" \| "form" | "text"  | Compared to the servers `content-type` header |

## Events

In addition to the standard events, the following events are emitted:

| Event Name | Detail | Description |
|------------|--------|-------------|
| `html-include:content-loaded` | url, contentType, text, json | Emitted when the src has been loaded and inserted into the DOM. |
