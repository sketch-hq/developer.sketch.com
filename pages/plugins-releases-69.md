---
title: New in Sketch 69
section: plugins
chapter: JavaScript API Updates
permalink: /plugins/updates/new-in-sketch-69

order: 491
excerpt: Summary of the public API changes introduced with Sketch 69
---

Released 29 September, 2020 – [_read release notes_](https://www.sketch.com/updates/#version-69)

## Changes

### Color Variables API

Sketch 69 introduces a new [Color Variables feature](https://www.sketch.com/blog/2020/08/31/components-management-color-variables-and-linked-data-what-s-in-the-69-beta/).

Color Variables replace the previously existing `colors` object in `Document` with a new one: `swatches`. It is an array of Color Variables (internally referred to as _Swatches_) which you can modify directly.

This example generates 100 random swatches and adds them to the current document:

```js
const sketch = require('sketch')
const Swatch = sketch.Swatch
const doc = sketch.getSelectedDocument()

for (var i = 0; i < 100; i++) {
  const randomColor = generateHex()
  const swatch = Swatch.from({
    name: `Rainbow ${i+1}`,
    color: randomColor
  })
  doc.swatches.push(swatch)
}

function generateHex() {
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  var hexColor = "#" + randomColor;
  return hexColor;
}
```

To use a Color Variable on a Layer or Style (or anywhere the API expects a Color), you use the `referencingColor` attribute on the Swatch:

```js
const mySwatch = Swatch.from({
  name: 'Safety Orange',
  color: '#ff6600'
})
textLayer.style.textColor = mySwatch.referencingColor
```

In addition to local Color Variables, Sketch also supports Color Variables from shared Libraries. They work in a similar way to Symbols, so the API will look familiar if you've previously used the Symbols API.

This example will import all the Color Variables from a shared Library:

```js
const sketch = require('sketch')
const Library = sketch.Library

const doc = sketch.getSelectedDocument()

const lib = Library.getLibraryForDocumentAtPath(
  'shared-color-variables.sketch'
)
const importableSwatches = lib.getImportableSwatchReferencesForDocument(doc)
const importedSwatch = importableSwatches[0].import()

textLayer.style.textColor = importedSwatch.referencingColor
```

For more details about the API, check the documentation for [`Swatch`](/reference/api/#swatch), [`Document`](/reference/api/#document), and [`Library`](/reference/api/#library).

## Related resources

- [API reference](/reference/api)
- [Color Variables Migrator plugin](https://github.com/sketch-hq/color-variables-migrator)
- [New in Sketch 67](/plugins/updates/new-in-sketch-67)

