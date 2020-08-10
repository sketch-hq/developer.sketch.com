---
title: Assistants command-line utility
section: assistants
permalink: /assistants/cli
chapter: Concepts
order: 202
excerpt: Run Sketch Assistants on the command-line.
---

Since Assistants also work in Node, varied Assistant workflows are possible in non-Mac environments. We created the [Sketch Assistants CLI](https://github.com/sketch-hq/sketch-assistants/tree/main/packages/cli) to help you get started running Assistants outside of Sketch.

If your Sketch documents are ingested into a production pipeline, participate in automation or are otherwise integrated into a product it may be beneficial to perform automated tests on them beforehand in a manner analogous to source code linting.

### Produce the same results as Sketch

This is the simplest usage scenario for the CLI, and it works by reading the Assistant dependencies added to a document by Sketch and installing them with npm.

```sh
sketch-assistants "./*.sketch"
```

### Run custom Assistants

Alternatively you can run a custom set of Assistants against a document or configure a new Assistant using the `--workspace` and `--assistant` flags respectively.

> 💡 For in-depth [installation and usage](https://github.com/sketch-hq/sketch-assistants/tree/main/packages/cli) instructions head to GitHub.
