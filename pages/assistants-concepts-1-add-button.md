---
title: Assistant Add-button
section: assistants
permalink: /assistants/add-button
chapter: Concepts
order: 201
excerpt: Sketch Assistants add buttons.
---

Sketch Assistants [listed on sketch.com](/assistants/publishing#listing-on-sketchcom) feature an _Add Assistant_ button that automatically adds the latest version of an Assistant to the currently open Sketch document. You're free to create _Add Assistant_ buttons on your own websites and documentation pages too.

The buttons work by opening a url using the `sketch://` protocol and in the following format,

```
sketch://add-assistant?url=<tarball-url>
```

The `<tarball-url>` query parameter is a full download url to your Assistant packaged as a `*.tgz` tarball.

> 💡 There are instructions about how to acquire a tarball url for an Assistant published on npm in our [publishing](/assistants/publishing#publishing-to-npm) guide.