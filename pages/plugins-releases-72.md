---
title: New in Sketch 72
section: plugins
chapter: JavaScript API Updates
permalink: /plugins/updates/new-in-sketch-72

order: 489
excerpt: Summary of the changes introduced with Sketch 72
---

Released 5 May, 2021 – [_read release notes_](https://www.sketch.com/updates/#version-72)

## Changes

The internal class `MSApplicationMetadata` has been refactored into a new class, `BCSketchInfo`.

If a plugin was relying on any of the internal methods in `MSApplicationMetadata`, its code will not work (and may even crash Sketch if it’s passing the returned value unchecked to other parts of its code). The methods that previously lived in `MSApplicationMetadata` have been replaced with methods in `BCSketchInfo.shared()`, and most of the metadata you may need is available directly as a dictionary in `BCSketchInfo.shared().metadata()`.

However, as mentioned in our [Internal API page](/plugins/internal-api), _these are internal classes that should never be used_.

We recommend using the [JavaScript API](/plugins/javascript-api) where possible. Something is missing? Please [submit feedback and feature requests](https://github.com/sketch-hq/developer.sketch.com/issues).

## Related resources

- [Internal API](/plugins/internal-api)
- [JavaScript API](/plugins/javascript-api)
- [New in Sketch 71](/plugins/updates/new-in-sketch-71)
