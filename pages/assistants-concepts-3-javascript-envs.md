---
title: JavaScript environments
section: assistants
permalink: /assistants/javascript-environments
chapter: Concepts
order: 202
excerpt: Sketch Assistants JavaScript environments.
---

Sketch Assistants are cross-platform, meaning they work in Sketch and Node.

Each environment comes with its own capabilities, limitations and build requirements. If you based your Assistant project on our [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) then you're already building a cross-platform Assistant, but continue reading for an overview.

## Sketch JavaScriptCore

Assistants in Sketch run in [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore).

JavaScriptCore is the same JavaScript engine used in Safari, so its fast and supports many modern JavaScript language features. It does however have the following important limitations:

- Outside of Safari, JavaScriptCore lacks any browser APIs.
- Native Node modules are not available.
- There is no module system (either CommonJS or ESM).

These limitations have the following knock-on effects to consider while developing cross-platform Assistants:

- Since there's no module system Assistants need to be bundled for Sketch, in our [template](https://github.com/sketch-hq/sketch-assistant-template/blob/main/webpack.config.js) repository we currently do this with Webpack. When Sketch loads an Assistant package it looks for the bundle at the `sketch` property in package.json (analogous to how Node loads packages via the `main` property).
- Care needs to be taken not to use APIs that aren't made available by JavaScriptCore, this also means not using any npm modules that use such APIs either.

If you're curious about exploring the environment made available by JavaScriptCore and its limitations, you can open a REPL on a Mac with the following command:

```sh
/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
```

## Node

In Node the picture is much more straightforward, since in every important way Assistants are standard JavaScript projects.

Aside from the extra step of compiling TypeScript, our [template](https://github.com/sketch-hq/sketch-assistant-template) builds an ordinary Node package alongside the Sketch bundle, exposing a CommonJS entrypoint at the `main` property in package.json.

Such Assistants have the full power of Node at their disposal, but remember that if you make use of any of Node's native modules and I/O functionality then your Assistant won't work in Sketch.