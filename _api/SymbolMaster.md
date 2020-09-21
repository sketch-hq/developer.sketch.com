---
title: Symbol Source
order: 309
section: layers
---

```javascript
var SymbolMaster = require('sketch/dom').SymbolMaster
```

A [Symbol](https://sketch.com/docs/symbols/) Source. It is an instance of [Artboard](#artboard) (hence of [Layer](#layer) and [Group](#group)) so all the methods defined there are available.

| Properties |  |
| --- | --- |
| id<span class="arg-type">string</span> | The unique ID of the Symbol Source object (not to be confused with `symbolId`). |
| name<span class="arg-type">string</span> | The name of the Symbol Source |
| parent<span class="arg-type">[Group](#group)</span> | The group the Symbol Source is in. |
| frame<span class="arg-type">[Rectangle](#rectangle)</span> | The frame of the Symbol Source. This is given in coordinates that are local to the parent of the layer. |
| selected<span class="arg-type">boolean</span> | If the Symbol Source is selected. |
| exportFormats<span class="arg-type">[ExportFormat](#export-format)[]</span> | The export formats of the Symbol Source. |
| layers<span class="arg-type">[Layer](#layer)[]</span> | The layers composing the Symbol Source. |
| background<span class="arg-type">object</span> | The background of the Symbol Source |
| background.enabled<span class="arg-type">boolean</span> | If the background should be enabled, eg. shown or not |
| background.includedInExport<span class="arg-type">boolean</span> | If the background should be exported or if it should be transparent during the export |
| background.includedInInstance<span class="arg-type">boolean</span> | If the background should appear in the instances of the Symbol Source |
| background.color<span class="arg-type">string</span> | The rgba representation of the color of the background |
| symbolId<span class="arg-type">string</span> | The unique ID of the Symbol that the Source and its instances share. |
| overrides<span class="arg-type">[Override](#symbol-override)[]</span> | The array of the overrides that the instances of the Symbol Source will be able to change. |

## Create a new Symbol Source

```javascript
var symbol = new SymbolMaster({
  name: 'my symbol',
})
```

## Create a new Symbol Source from an Artboard

```javascript
var symbol = SymbolMaster.fromArtboard(artboard)
```

Replace the artboard with a Symbol Source.

| Parameters |  |
| --- | --- |
| artboard<span class="arg-type">[Artboard](#artboard) - required</span> | The artboard to create the Symbol Source from. |

### Returns

A new SymbolMaster

## Change to an Artboard

```javascript
var artboard = symbol.toArtboard()
```

Replace the Symbol Source with an artboard and detach all its instances converting them into groups.

### Returns

A new [Artboard](#artboard)

## Create a new Instance

```javascript
var instance = symbol.createNewInstance()
```

Creates a new [SymbolInstance](#symbol-instance) linked to this Source, ready for inserting in the document.

### Returns

A new [SymbolInstance](#symbol-instance)

## Get all the Instances

```javascript
var instances = symbol.getAllInstances()
```

Returns an array of all instances of the Symbol in the document, on all pages.

## Get Library defining the Symbol Source

```javascript
var originLibrary = symbol.getLibrary()
```

If the Symbol Source was imported from a library, the method can be used to:

- know about it
- get the library back

### Returns

The [Library](#library) the Symbol was defined in, or `null` if it is a local symbol.

## Sync the local reference with the library version

```javascript
const success = symbol.syncWithLibrary()
```

If a [Library](#library) has some updates, you can synchronize the local Symbol Source with the Library's version and bypass the panel where the user chooses the updates to bring.

### Returns

`true` if it succeeded.

## Unlink the local reference from the library

```javascript
const success = symbol.unlinkFromLibrary()
```

You can unlink a Symbol Source from the Library it comes from and make it a local Symbol Source instead. It will be added to the `Symbols` Page.

### Returns

`true` if it succeeded.
