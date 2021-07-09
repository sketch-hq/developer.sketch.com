---
title: Types
section: assistants
permalink: /assistants/reference/types
chapter: Reference
excerpt: Types
order: 505
definitions: Enumerations||AssistantRuntime;#assistantruntime|ReservedRuleOptionNames;#reservedruleoptionnames|ViolationSeverity;#violationseverity|||Type aliases||Assistant;#assistant|AssistantConfig;#assistantconfig|AssistantDefinition;#assistantdefinition|AssistantEnv;#assistantenv|AssistantErrorResult;#assistanterrorresult|AssistantPackage;#assistantpackage|AssistantPackageJson;#assistantpackagejson|AssistantPackageMap;#assistantpackagemap|AssistantSuccessResult;#assistantsuccessresult|BoolOptionCreator;#booloptioncreator|CancelToken;#canceltoken|DocumentObject;#documentobject|ESModuleInterop;#esmoduleinterop|GeneratorIterable;#generatoriterable|GetImageMetadata;#getimagemetadata|IgnoreConfig;#ignoreconfig|ImageMetadata;#imagemetadata|IntegerOptionCreator;#integeroptioncreator|IterableObjectCache;#iterableobjectcache|JSONSchemaProps;#jsonschemaprops|JsonPointer;#jsonpointer|Maybe;#maybe|MaybeESModule;#maybeesmodule|NumberOptionCreator;#numberoptioncreator|ObjectArrayOptionCreator;#objectarrayoptioncreator|ObjectCache;#objectcache|ObjectIdSet;#objectidset|PointerMap;#pointermap|ProcessedSketchFile;#processedsketchfile|RuleConfig;#ruleconfig|RuleConfigGroup;#ruleconfiggroup|RuleContext;#rulecontext|RuleDefinition;#ruledefinition|RuleError;#ruleerror|RuleFunction;#rulefunction|RuleOption;#ruleoption|RuleOptionHelpers;#ruleoptionhelpers|RuleOptionSchemaCreator;#ruleoptionschemacreator|RuleOptionsCreator;#ruleoptionscreator|RuleUtils;#ruleutils|RuleUtilsCreator;#ruleutilscreator|RunInput;#runinput|RunOutput;#runoutput|RunOutputProfile;#runoutputprofile|RunRejection;#runrejection|SketchFile;#sketchfile|SketchFileObject;#sketchfileobject|StringArrayOptionCreator;#stringarrayoptioncreator|StringEnumOptionCreator;#stringenumoptioncreator|StringOptionCreator;#stringoptioncreator|TimeoutToken;#timeouttoken|Unarray;#unarray|ValueOrArray;#valueorarray|Violation;#violation|Workspace;#workspace
---

<section class="assistants reference reflection content" markdown="1">
  
  

  

## Enumerations

<h3 id="AssistantRuntime">
  <a id="assistantruntime" name="assistantruntime"></a>AssistantRuntime
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L613)</span>
</h3>

Assistants can run within Node, or the JavaScriptCore runtime provided by Sketch. This type
enumerates the two possibilities.

#### Enumeration members

<p class="enum-member" markdown="1">Node</p>

<p class="enum-member" markdown="1">Sketch</p>

<h3 id="ReservedRuleOptionNames">
  <a id="reservedruleoptionnames" name="reservedruleoptionnames"></a>ReservedRuleOptionNames
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L730)</span>
</h3>

User-defined rule options with these names are forbidden.

#### Enumeration members

<p class="enum-member" markdown="1">active</p>

<p class="enum-member" markdown="1">ruleTitle</p>

<p class="enum-member" markdown="1">severity</p>

<h3 id="ViolationSeverity">
  <a id="violationseverity" name="violationseverity"></a>ViolationSeverity
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L529)</span>
</h3>

Define the possible violation severity levels.

#### Enumeration members

<p class="enum-member" markdown="1">error</p>

<p class="enum-member" markdown="1">info</p>

<p class="enum-member" markdown="1">warn</p>

## Type aliases

<h3 id="Assistant">
  <a id="assistant" name="assistant"></a>Assistant
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L641)</span>
</h3>

Canonical definition of an assistant, that is, an async function that given an AssistantEnv
will resolve with a concrete AssistantDefinition. Assistants therefore are able to defer final
creation until invoked by a runner, and which point critical contextual information such as the
locale are available.

#### Type declaration

```typescript
(env: [*AssistantEnv*](#assistantenv)): *Promise*<[*AssistantDefinition*](#assistantdefinition)\>
```

#### Parameters

