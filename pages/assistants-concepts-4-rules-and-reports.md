---
title: Rules and Report items
section: assistants
permalink: /assistants/rules-and-reports
chapter: Concepts
order: 204
excerpt: Best practices when wording Assistant rules and reports.
---

Name your rules in an easy-to-understand way and make the most of the deep integration of Assistants into the Sketch user interface by choosing the most suitable terminology.

The following are some best practices on how to name rules and provide useful context with your rules and issues that are reported for a document. This helps both designers using Sketch and other authors creating Assistants by extending your Assistant.

## Rule name

Rules that are validating things should follow the naming convention `{thing}-{what-is-checked}`. See the [_Sketch Core Assistant_ rules](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core/src/rules) for examples including:

| Name | Description |
| --- | --- |
| `groups-max-layers` | Groups should have no more than a set number of layers. |
| `groups-no-empty` | Groups should not be empty. |
| `groups-no-similar` | Similar groups should be a symbol. |

## Rule titles

The `title` property of the [`RuleDefinition`](/assistants/type-reference#ruledefinition) type, displayed in the headers of the result sheet in Sketch.

<p align="center">
  <img src="/images/developer/assistant-rule-title.png"
    alt="Assistant rule titles"
    width="446" />
</p>

- Describes the expectation enforced by the rule, e.g. _Page names should start with an emoji_.
- Keep it as short as possible.
- If possible include actual option values so that the rule's expectation is fully communicated, as in _Groups should have no more than {maxLayers} layers_. There are two ways to include configuration in rule titles:
  - Interpolate option values into the string by setting `title` as a function, see [`RuleDefinition`](/assistants/type-reference#ruledefinition) for more information.
  - Or supply a custom `ruleTitle` while configuring a rule, see [Naming Conventions Assistant](https://github.com/sketch-hq/sketch-assistants/blob/0ea038199be37d17076d9f529edbb65fe039419d/assistants/naming-conventions/src/index.ts) for an example.

## Rule descriptions

The `description` property of the [`RuleDefinition`](/assistants/type-reference#ruledefinition) type, displayed as a tool-tip over the rule title.

<p align="center">
  <img src="/images/developer/assistant-rule-description.png"
    alt="Assistant rule descriptions"
    width="446" />
</p>

- Describe why the rule exists, what problem it seeks solve.

## Report items

Report messages are the first argument passed to the [`utils.report`](/assistants/type-reference#ruleutils) function, displayed as a tool-tip over individual report items.

<p align="center">
  <img src="/images/developer/assistant-report-messages.png"
    alt="Assistant report messages"
    width="446" />
</p>

- Describes how an aspect of the document has diverged from the expectation layed out in the rule title.
- Like rule titles consider interpolating values from the document and the Assistant configuration to provide rich contextual information.
- Where possible associate one or more related Sketch document objects with the message, by also passing them to [`utils.report`](/assistants/type-reference#ruleutils).
  - Associated Sketch document objects are selected with a single click on the report item.
  - Only report more than one document object if it helps resolving issues quicker by automatic, multiple selection (note that multiple reported document objects from different pages will only select objects on the current page).

## Assistant homepages

When [publishing](/assistants/publish) your Assistant we advise you set a `homepage` value in your `package.json`.

Sketch will direct users to the homepage when they click to find out more about an Assistant or an individual rule from Sketch, so its a great place to expand on your rationale as well as detailing rule options.

When clicking-through from a rule Sketch will append the rule `name` to the homepage url a fragment, allowing users to deep-link to rule-specific documentation if present on the page.

Example click-through url with a rule named `@sketch-hq/sketch-core-assistant/groups-max-layers`, and a homepage url of `https://www.example.com/`:

```
https://www.example.com/#@sketch-hq/sketch-core-assistant/groups-max-layers
```

## Throwing JavaScript errors

The content of errors manually thrown from rule functions are also part of the content exposed to users, since error details can be copied to the paste-bin.

<p align="center">
  <img src="/images/developer/assistant-rule-errors.png"
    alt="Assistant rule errors"
    width="446" />
</p>

You might consider manually throwing a rule error when your rule encounters some condition which means it's unable to continue executing. For example when an option is missing or not in the right data format, or perhaps due to the Sketch document `version` being incompatible.

```typescript
if (typeof context.utils.getOption('pattern') !== 'string') {
  throw Error('Missing pattern option')
}
```

```typescript
if (context.file.original.contents.meta.version < 131) {
  throw Error('Unsupported document version')
}
```

> 💡 For more about Assistant errors read our [Error handling](/assistants/error-handling) guide.
