---
title: Extend Assistants
section: assistants
permalink: /assistants/extend-assistants
chapter: Guides
order: 103
excerpt: Extend existing Sketch Assistants and repurpose rules others have written.
---

Assistants are designed to be repurposed. They can be created by entirely relying on rules others have written – including those provided by Sketch – specifying just a configuration defining which rules are active and how they should be applied.

There are typically three reasons for extending an Assistant:

1. Use one or more rules others have written in your own Assistant.
2. Tweak the configuration for a particular rule of an existing Assistant.
3. Disable one or more rules of an existing Assistant.

> 💡 Only write custom rules when you absolutely have to. And if you do, consider making your own rules [configurable](/assistants/write-a-rule#making-a-configurable-rule) so others can re-purpose them in their Assistants.

## Overview

Assistants are made of two main parts:

1. A list of rules, each containing the JavaScript logic that implements your rule idea.
2. Configuration that specifies which rules are active (and values for rule options, if required).

Extending from Assistants allows you to build on both their rules list and their configuration, while optionally making adjustments.

Normally when defining a single Assistant it's exported as the default export and takes the form of an async function that returns the Assistant definition.

```typescript
const assistant: AssistantPackage = async (env) => {
  return {
    name: 'my-assistant',
    rules: [],
    config: { rules: {} },
  }
}

export default assistant
```

Alternatively if you decide to build your Assistant on top of others then you export an array of two or more Assistants instead, positioning your Assistant as the last Assistant in the array.

```typescript
import UsefulAssistant from 'useful-assistant'

const assistant: AssistantPackage = [
  UsefulAssistant,
  async (env) => {
    return {
      name: 'my-assistant',
      rules: [],
      config: {
        rules: {
          'useful-assistant/beep': { active: false },
          'useful-assistant/boop': { active: true },
        },
      },
    }
  },
]

export default assistant
```

In the example above we're able to freely configure any rules supplied by `UsefulAssistant`. Specifically, here we've de-activated its `beep` rule, and activated its `boop` rule.

> 💡 Configuration added to `my-assistant` will _overwrite_ any existing configuration in `UsefulAssistant` on a rule-by-rule basis. Or put another way - configuration defined by Assistants placed later in the exported array _overwrites_ configuration of Assistants placed earlier.

## Extending the Core Assistant

We've developed our [Core Assistant](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core) specifically to be extended. It exports a large, widely useful rule set but doesn't include any of its own configuration. In this way it forms a blank slate, ready for extending.

Our official set of Assistant makes heavy use of this pattern. They each extend the Core Assistant activating just a subset of the core rules to create new Assistants each with a focussed purpose. Explore their definitions for more examples.

- [Reuse Suggestions](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/reuse-suggestions)
- [Naming Conventions](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/naming-conventions)
- [Tidy](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/tidy)

> 💡 It is also possible to extend multiple Assistants to mix and match rules from different sources into a single, new Assistant. Add the possibility to include your own custom rules, you are able to pick and choose what is just right for your Assistant.

## Example

Following is a guide on how to create an Assistant that extends from our [Core Assistant](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core), activating just its [`groups-max-layers`](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core/src/rules/groups-max-layers) rule to ensure that no more than three layers are allowed within a group in a Sketch document.

Start by following our guide to [Create your first Assistant](/assistants/getting-started#create-your-first-assistant) using our starter project.

Since we're extending the Core Assistant, we first need to add it as a dependency to your project with npm.

```sh
npm install -S @sketch-hq/sketch-core-assistant
```

Replace the contents of your project's `src/index.ts` with the following,

```typescript
import CoreAssistant from '@sketch-hq/sketch-core-assistant'
import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'

const assistant: AssistantPackage = [
  CoreAssistant,
  async () => {
    return {
      name: 'sketch-assistant-template',
      rules: [],
      config: {
        rules: {
          '@sketch-hq/sketch-core-assistant/groups-max-layers': {
            active: true,
            maxLayers: 3,
            skipClasses: [],
          },
        },
      },
    }
  },
]

export default assistant
```

A few things to note:

- We've imported the Core Assistant at the top of the file.
- We've exported our Assistant as an array, with our Assistant definition as the last element and the Core Assistant in the spot before.
- We've activated `groups-max-layers` and supplied all the options it needs, as specified in its [documentation](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core/src/rules/groups-max-layers).

If you haven't already now is a good time to run `npm run package-tarball` in your project folder, and try adding your new Assistant to a Sketch document. Create a group with four layers, and you should see some results 🎉