| Name | Type |
| --- | --- |
| `env` | [*AssistantEnv*](#assistantenv) |

**Returns:** `*Promise*<[*AssistantDefinition*](#assistantdefinition)\>`{:.language-ts}

<h3 id="AssistantConfig">
  <a id="assistantconfig" name="assistantconfig"></a>AssistantConfig
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L715)</span>
</h3>

Contains the assistant configuration.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `defaultSeverity?` | [*Maybe*](#maybe)<[*ViolationSeverity*](#violationseverity)\> | Default severity to be used for violations raised by rules that haven’t been configured with their own explicit severity level. |
| `rules` | [*RuleConfigGroup*](#ruleconfiggroup) | Configuration to be applied to the rules available to the assistant. |

<h3 id="AssistantDefinition">
  <a id="assistantdefinition" name="assistantdefinition"></a>AssistantDefinition
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L654)</span>
</h3>

Concrete assistant definition that can be invoked against a Sketch file during a lint run.
Fundamentally assistants collate a list of rules with configuration for those rules, alongside
metadata about the assistant.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `config` | [*AssistantConfig*](#assistantconfig) | Assistant configuration activates and configures one or more rules present in its rule list. |
| `name` | *string* | Assistant name is the same as its package name, i.e. the `name` property in its `package.json`. |
| `rules` | `[*RuleDefinition*](#ruledefinition)[]` | List of rules owned by the assistant. |

<h3 id="AssistantEnv">
  <a id="assistantenv" name="assistantenv"></a>AssistantEnv
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L621)</span>
</h3>

Ambient environmental information for assistants, typically provided by an outer assistant runner.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `locale` | ``string`` | ``undefined`` | Language tag indicating the current user’s locale. Use this to optionally internationalize your assistant’s content. Its exact value is not guaranteed, so an appropriate fallback locale should always be used for unrecognized values. For assistants running in Sketch it’s value is likely to be either `en` or `zh-Hans`. |
| `runtime` | [*AssistantRuntime*](#assistantruntime) | Indicates whether the assistant is running in Node or Sketch. |

<h3 id="AssistantErrorResult">
  <a id="assistanterrorresult" name="assistanterrorresult"></a>AssistantErrorResult
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L346)</span>
</h3>

The result of running a single Assistant that errored and did not complete.

#### Type declaration

| Name | Type |
| --- | --- |
| `message` | *string* |

<h3 id="AssistantPackage">
  <a id="assistantpackage" name="assistantpackage"></a>AssistantPackage
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L647)</span>
</h3>

Defines the expected type for the default export from an assistant package entrypoint. It allows
an assistant to be expressed as either a single assistant or an array of assistants that should be extended and merged before a run operation.

<h3 id="AssistantPackageJson">
  <a id="assistantpackagejson" name="assistantpackagejson"></a>AssistantPackageJson
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L564)</span>
</h3>

Type representing the package.json for an Assistant project/package. Extends the standard
package.json spec with a `sketch-assistant` object containing human readable `title` and `description`
strings, an icon path and an `i18n` object of translations for the `title` and `description`. All
properties are defined as optional since package.json files are user supplied, so their contents
cannot be strictly enforced.

Example

  {
    "name": "my-assistant",
    "sketch-assistant": {
      "title": "My Assistant",
      "description": "An example Assistant",
      "icon": "https://www.domain.com/some/hosted/image.png",
      "i18n": {
        "zh-Hans": {
          "title": "...",
          "description": "..."
        }
      }
    },
    ...
  }

<h3 id="AssistantPackageMap">
  <a id="assistantpackagemap" name="assistantpackagemap"></a>AssistantPackageMap
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L217)</span>
</h3>

A map of Assistant packages, keyed by Assistant package name. Since the
package map is often supplied externally, by an outer layer (e.g. by Sketch
to the Assistant runner) we type the packages as unknown.

#### Type declaration

<h3 id="AssistantSuccessResult">
  <a id="assistantsuccessresult" name="assistantsuccessresult"></a>AssistantSuccessResult
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L355)</span>
</h3>

The result of successfully running a single assistant to completion. Note that
even if the Assistant encounters some rules that crash and produce `ruleErrors` then that
doesn't invalidate the whole result.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `grade` | ```"fail"``` | ```"pass"``` | ```"unknown"``` | Assistant grades the document as follows:   "pass"          No violations with severity level "error" present   "fail"          One or more violations with severitu level "error" present   "unknown"       Grade could not be determined, for example due to one or more rules timing-out |
| `metadata` | object | Metadata relating to the Assistant that produced the result. |
| `metadata.assistant` | object |   |
| `metadata.assistant.config` | [*AssistantConfig*](#assistantconfig) |   |
| `metadata.assistant.name` | *string* |   |
| `metadata.rules` | object |   |
| `profile` | object | Object containing information about how long each rule took to execute. |
| `profile.ruleTimings` | object |   |
| `ruleErrors` | `[*RuleError*](#ruleerror)[]` | One or more `ruleErrors` implies that some rules encountered errors. |
| `violations` | `[*Violation*](#violation)[]` | One or more `violations` implies the assistant’s rules found issues with the Sketch document. |

<h3 id="BoolOptionCreator">
  <a id="booloptioncreator" name="booloptioncreator"></a>BoolOptionCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L835)</span>
