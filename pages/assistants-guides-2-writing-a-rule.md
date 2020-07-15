---
title: Writing a rule
section: assistants
permalink: /assistants/writing-a-rule
chapter: Guides
order: 101
excerpt: Writing a Sketch Assistant rule.
---

This guide shows how to create an Assistant rule that checks the contents of Text Layers to make sure they don’t include "Lorem Ipsum" placeholder text. It finishes describing how to evolve the rule to disallow any string using Assistant configuration.

> 💡Make sure you've already followed the [Getting Started](/assistants/getting-started) guide. You'll need a working local Assistant project that you can edit, rebuild and see the resulting changes in Sketch if you want to follow along with this guide.

## Adding a custom rule

If you've only made minimal changes to the starter project then you should find the example _Hello World_ rule defined in the [`src/index.ts`](https://github.com/sketch-hq/sketch-assistant-template/blob/main/src/index.ts) file, alongside the Assistant definition itself.

Begin to rework the _Hello World_ rule into a rule that disallows lorem ipsum in text content. Feel free to replace the contents of `src/index.ts` wholesale with the below:

```typescript
import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const textNoLoremIpsum: RuleDefinition = {
  rule: async (context) => {
    // Rule logic will go here
  },
  name: 'sketch-assistant-template/text-no-lorem-ipsum',
  title: 'Text should not contain lorem ipsum',
  description: 'Reports a violation when text layers contain lorem ipsum placeholder',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-assistant-template',
    rules: [textNoLoremIpsum],
    config: {
      rules: {
        'sketch-assistant-template/text-no-lorem-ipsum': {
          active: true
        },
      },
    },
  }
}

export default assistant
```

A few points to note:

- A rule's `name` is its unique identifier in the Assistants ecosystem, so by convention we prefix rule names with their parent Assistant's name separated by a `/`.
- Rules are added to an Assistant package by including them in its `rules` array.
- Rules are not active by default, they have to be explicitly turned on in the Assistant's configuration object.

## Implement rule logic

Rule logic is implemented in the function set as the `rule` property in the rule definition object. So far we've just defined an empty anonymous async function:

```typescript
async (context) => {
  // Rule logic will go here
}
```

For the vast majority of cases you'll be able to implement your rule just using the [API](/assistants/api) passed in via the `context` argument. You aren't limited to this API though, feel free to use helper functions, npm modules or anything else you need to get the job done.

Let's add the logic for disallowing _lorem ipsum_ in text layers. We'll do this in a standard _iterate, test, report_ pattern that's applicable to many rules:

1. Iterate the Sketch document's objects
1. Test whether the objects meet some condition
1. If so, report it

```typescript
async (context) => {
  const { utils } = context
  // Iterate
  for (const layer of utils.objects.text) {
    const value = layer.attributedString.string
    // Test
    if (value.toLowerCase().includes('lorem ipsum')) {
      // Report
      utils.report(
        `Layer “${layer.name}” contains “lorem ipsum”`,
        layer
      )
    }
  }
}
```

> 💡If you haven't already now might be a good time to run `npm run package-tarball` and test your work in Sketch.

A few points to note:

- We've used the `utils.objects.text` utility to iterate across all Text Layer objects in the document.
- We've used the `utils.report` utility to report a problem to Sketch. At minimum a report must include a message, and then optionally one or more Sketch document objects related to the problem.
- If you're using Visual Studio Code you should be noticing rich intellisense and TypeScript compiler hints for both the rule utilities and Sketch document objects

## Making a configurable rule

At the moment the rule is hard coded to look for the `lorem ipsum` string. By generalizing it to accept an _option_ we make it configurable, and the Assistant more widely useful to Sketch users once [published](/assistants/publishing).

Here's the new, generalized rule function,

```typescript
async (context) => {
  const { utils } = context
  
  // Get a configuration option named "pattern"
  const pattern = utils.getOption('pattern')
  if (typeof pattern !== 'string') throw Error()
  
  // Iterate
  for (const layer of utils.objects.text) {
    const value = layer.attributedString.string
    // Test
    if (value.includes(pattern)) {
      // Report
      utils.report(
        `Layer “${layer.name}” contains “${pattern}”`,
        layer
      )
    }
  }
}
```

A few things to note here:

- We're using the `utils.getOption` utility to extract a named option for the current rule from the Assistant's current configuration.
- Rules are for logic not opinions, so they should avoid hard-coding default configuration values. For this reason we throw an error if the configuration option does not have the correct data type. Throwing an error like this also handily [narrows](https://2ality.com/2020/06/type-guards-assertion-functions-typescript.html#narrowing-via-if) the type to satisfy the TypeScript compiler

We're not quite done yet, because while our rule is now configurable we haven't actually configured it yet. We do this by adding a value for our `pattern` option to the Assistant configuration.

Below we're defining the new generalized rule and naming it `text-disallow`, as well as setting `pattern` to `Type something`. This will have the interesting effect of reporting a problem for any text layer added to the canvas left with default copy, which could often indicate sloppy work.

```typescript
import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const textDisallow: RuleDefinition = {
  rule: async (context) => {
    // Copy and paste from above
  },
  name: 'sketch-assistant-template/text-disallow',
  title: (config) => `Text should not contain "${config.pattern}"`,
  description: 'Reports a violation when text layers contain a configurable text pattern',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'sketch-assistant-template',
    rules: [textDisallow],
    config: {
      rules: {
        'sketch-assistant-template/text-disallow': {
          active: true,
          pattern: 'Type something'
        },
      },
    },
  }
}

export default assistant
```

> 💡If you felt limited by having to test your Assistant in Sketch during this guide, without access to familiarities like `console.log` then have a read of our [Running and testing Assistants](/assistants/running-and-testing) guide. This will discuss how to test your Assistant in Node, or run it from the command line.

> 👉Next steps could include [Extending an Assistant](/assistants/extending-assistants), or deep diving into the [API reference](/assistants/api).