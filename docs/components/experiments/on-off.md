---
title: on-off
description: >
  A simple on/off switch.
created: 2025-06-07 22:09:24
lastUpdated: 2025-06-07 22:09:30
status: pre-alpha # alpha, beta, live
---


```css
<style id="dashboard-style-override">
    /*icon size for buttons*/
    .nr-dashboard-button .md-button i {
        font-size: 60px;
		text-shadow:
		-1px -1px 1px #444444,
		1px -1px 1px #444444,
		-1px 1px 1px #444444,
		1px 1px 1px #444444,
		0px 0px 10px #888888;
    }
    /* round button */
    .nr-dashboard-button .md-button {
        border-radius:50%;
        border-style:solid;
        border-width: 3px;
        border-color: #888888;
        left: 25px;
    }
</style>
```

https://commons.wikimedia.org/wiki/File:Font_Awesome_5_solid_power-off.svg
https://discourse.nodered.org/t/pretty-dashboard-buttons-with-reset-and-timeout/45403