</h3>

Creates rule option schema properties for a boolean option.

#### Type declaration

```typescript
(ops: { `defaultValue?`: *boolean* ; `description`: *string* ; `name`: *string* ; `title`: *string*  }): [*JSONSchemaProps*](#jsonschemaprops)
```

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | object |
| `ops.defaultValue?` | *boolean* |
| `ops.description` | *string* |
| `ops.name` | *string* |
| `ops.title` | *string* |

**Returns:** `[*JSONSchemaProps*](#jsonschemaprops)`{:.language-ts}

<h3 id="CancelToken">
  <a id="canceltoken" name="canceltoken"></a>CancelToken
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L205)</span>
</h3>

Contains a flag indicating whether the run operation has been cancelled by
the outer environment. All long running processes happening during a run
(like cache creation, rule invocation etc.) should exit early as soon as a
cancellation is detected.

<h3 id="DocumentObject">
  <a id="documentobject" name="documentobject"></a>DocumentObject
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L86)</span>
</h3>

The root document object with `_class` `document` in a parsed Sketch file.

<h3 id="ESModuleInterop">
  <a id="esmoduleinterop" name="esmoduleinterop"></a>ESModuleInterop
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L43)</span>
</h3>

The shape of an ES Module with a default export built with TypeScript or Babel with ES Module
interoperability.

#### Type parameters

| Name |
| --- |
| `T` |

#### Type declaration

| Name | Type |
| --- | --- |
| `__esModule` | *boolean* |
| `default` | T |

<h3 id="GeneratorIterable">
  <a id="generatoriterable" name="generatoriterable"></a>GeneratorIterable
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L61)</span>
</h3>

Iterable object that uses a generator function.

#### Type parameters

| Name |
| --- |
| `T` |

#### Type declaration

| Name | Type |
| --- | --- |
| `[Symbol.iterator]` | () => Generator<T\> |

<h3 id="GetImageMetadata">
  <a id="getimagemetadata" name="getimagemetadata"></a>GetImageMetadata
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L23)</span>
</h3>

Utility function for gathering metadata about Sketch file images. Is isomorphic in the sense that
its signature shouldn’t change across platforms.

#### Type declaration

```typescript
(ref: *string*, filepath: *string*): *Promise*<[*ImageMetadata*](#imagemetadata)\>
```

#### Parameters

| Name | Type |
| --- | --- |
| `ref` | *string* |
| `filepath` | *string* |

**Returns:** `*Promise*<[*ImageMetadata*](#imagemetadata)\>`{:.language-ts}

<h3 id="IgnoreConfig">
  <a id="ignoreconfig" name="ignoreconfig"></a>IgnoreConfig
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L184)</span>
</h3>

Information about what to ignore during an Assistant run. Pages can be
ignored entirely, whereas Assistant rules can either be ignored entirely too,
or only ignored for certain file objects.

#### Type declaration

| Name | Type |
| --- | --- |
| `assistants` | object |
| `pages` | `*string*[]` |

<h3 id="ImageMetadata">
  <a id="imagemetadata" name="imagemetadata"></a>ImageMetadata
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L28)</span>
</h3>

When rules request metadata for a Sketch file image it is returned in this format.

#### Type declaration

| Name | Type |
| --- | --- |
| `height` | *number* |
| `ref` | *string* |
| `width` | *number* |

<h3 id="IntegerOptionCreator">
  <a id="integeroptioncreator" name="integeroptioncreator"></a>IntegerOptionCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L810)</span>
</h3>

Creates rule option schema properties for an integer option.

#### Type declaration

```typescript
(ops: { `defaultValue?`: *number* ; `description`: *string* ; `maximum?`: *number* ; `minimum?`: *number* ; `name`: *string* ; `title`: *string*  }): [*JSONSchemaProps*](#jsonschemaprops)
```

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | object |
| `ops.defaultValue?` | *number* |
| `ops.description` | *string* |
| `ops.maximum?` | *number* |
| `ops.minimum?` | *number* |
| `ops.name` | *string* |
| `ops.title` | *string* |

**Returns:** `[*JSONSchemaProps*](#jsonschemaprops)`{:.language-ts}

