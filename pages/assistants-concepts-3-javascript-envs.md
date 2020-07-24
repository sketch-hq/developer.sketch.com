---
title: JavaScript environments
section: assistants
permalink: /assistants/javascript-environments
chapter: Concepts
order: 203
excerpt: Sketch Assistants JavaScript environments.
---

Sketch Assistants are cross-platform, working in both Sketch and Node.js environments. Assistants based on the [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) work cross-platform already.

Following is a detailed overview on each environment's capabilities, limitations and build requirements.

## Sketch JavaScriptCore

Assistants in Sketch run in [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore), the same JavaScript engine powering Safari – fast and supporting many modern JavaScript language features.

It does however have the following important limitations:

- No browser APIs
- Native Node.js modules are not available
- Module systems such as CommonJS and ESM are unsupported

These limitations have the following knock-on effects to consider while developing cross-platform Assistants:

- Since there's no module system Assistants need to be bundled for Sketch, in our [template](https://github.com/sketch-hq/sketch-assistant-template/blob/main/webpack.config.js) repository we currently do this with Webpack. When Sketch loads an Assistant package it looks for the bundle at the `sketch` property in package.json (analogous to how Node loads packages via the `main` property).
- Care needs to be taken not to use APIs that aren't made available by JavaScriptCore, this also means not using any npm modules that use such APIs either.

If you're curious about exploring the environment made available by JavaScriptCore and its limitations, you can open a REPL on a Mac with the following command:

```sh
/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc
```

## Node.js

Assistants are standard JavaScript packages. Aside from the extra step of compiling TypeScript, our [template](https://github.com/sketch-hq/sketch-assistant-template) builds an ordinary Node.js package alongside the Sketch bundle, exposing a CommonJS entrypoint at the `main` property in package.json.

Such Assistants have the full power of Node.js at their disposal, but remember that if you make use of any of native Node.js modules and I/O functionality then your Assistant will be incompatible with JavaScriptCore and won't work in Sketch.
