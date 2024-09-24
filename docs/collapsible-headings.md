---
title: collapsible-headings
description: |
  A Zero dependency web component that Makes slot content collapsible by heading level.
created: 2024-09-24 19:39:42
updated: 2024-09-24 21:43:21
---

> [!NOTE]
> STATUS: Beta - ready for basic use

Fill the slot content of this custom component with report-style text. e.g. headings followed by paragraph or other block text, images, etc.

The text will automatically become collapsible. Click on one of the headings to collapse (hide) all of the content up to the next same or higher level heading.

If further headings and text are dynamically added after the page has loaded (e.g. from Node-RED), that will also be made collapsible.

## Example use

```html
<collapsible-headings>
  <h2>My first outer heading (h2)</h2>
  <p>A paragraph of text under 1st heading.</p>
  <p>Another paragraph of text.</p>
  <h3>The 1st sub-heading (h3)</h3>
  ...
  <h2>My last outer heading (h2)</h2>
  <p>A paragraph of text under last heading.</p>  
</collapsible-headings>
```

Clicking on the 1st heading will collapse everything below it up to the last outer heading. Clicking on the sub-heading will only hide everything under that heading.

Note that only `<h2>` to `<h5>` are made collapsible by default. Override by setting the `levels` attribute.

```html
<collapsible-headings levels="h3, h4">
...
</collapsible-headings>
```

> [!TIP]
> `h1` is not made collapsible because there should only be a single `h1` tag on a page and it should be used for showing the page heading.

## Use with UIBUILDER for Node-RED

This component has no special extra features for UIBUILDER.

~~However, it would be an ideal component to use as the target for no-code output using `uib-element` set to deliver either HTML or Markdown. Markdown will work as long as the Markdown-IT library is pre-loaded so that the uibuilder client library automatically renders it to HTML.~~ Sorry, this part does not yet work because the outputs of HTML/Markdown from `uib-element` are wrapped in an extra `div` which throws off the processing. Should be fixed in a future release (as at v2024-09-24).

For now, you can use this with an existing on-page `<collapsible-headings>` tag by sending HTML text to `uib-update`. Set the CSS Selector to an existing `<collapsible-headings>` element in your HTML. Set the content source to msg.payload. This way you can send HTML direct from a Node-RED template node.

Alternatively, you can use similar settings with a `uib-tag` node to add a new collapsible-heading to a page complete with HTML content.

For Markdown, you can also manually send low-code Markdown by adding something like this to `msg._ui` and sending to your uibuilder node. The Markdown-IT library must be loaded of course.

```json
[{
    "method":"replace",
    "components":[{
        "type":"collapsible-headings",
        "id":"md",
        "parent":"#more",
        "slotMarkdown":"## H2 - Markdown input\n\nSome text in a para\n\n* List #1\n* List #2\n"
    }]
}]
```
