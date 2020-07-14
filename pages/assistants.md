---
title: Assistants
section: assistants
permalink: /assistants/
order: 2
excerpt: Bring consistency to your designs and reduce friction between team members with Assistants. Learn core concepts and how to create and publish Assistants.
---

Bring consistency to your designs and reduce friction between team members with Assistants. 

Assistants work both inside Sketch and on the command-line on any platform, unlike plugins which are general purpose extensions for the Sketch Mac app. Create your own, either by modifying existing Assistants or writing your own rule implementations in TypeScript.

## Core concepts

Assistants…

1. are specified per document.
1. can be added to a document with a single click.
1. contain one or more rules.
1. are standard JavaScript packages.
1. can be created by extending existing ones.
1. operate on raw JSON document data.

One of the fundamentals of Assistants is that they are defined per document. You can use certain Assistants with one document and others with another, for instance to work on multiple projects for different brands and respect their individual guidelines.

> Documents specify Assistants as [dependencies](https://github.com/sketch-hq/sketch-file-format/blob/master/schema/objects/assistants-workspace.schema.yaml) in `*.sketch/workspace/assistants.json` similar to [JavaScript packages](https://docs.npmjs.com/files/package.json#dependencies). Sketch asks the user for permission to download missing Assistants when a document is checked and the specified version of an Assistant cannot be found locally.

## Create and publish Assistants

Assistants are built to be shared and to reuse existing rules written by others so that you only have to implement your own rules when necessary. Take a look at the [rules provided by Sketch](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core#available-rules) that you can use in your own Assistants.

Create your own Assistant from the [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) or follow [the guides](/assistants/getting-started) for more detail.

