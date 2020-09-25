---
title: Assets
order: 214
section: models
---

Wrapper classes that are used to represent reusable assets retrieved from a document or globally.

## Color Asset

| Properties                                |                                 |
| ----------------------------------------- | ------------------------------- |
| name<span class="arg-type">string</span>  | The name of the asset, or null. |
| color<span class="arg-type">string</span> | The hex string for the color.   |

### Get the Global Colors

```javascript
var sketch = require('sketch/dom')
var colors = sketch.globalAssets.colors
```

#### Returns

An array of [ColorAsset](#color-asset) objects.

## Gradient Asset

| Properties |  |
| --- | --- |
| name<span class="arg-type">string</span> | The name of the asset, or null. |
| gradient<span class="arg-type">[Gradient](#gradient)</span> | The gradient object. |

### Get the Global Gradients

```javascript
var sketch = require('sketch/dom')
var gradients = sketch.globalAssets.gradients
```

#### Returns

An array of [GradientAsset](#gradient-asset) objects.


## Swatch

| Properties                                |                                 |
| ----------------------------------------- | ------------------------------- |
| name<span class="arg-type">string</span>  | The name of the swatch, or null.|
| color<span class="arg-type">string</span> | The hex string for the color.   |

### Get a referencing Color

```javascript
var sketch = require('sketch')
var mySwatch = sketch.Swatch.from({
  name: 'Safety Orange',
  color: '#ff6600'
})
var myColor = mySwatch.referencingColor
```

#### Returns

A [Color](#color-asset) that references a Color Variable, which you can use anywhere the API expects a Color object.