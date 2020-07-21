---
title: Running and testing
section: assistants
permalink: /assistants/running-and-testing
chapter: Guides
order: 104
excerpt: Running and testing Sketch Assistants locally.
---

This guide covers the various ways you can run and test your Assistants in NodeJS during development and after publishing.

As covered in our [Getting started](/assistants/getting-started) guide Assistants can be packaged locally and added to Sketch documents. This comes with some limitations though, especially during active development. Familiarities like `console.log` and breakpoint debugging are not available, and the development feedback loop is slower because you need to fully re-compile and re-pack your Assistant after every change.

Developing and running your Assistant with NodeJS can help alleviate these issues. The Assistant architecture is TypeScript all the way down, so there are no hidden complexities or gotchas when working purely in NodeJS.

## Test-driven Assistant development

Using a TDD approach can be very useful while actively developing Assistants and for gaining confidence that they work as expected.

> 💡Every rule in our [Core Assistant](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core) is covered by multiple test cases, so have a look around the source code if you're interested in finding out more.

If you've followed the [Getting started](/assistants/getting-started) guide, then your project will already be setup to run Assistant tests using [Jest](https://jestjs.io). We added a simple test in [`src/__tests__/index.test.ts`](https://github.com/sketch-hq/sketch-assistant-template/blob/main/src/__tests__/index.test.ts)

An explanation of Jest and its CLI is out-of-scope of this guide, but you can begin running the tests in `watch` mode for a rapid feedback loop while developing:

```sh
npm run test --watch
```

The approach to writing a test will generally be,

1. Use the Sketch application itself to create a document that you expect to generate specific results when run against your rule.
1. Save the Sketch document next to your tests.
1. Write a test to assert that your rule produces the expected results.

There are a number of test helper methods available in [`@sketch-hq/sketch-assistant-utils`](https://github.com/sketch-hq/sketch-assistants/tree/main/packages/utils) -

- `testAssistant` For running an entire Assistant
- `testRuleInAssistant` For running one Assistant rule in isolation
- `testRule` Run a rule without the need for a parent Assistant

> 💡 Assistant projects are just ordinary NodeJS projects, so you don't have to use Jest or the tool-chain we've developed in the starter project - the entire NodeJS ecosystem and your favorite tools and approaches are all available to you.

## CLI

The [Assistants CLI](/assistants/cli) can be used to gather Assistant results from Sketch documents entirely on the command line.

## Using Sketch Assistant Utils

Alternatively, you can invoke Assistants from any NodeJS application using the [`@sketch-hq/sketch-assistant-utils`](https://github.com/sketch-hq/sketch-assistants/tree/main/packages/utils) package. The Assistant runners in the CLI and Sketch application itself use the same functions, so you're guaranteed a consistent result.

The below is an incomplete example showing how to run a single Assistant against a Sketch document from disk. The package exports full TypeScript types, so further exploration of the API is left as an exercise for the reader.

```typescript
import { runAssistant } from '@sketch-hq/sketch-assistant-utils'

runAssistant({
  processedFile,
  assistant,
  env,
  cancelToken,
  getImageMetadata,
  ignoreConfig,
  ruleTimeout
})
  .then(res => {
    // Handle success
  })
  .catch(err => {
    // Handle error
  })
```