<h3 id="IterableObjectCache">
  <a id="iterableobjectcache" name="iterableobjectcache"></a>IterableObjectCache
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L121)</span>
</h3>

Same as ObjectCache, except the cache values are an iterable that yields
the file objects, rather than a simple array.

<h3 id="JSONSchemaProps">
  <a id="jsonschemaprops" name="jsonschemaprops"></a>JSONSchemaProps
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L791)</span>
</h3>

JSONSchema `properties` value.

#### Type declaration

<h3 id="JsonPointer">
  <a id="jsonpointer" name="jsonpointer"></a>JsonPointer
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L72)</span>
</h3>

A simple primitive type alias to represent a JSON Pointer string.

<h3 id="Maybe">
  <a id="maybe" name="maybe"></a>Maybe
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L17)</span>
</h3>

Optional value.

#### Type parameters

| Name |
| --- |
| `T` |

<h3 id="MaybeESModule">
  <a id="maybeesmodule" name="maybeesmodule"></a>MaybeESModule
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L51)</span>
</h3>

Module export that is either a CommonJS export or an ES Module interop export.

#### Type parameters

| Name |
| --- |
| `T` |

<h3 id="NumberOptionCreator">
  <a id="numberoptioncreator" name="numberoptioncreator"></a>NumberOptionCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L798)</span>
</h3>

Creates rule option schema properties for a number option.

#### Type declaration

```typescript
(ops: { `defaultValue?`: *number* ; `description`: *string* ; `maximum?`: *number* ; `minimum?`: *number* ; `name`: *string* ; `title`: *string*  }): [*JSONSchemaProps*](#jsonschemaprops)
```

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | object |
| `ops.defaultValue?` | *number* |
| `ops.description` | *string* |
| `ops.maximum?` | *number* |
| `ops.minimum?` | *number* |
| `ops.name` | *string* |
| `ops.title` | *string* |

**Returns:** `[*JSONSchemaProps*](#jsonschemaprops)`{:.language-ts}

<h3 id="ObjectArrayOptionCreator">
  <a id="objectarrayoptioncreator" name="objectarrayoptioncreator"></a>ObjectArrayOptionCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L870)</span>
</h3>

Creates rule option schema properties for an object array option.

#### Type declaration

```typescript
(ops: { `description`: *string* ; `maxLength?`: *number* ; `minLength?`: *number* ; `name`: *string* ; `props`: [*JSONSchemaProps*](#jsonschemaprops)[] ; `title`: *string*  }): [*JSONSchemaProps*](#jsonschemaprops)
```

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | object |
| `ops.description` | *string* |
| `ops.maxLength?` | *number* |
| `ops.minLength?` | *number* |
| `ops.name` | *string* |
| `ops.props` | `[*JSONSchemaProps*](#jsonschemaprops)[]` |
| `ops.title` | *string* |

**Returns:** `[*JSONSchemaProps*](#jsonschemaprops)`{:.language-ts}

<h3 id="ObjectCache">
  <a id="objectcache" name="objectcache"></a>ObjectCache
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L109)</span>
</h3>

A cache of Sketch file objects. Each key is a `_class` value from the file
format, and the corresponding value is an array of file objects with matching
`_class` values.

<h3 id="ObjectIdSet">
  <a id="objectidset" name="objectidset"></a>ObjectIdSet
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L102)</span>
</h3>

A record of all object ids found in the file.

<h3 id="PointerMap">
  <a id="pointermap" name="pointermap"></a>PointerMap
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L97)</span>
</h3>

Look-up a pointer value using a Sketch file object reference.

<h3 id="ProcessedSketchFile">
  <a id="processedsketchfile" name="processedsketchfile"></a>ProcessedSketchFile
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L129)</span>
</h3>

