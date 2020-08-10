---
title: Types
section: assistants
permalink: /assistants/type-reference
chapter: Reference
order: 301
excerpt: Sketch Assistants type reference.
---

Sketch Assistants are defined by building up simple data structures that conform to the [Sketch Assistant Types](https://github.com/sketch-hq/sketch-assistants/tree/main/packages/types).

By making sure your Assistant strictly matches the types you ensure that your Assistant is compatible with Sketch. The best way to do this is to let the TypeScript compiler to do it for you!

If you created your Assistant project using our [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) then you're already setup for TypeScript, and editors like Visual Studio Code will provide rich type information and intellisense that will help you find your way.

> 🙋‍♀️ The best way to introduce yourself to Assistants is by following our [Getting started](/assistants/getting-started) guide, but continue reading if you're ready for a deeper dive into the types.

## `AssistantPackage`

The `AssistantPackage` is the top-level type, and defines the expected default export from an Assistant JavaScript package. Fundamentally an `AssistantPackage` is an `async` function that returns an `AssistantDefinition`.

```typescript
(env: AssistantEnv) => Promise<AssistantDefinition>
```

The function is `async` to give you an opportunity to perform asynchronous setup work before your Assistant rules are run, if necessary.

The `AssistantEnv` argument contains information about the outer environment, including the current language locale which could be used to internationalize your Assistant.

> 💡 Note that it is also valid for `AssistantPackage` to be an array of functions, this is to support [extending Assistants](/assistants/extending).

## `AssistantDefinition`

`AssistantDefinition` is a plain object collecting the rules and configuration together.

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | Your Assistant package name, this should precisely match the `name` property in your package.json |
| `rules` | `RuleDefinition[]` | An array of `RuleDefinition` objects |
| `config` | `AssistantConfig` | An object where you can turn rules on and off, as well as configure them with option values if required |

> 💡 Additional Assistant metadata, like a human readable `title` and `description` are defined in package.json not in source code. This is to avoid having to execute JavaScript in order to discover this sort of Assistant metadata. Check our [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) for an example package.json file or follow our [publishing](/assistants/publish) guide for more information.

## `RuleDefinition`

A `RuleDefinition` is a plain object that fully defines a rule.

| Property | Type | Description |
| --- | --- | --- |
| `rule` | `RuleFunction` | Function that implements the rule logic |
| `name` | `string` | Unique identifier for your rule, by convention prefixed with the `AssistantDefinition` `name`, e.g. `my-assistant/my-rule` |
| `title` | `string` or<br/>`object => string` | Human readable title for the rule, or alternatively a title as a function of the rule's configuration (allows for option values to be interpolated into the string) |
| `description` | `string` or<br/>`object => string` | Human readable description for the rule, or alternatively a description as a function of the rule's configuration (allows for option values to be interpolated into the string) |
| `getOptions?` | `RuleOptionsCreator` | Optionally describe your rule's configuration options with JSON Schema. By providing schema you enhance error messages for incorrectly configured options, and ready your Assistant for possible future work around Assistant creation GUIs. See the [Core Assistant](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core) rules for examples |
| `debug?` | `boolean` | Flag a rule for development use only |
| `runtime?` | `AssistantRuntime` | Indicate whether your rule isn't cross platform, and only works in Sketch or Node |

## `RuleFunction`

A `RuleFunction` is an `async` function that performs the rule's logic using a `RuleContext` argument.

```typescript
(context: RuleContext) => Promise<void>
```

> 💡 You should be able to implement your rule by using the objects and helpers coming in on the `context` argument, but it's worth remembering that you can use npm modules in your rule functions too - as long as they don't use Node or browser APIs that aren't available in Sketch's JavaScriptCore environment.

## `RuleContext`

The `RuleContext` object is passed as an argument to every `RuleFunction`. It contains a representation of the Sketch document currently being processed as well as helper functions.

| Property | Type | Description |
| --- | --- | --- |
| `utils` | `RuleUtils` | Rule helpers |
| `file` | `ProcessedSketchFile` | Representation of the current Sketch document |
| `assistant` | `AssistantDefinition` | Parent Assistant |
| `env` | `AssistantEnv` | Same object passed into the top-level `AssistantPackage` function |

## `RuleUtils`

The `RuleUtils` object contains helper functions that are scoped to the current rule.

| Property | Type | Description |
| --- | --- | --- |
| `report` | `(string, ...SketchFileObject[]) => void` | Report a problem to Sketch from the current rule. Optionally include one or more references to document objects where the issue resides |
| `objects` | `IterableObjectCache` | An object containing iterators for each type of object found in a Sketch document. Enables efficient traversal of specific object types in rule functions - for example, looping all Artboards. Objects imported from libraries are excluded |
| `foreignObjects` | `IterableObjectCache` | Identical to `objects`, except it only iterates objects imported into the Sketch document from libraries |
| `isObjectIgnored` | `SketchFileObject => boolean` | Determine whether an object has been ignored in the Sketch UI. Generally this is handled for you, but if you're seeing rule errors saying you're trying to report an ignored object then you may need to use this function to make a manual check before calling `report` |
| `shouldExitEarly` | `() => boolean` | If you're seeing performance problems, especially while doing expensive work then call this function to determine whether your rule should break out of any loops and exit early |
| `getOption` | `string => unknown` | Return the value of one of your rule's options by name. If a value for the option is missing in the Assistant configuration then a rule error is thrown |
| `getImageMetadata` | `string => Promise<ImageMetadata>` | Function that returns metadata about images in the current Sketch document |
| `getObjectParent` | `SketchFileObject => unknown` | Returns an object's parent in the document tree |
| `getObjectParents` | `SketchFileObject => unknown[]` | Returns all of an object's parents up to the root object in the document tree |
| `getObjectPointer` | `SketchFileObject => string` | Returns the RFC 6901 JSON Pointer string for a document object |
| `evalPointer` | `string => unknown` | Evaluates an RFC 6901 JSON Pointer in the context of the current Sketch document |