A processed Sketch file collates a SketchFile object along with various data structures suited
for efficiently inspecting its contents.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `foreignObjects` | [*ObjectCache*](#objectcache) | A cache of all foreign objects in the file, i.e. objects or children of objects from libraries. |
| `objectIds` | [*ObjectIdSet*](#objectidset) | A set of all object ids found in the file. |
| `objects` | [*ObjectCache*](#objectcache) | A cache of all local objects in the file, i.e. objects native to the file, not from a library. |
| `original` | [*SketchFile*](#sketchfile) | The original SketchFile object that was processed. |
| `pointers` | [*PointerMap*](#pointermap) | A map of file object references to JSON Pointer strings. |
| `profile` | object | Statistics about the processed file. |
| `profile.numObjects` | *number* | Number of Sketch objetcs in the file. |
| `profile.time` | *number* | Time taken for processing in milliseconds. |

<h3 id="RuleConfig">
  <a id="ruleconfig" name="ruleconfig"></a>RuleConfig
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L739)</span>
</h3>

Contains the configuration for an individual rule.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `active` | *boolean* | Whether the rule is active or not. Alternatively omitting the rule from the assistant config is the same as setting this flag to `false`. |
| `ruleTitle?` | *string* | Optional custom rule title to replace the title defined by the RuleDefinition. Can be used to supply descriptive rule titles that can only be defined alongside configuration - for example to title a rule "Page names should start with emojis" alongside regex patterns that enforces the same. |
| `severity?` | [*ViolationSeverity*](#violationseverity) | Optional custom severity for violations reported by the rule. If omitted the default severity is used instead. |

<h3 id="RuleConfigGroup">
  <a id="ruleconfiggroup" name="ruleconfiggroup"></a>RuleConfigGroup
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L708)</span>
</h3>

A map of rule configs, keyed by the rule’s name.

#### Type declaration

<h3 id="RuleContext">
  <a id="rulecontext" name="rulecontext"></a>RuleContext
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L404)</span>
</h3>

Contains all the values and utils exposed to individual rule functions.

#### Type declaration

| Name | Type |
| --- | --- |
| `assistant` | [*AssistantDefinition*](#assistantdefinition) |
| `env` | [*AssistantEnv*](#assistantenv) |
| `file` | [*ProcessedSketchFile*](#processedsketchfile) |
| `getImageMetadata` | [*GetImageMetadata*](#getimagemetadata) |
| `utils` | [*RuleUtils*](#ruleutils) |

<h3 id="RuleDefinition">
  <a id="ruledefinition" name="ruledefinition"></a>RuleDefinition
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L673)</span>
</h3>

Canonical rule definition combining the rule function, its option schema creator with other
basic metadata.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `debug?` | *boolean* | Flags a rule as for internal/development purposes only |
| `description` | ``string`` | `(`ruleConfig`: [*RuleConfig*](#ruleconfig)) => *string*` | Longer human readable description for the rule. |
| `getOptions?` | [*RuleOptionsCreator*](#ruleoptionscreator) | Rules that require options (i.e. are not just simply "on" or "off") need to describe the schema for those options by implementing this function |
| `name` | *string* | The rule name acts as its unique id and should combine an identifier for the rule with the parent assistant’s name separated by a slash, e.g. "assistant-name/rule-name" |
| `rule` | [*RuleFunction*](#rulefunction) |   |
| `runtime?` | [*AssistantRuntime*](#assistantruntime) | Indicates rule compatibility. For cross-platform rules this property can be omitted. |
| `title` | ``string`` | `(`ruleConfig`: [*RuleConfig*](#ruleconfig)) => *string*` | Human readable title for the rule. Can either be a string e.g. "Groups should not be empty", or a function that returns a string, which enables the title to interpolate configuration values e.g. "Maximum height is 44px". |

<h3 id="RuleError">
  <a id="ruleerror" name="ruleerror"></a>RuleError
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L335)</span>
</h3>

JavaScript errors encountered during rule invocation normalised into plain objects.

#### Type declaration

| Name | Type |
| --- | --- |
| `assistantName` | *string* |
| `code` | ```"error"``` | ```"timeout"``` |
| `message` | *string* |
| `ruleName` | *string* |
| `stack` | *string* |

<h3 id="RuleFunction">
  <a id="rulefunction" name="rulefunction"></a>RuleFunction
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L777)</span>
</h3>

Async function that is expected to perform the core rule logic using the values and helper
functions provided by the passed in RuleInvocationContext object.

#### Type declaration

```typescript
(context: [*RuleContext*](#rulecontext)): *Promise*<void\>
```

#### Parameters

| Name | Type |
| --- | --- |
| `context` | [*RuleContext*](#rulecontext) |

**Returns:** `*Promise*<void\>`{:.language-ts}

<h3 id="RuleOption">
  <a id="ruleoption" name="ruleoption"></a>RuleOption
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L766)</span>
</h3>

The valid set of types available for individual rule options.

<h3 id="RuleOptionHelpers">
  <a id="ruleoptionhelpers" name="ruleoptionhelpers"></a>RuleOptionHelpers
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L887)</span>
</h3>

An object of helper functions for creating the different types of option schemas.

#### Type declaration

| Name | Type |
| --- | --- |
| `booleanOption` | [*BoolOptionCreator*](#booloptioncreator) |
| `integerOption` | [*IntegerOptionCreator*](#integeroptioncreator) |
| `numberOption` | [*NumberOptionCreator*](#numberoptioncreator) |
| `objectArrayOption` | [*ObjectArrayOptionCreator*](#objectarrayoptioncreator) |
| `stringArrayOption` | [*StringArrayOptionCreator*](#stringarrayoptioncreator) |
| `stringEnumOption` | [*StringEnumOptionCreator*](#stringenumoptioncreator) |
| `stringOption` | [*StringOptionCreator*](#stringoptioncreator) |

<h3 id="RuleOptionSchemaCreator">
  <a id="ruleoptionschemacreator" name="ruleoptionschemacreator"></a>RuleOptionSchemaCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L900)</span>
</h3>

Combines a set of JSON Schema `properties` objects into a single valid JSON Schema.

#### Type declaration

```typescript
(ops: [*JSONSchemaProps*](#jsonschemaprops)[]): JSONSchema7
```

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | `[*JSONSchemaProps*](#jsonschemaprops)[]` |

**Returns:** `JSONSchema7`{:.language-ts}

<h3 id="RuleOptionsCreator">
  <a id="ruleoptionscreator" name="ruleoptionscreator"></a>RuleOptionsCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L882)</span>
</h3>

A function that should be implemented on rule definitions if they need to define custom options.

#### Type declaration

```typescript
(helpers: [*RuleOptionHelpers*](#ruleoptionhelpers)): [*JSONSchemaProps*](#jsonschemaprops)[]
```

#### Parameters

| Name | Type |
| --- | --- |
| `helpers` | [*RuleOptionHelpers*](#ruleoptionhelpers) |

**Returns:** `[*JSONSchemaProps*](#jsonschemaprops)[]`{:.language-ts}

<h3 id="RuleUtils">
  <a id="ruleutils" name="ruleutils"></a>RuleUtils
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L422)</span>
</h3>

Object containing utilities passed into rule functions. Where needed the util functions are
scoped to the current rule, e.g. `report` reports a violation for the current rule and
`getOption` retrieves an option value for the current rule etc.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `evalPointer` | (`pointer`: [*JsonPointer*](#jsonpointer)) => *unknown* | Resolve a JSON Pointer string to the value in the Sketch file it points to. |
| `foreignObjects` | [*IterableObjectCache*](#iterableobjectcache) | Contains an iterator for each type of object in the Sketch file, filtered so it contains _only_ foreign objects, that is, objects that have been imported from a library. |
| `getImageMetadata` | (`ref`: *string*) => Promise<[*ImageMetadata*](#imagemetadata)\> | Returns metadata for a given Sketch file image. |
| `getObjectParent` | (`object`: [*SketchFileObject*](#sketchfileobject)) => *unknown* | Returns the immediate parent object of a Sketch file object. |
| `getObjectParents` | (`object`: [*SketchFileObject*](#sketchfileobject)) => `*unknown*[]` | Returns an array of parent objects for a given Sketch file object, all the way to the root. |
| `getObjectPointer` | (`object`: [*SketchFileObject*](#sketchfileobject)) => `[*JsonPointer*](#jsonpointer)` | ``undefined`` | Determine the JSON Pointer for a given object in a Sketch file. |
| `getOption` | <T\>(`option`: *string*) => T | Get a rule option value by name. Should throw if the rule hasn’t been configured properly in the current assistant context, since it’s essential that every rule activated in an assistant is fully configured. |
| `isObjectIgnored` | (`object`: [*SketchFileObject*](#sketchfileobject)) => *boolean* | Determine if a given Sketch file object has been ignored in the run's IgnoreConfig. Ignored objects are automatically filtered out while iterating objects, however if you use a different mechanism to traverse the Sketch file you should manually determine whether an object is ignored before reporting it in a violation. |
| `objectHash` | (`o`: {}, `excludeKeys?`: `*string*[]`) => *string* | Return the md5 hash of an object. Keys are deeply sorted for a stable hash. Useful for comparing deep similarity of Sketch document objects. By default the keys `do_objectID` and `$pointer` are excluded since they will always be different. |
| `objects` | [*IterableObjectCache*](#iterableobjectcache) | Contains an iterator for each type of object in the Sketch file. |
| `objectsEqual` | (`o1`: {}, `o2`: {}, `excludeKeys?`: `*string*[]`) => *boolean* | Compare two document objects for deep equality. |
| `report` | (`message`: *string*, ...`objects`: `[*SketchFileObject*](#sketchfileobject)[]`) => *void* | Report one or more violations. |
| `shouldExitEarly` | () => *boolean* | Rules can be a good Assistant citizen by checking the return value of this function during any long running calculations - if it returns `true` then the rule should bail out of any further calculations and exit as soon as possible. This function will return `true` for two reasons - the run has been cancelled entirely, or the current rule has timed-out. Note: If the rule is mainly driven by the `utils.objects` and `utils.foreignObjects` iterators then there's no need to call this function, since these loops will be terminated early if required automatically. |
| `styleEq` | (`s1`: `FileFormat.Style` | ``undefined``, `s2`: `FileFormat.Style` | ``undefined``) => *boolean* | Compares two style objects for equality. |
| `styleHash` | (`style`: `Partial<FileFormat.Style\>` | ``undefined``) => *string* | Reduces a style object into a string hash and returns it. |
| `textStyleEq` | (`s1`: `FileFormat.Style` | ``undefined``, `s2`: `FileFormat.Style` | ``undefined``) => *boolean* | Compares two text style objects for equality. |
| `textStyleHash` | (`style`: `Partial<FileFormat.Style\>` | ``undefined``) => *string* | Reduces a text style object into a string hash and returns it. |

<h3 id="RuleUtilsCreator">
  <a id="ruleutilscreator" name="ruleutilscreator"></a>RuleUtilsCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L415)</span>
</h3>

Function for creating a rule utilties object scoped to a specific assistant rule.

#### Type declaration

```typescript
(ruleName: *string*, timeoutToken: [*TimeoutToken*](#timeouttoken)): [*RuleUtils*](#ruleutils)
```

#### Parameters

| Name | Type |
| --- | --- |
| `ruleName` | *string* |
| `timeoutToken` | [*TimeoutToken*](#timeouttoken) |

**Returns:** `[*RuleUtils*](#ruleutils)`{:.language-ts}

<h3 id="RunInput">
  <a id="runinput" name="runinput"></a>RunInput
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L223)</span>
</h3>

Input required for running a group of multiple Assistant packages
against a single Sketch file.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `assistants` | [*AssistantPackageMap*](#assistantpackagemap) | The Assistants to run. |
| `cancelToken` | [*CancelToken*](#canceltoken) | Object from the external environment carrying the cancelled flag. |
| `env` | [*AssistantEnv*](#assistantenv) | Environment. |
| `getImageMetadata` | [*GetImageMetadata*](#getimagemetadata) | GetImageMetadata implmentation. |
| `ignore` | [*IgnoreConfig*](#ignoreconfig) | What to ignore during the run. |
| `processedFile` | [*ProcessedSketchFile*](#processedsketchfile) | Processed Sketch file to run the Assistants against. |
| `timeBudgets` | object |   |
| `timeBudgets.maxRuleTimeoutMs` | *number* | Maximum rule run time in milliseconds, irrespective of its share of the total budget. |
| `timeBudgets.minRuleTimeoutMs` | *number* | Minimum rule run time in milliseconds, irrespective of its share of the total budget. |
| `timeBudgets.totalMs` | *number* | Time budget in milliseconds for the entire run to complete. During the run this budget is dividedly evenly between each active rule. |

<h3 id="RunOutput">
  <a id="runoutput" name="runoutput"></a>RunOutput
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L269)</span>
</h3>

The output from running a group of Assistants. Results are grouped by Assistant
name, and indicate either success or error.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `assistants` | object | Results per Assistant. "error": The Assistant run failed entirely. "success": One or more rules ran successfully. |
| `ignore` | [*IgnoreConfig*](#ignoreconfig) | Ignore directives are pruned during the run to remove orphaned data (non-existant pages, assistants, rules and objects), and returned in the output. |
| `input` | [*RunInput*](#runinput) | Mirror input in the output, for easier processing of results. |

<h3 id="RunOutputProfile">
  <a id="runoutputprofile" name="runoutputprofile"></a>RunOutputProfile
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L295)</span>
</h3>

Profiling statistics about a run.

#### Type declaration

| Name | Type |
| --- | --- |
| `assistants` | object |
| `file` | object |
| `file.objectCounts` | object |
| `file.time` | *number* |
| `file.totalObjects` | *number* |

<h3 id="RunRejection">
  <a id="runrejection" name="runrejection"></a>RunRejection
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L320)</span>
</h3>

The run has failed to the extent that collating a RunOutput object is not
possible, and the runner function promise rejects instead.

#### Type declaration

| Name | Type | Description |
| --- | --- | --- |
| `code` | ```"runError"``` | ```"cancelled"``` | runError: Something unexpected has gone badly wrong. cancelled: Run cancelled via cancellation signal from outside. |
| `message` | *string* | Human readable message describing the rejection. |

<h3 id="SketchFile">
  <a id="sketchfile" name="sketchfile"></a>SketchFile
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L78)</span>
</h3>

Represents a Sketch file that is on disk. Collates the filepath with an object typed as Contents
from the file format.

#### Type declaration

| Name | Type |
| --- | --- |
| `contents` | FileFormat.Contents |
| `filepath` | *string* |

<h3 id="SketchFileObject">
  <a id="sketchfileobject" name="sketchfileobject"></a>SketchFileObject
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L92)</span>
</h3>

Union of all possible objects in a parsed Sketch file that have a `_class` property, including
the root document object.

<h3 id="StringArrayOptionCreator">
  <a id="stringarrayoptioncreator" name="stringarrayoptioncreator"></a>StringArrayOptionCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L857)</span>
</h3>

Creates rule option schema properties for a string array option.

#### Type declaration

```typescript
(ops: { `defaultValue?`: *string*[] ; `description`: *string* ; `maxLength?`: *number* ; `minLength?`: *number* ; `name`: *string* ; `pattern?`: *string* ; `title`: *string*  }): [*JSONSchemaProps*](#jsonschemaprops)
```

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | object |
| `ops.defaultValue?` | `*string*[]` |
| `ops.description` | *string* |
| `ops.maxLength?` | *number* |
| `ops.minLength?` | *number* |
| `ops.name` | *string* |
| `ops.pattern?` | *string* |
| `ops.title` | *string* |

**Returns:** `[*JSONSchemaProps*](#jsonschemaprops)`{:.language-ts}

<h3 id="StringEnumOptionCreator">
  <a id="stringenumoptioncreator" name="stringenumoptioncreator"></a>StringEnumOptionCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L845)</span>
</h3>

Creates rule option schema properties for a string enum option.

#### Type declaration

```typescript
(ops: { `defaultValue?`: *string* ; `description`: *string* ; `name`: *string* ; `title`: *string* ; `valueTitles`: *string*[] ; `values`: *string*[]  }): [*JSONSchemaProps*](#jsonschemaprops)
```

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | object |
| `ops.defaultValue?` | *string* |
| `ops.description` | *string* |
| `ops.name` | *string* |
| `ops.title` | *string* |
| `ops.valueTitles` | `*string*[]` |
| `ops.values` | `*string*[]` |

**Returns:** `[*JSONSchemaProps*](#jsonschemaprops)`{:.language-ts}

<h3 id="StringOptionCreator">
  <a id="stringoptioncreator" name="stringoptioncreator"></a>StringOptionCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L822)</span>
</h3>

Creates rule option schema properties for a string option.

#### Type declaration

```typescript
(ops: { `defaultValue?`: *string* ; `description`: *string* ; `maxLength?`: *number* ; `minLength?`: *number* ; `name`: *string* ; `pattern?`: *string* ; `title`: *string*  }): [*JSONSchemaProps*](#jsonschemaprops)
```

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | object |
| `ops.defaultValue?` | *string* |
| `ops.description` | *string* |
| `ops.maxLength?` | *number* |
| `ops.minLength?` | *number* |
| `ops.name` | *string* |
| `ops.pattern?` | *string* |
| `ops.title` | *string* |

**Returns:** `[*JSONSchemaProps*](#jsonschemaprops)`{:.language-ts}

<h3 id="TimeoutToken">
  <a id="timeouttoken" name="timeouttoken"></a>TimeoutToken
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L210)</span>
</h3>

Contains a flag indicating whether a rule has timed out.

#### Type declaration

| Name | Type |
| --- | --- |
| `timedOut` | *boolean* |

<h3 id="Unarray">
  <a id="unarray" name="unarray"></a>Unarray
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L56)</span>
</h3>

Unwrap an array type up one level, e.g. extract Foo from Foo[].

#### Type parameters

| Name |
| --- |
| `T` |

<h3 id="ValueOrArray">
  <a id="valueorarray" name="valueorarray"></a>ValueOrArray
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L37)</span>
</h3>

Value or arbitrarily nested array of values.

#### Type parameters

| Name |
| --- |
| `T` |

<h3 id="Violation">
  <a id="violation" name="violation"></a>Violation
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L511)</span>
</h3>

A violation collates all the information about a problem, and is the fundamental way an Assistant
communicates these to the outer environment.

#### Type declaration

| Name | Type |
| --- | --- |
| `assistantName` | *string* |
| `message` | *string* |
| `objects` | `Partial<{ `class`: *string* ; `id`: *string* ; `name`: *string* ; `pointer`: *string*  }\>[]` |
| `ruleName` | *string* |
| `severity` | [*ViolationSeverity*](#violationseverity) |

<h3 id="Workspace">
  <a id="workspace" name="workspace"></a>Workspace
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/types/src/types.ts#L177)</span>
</h3>

The expected shape of the Sketch file workspace used with Assistants. This is
where Sketch persists a file's Assistants configuration. First and foremost
it's a valid package.json, with the dependencies specifying the active
Assistants - every dependency is expected to be a package exporting a valid
Assistant on its default export. It additionally persists what's being
ignored during the Assistant runs.

</section>
