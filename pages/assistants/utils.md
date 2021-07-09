---
title: Utils
section: assistants
permalink: /assistants/reference/utils
chapter: Reference
excerpt: Utils
order: 505
definitions: assistant||assign;#assign|getRuleDefinition;#getruledefinition|prepare;#prepare|||assistant-config||getRuleConfig;#getruleconfig|getRuleOption;#getruleoption|getRuleSeverity;#getruleseverity|getRuleTitle;#getruletitle|isRuleActive;#isruleactive|isRuleConfigured;#isruleconfigured|isRuleConfigValid;#isruleconfigvalid|||files||filterPages;#filterpages|||get-image-metadata||getImageMetadata;#getimagemetadata|||object-utils||objectHash;#objecthash|objectsEqual;#objectsequal|||pointer-utils||evalPointer;#evalpointer|getParentPointer;#getparentpointer|||process||addObjectToCache;#addobjecttocache|createEmptyObjectCache;#createemptyobjectcache|process;#process|traverse;#traverse|||rule-option-schemas||buildRuleOptionSchema;#buildruleoptionschema|helpers;#helpers|||rule-utils||createIterable;#createiterable|createIterableObjectCache;#createiterableobjectcache|createRuleUtilsCreator;#createruleutilscreator|styleEq;#styleeq|styleHash;#stylehash|textStyleEq;#textstyleeq|textStyleHash;#textstylehash|||run||createRunRejection;#createrunrejection|getIgnoredObjectIdsForRule;#getignoredobjectidsforrule|isRuleFullIgnored;#isrulefullignored|isRunRejection;#isrunrejection|makeProfile;#makeprofile|pruneAssistants;#pruneassistants|pruneObjects;#pruneobjects|prunePages;#prunepages|pruneRules;#prunerules|runAssistant;#runassistant|runMultipleAssistants;#runmultipleassistants|||test-helpers||createAssistant;#createassistant|createAssistantConfig;#createassistantconfig|createAssistantDefinition;#createassistantdefinition|createDummyRect;#createdummyrect|createDummySwatch;#createdummyswatch|createRule;#createrule|testAssistant;#testassistant|testRule;#testrule|testRuleInAssistant;#testruleinassistant
---

<section class="assistants reference reflection content" markdown="1">
  
  

  

## assistant

<h3 id="assign">
  <a id="assign" name="assign"></a>assign
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant/index.ts#L49)</span>
</h3>

```typescript
assign(...sources: AssistantDefinition[]): AssistantDefinition
```

Merge assistant definitions together to form a single assistant definition, with a syntax similar
to Object.assign(). Assistants are merged from the right-most argument to the left into
preceeding arguments, according to the following algorithm:

  1. Rule configuration objects are merged together, with values from right-most assistants
     overriding those from the next assistant to the left
  2. Assistant rule function arrays are concatenated

#### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `...sources` | `AssistantDefinition[]` | Assistant definitions to merge |

**Returns:** `AssistantDefinition`{:.language-ts}

<h3 id="getRuleDefinition">
  <a id="getruledefinition" name="getruledefinition"></a>getRuleDefinition
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant/index.ts#L70)</span>
</h3>

```typescript
getRuleDefinition(assistant: AssistantDefinition, ruleName: *string*): *Maybe*<RuleDefinition\>
```

Lookup a rule definition by rule name.

#### Parameters

| Name | Type |
| --- | --- |
| `assistant` | AssistantDefinition |
| `ruleName` | *string* |

**Returns:** `*Maybe*<RuleDefinition\>`{:.language-ts}

<h3 id="prepare">
  <a id="prepare" name="prepare"></a>prepare
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant/index.ts#L27)</span>
</h3>

```typescript
prepare(pkg: *unknown*, env: AssistantEnv): *Promise*<AssistantDefinition\>
```

Prepare an assistant package. That is, un-roll its exported value into a flat list of assistant
functions, invoke and await them to obtain a flat list of concrete assistant definitions which is
then merged to form a final/single assistant definition.

Assistant preparation is performed at runtime by an assistant runner.

#### Parameters

| Name | Type |
| --- | --- |
| `pkg` | *unknown* |
| `env` | AssistantEnv |

**Returns:** `*Promise*<AssistantDefinition\>`{:.language-ts}

## assistant-config

<h3 id="getRuleConfig">
  <a id="getruleconfig" name="getruleconfig"></a>getRuleConfig
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant-config/index.ts#L16)</span>
</h3>

```typescript
getRuleConfig(config: AssistantConfig, ruleName: *string*): *Maybe*<RuleConfig\>
```

Get rule configuration from an assistant config.

#### Parameters

| Name | Type |
| --- | --- |
| `config` | AssistantConfig |
| `ruleName` | *string* |

**Returns:** `*Maybe*<RuleConfig\>`{:.language-ts}

<h3 id="getRuleOption">
  <a id="getruleoption" name="getruleoption"></a>getRuleOption
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant-config/index.ts#L28)</span>
</h3>

```typescript
getRuleOption(config: AssistantConfig, ruleName: *string*, optionKey: *string*): *unknown*
```

Get the value of a specific rule option.

#### Parameters

| Name | Type |
| --- | --- |
| `config` | AssistantConfig |
| `ruleName` | *string* |
| `optionKey` | *string* |

**Returns:** `*unknown*`{:.language-ts}

<h3 id="getRuleSeverity">
  <a id="getruleseverity" name="getruleseverity"></a>getRuleSeverity
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant-config/index.ts#L65)</span>
</h3>

```typescript
getRuleSeverity(config: AssistantConfig, ruleName: *string*): ViolationSeverity
```

Determine a rule's severity, falling back to default values if not specified.

#### Parameters

| Name | Type |
| --- | --- |
| `config` | AssistantConfig |
| `ruleName` | *string* |

**Returns:** `ViolationSeverity`{:.language-ts}

<h3 id="getRuleTitle">
  <a id="getruletitle" name="getruletitle"></a>getRuleTitle
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant-config/index.ts#L80)</span>
</h3>

```typescript
getRuleTitle(config: AssistantConfig, ruleName: *string*): ``null`` | *string*
```

Return the custom title for a rule if its been defined at configuration-time.

#### Parameters

| Name | Type |
| --- | --- |
| `config` | AssistantConfig |
| `ruleName` | *string* |

**Returns:** ```null`` | *string*`{:.language-ts}

<h3 id="isRuleActive">
  <a id="isruleactive" name="isruleactive"></a>isRuleActive
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant-config/index.ts#L57)</span>
</h3>

```typescript
isRuleActive(config: AssistantConfig, ruleName: *string*): *boolean*
```

Determine if a rule is active. An active rule must both be mentioned in the
config and have its `active` option set to `true`.

#### Parameters

| Name | Type |
| --- | --- |
| `config` | AssistantConfig |
| `ruleName` | *string* |

**Returns:** `*boolean*`{:.language-ts}

<h3 id="isRuleConfigured">
  <a id="isruleconfigured" name="isruleconfigured"></a>isRuleConfigured
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant-config/index.ts#L22)</span>
</h3>

```typescript
isRuleConfigured(config: AssistantConfig, ruleName: *string*): *boolean*
```

Determine if the rule has been mentioned in a given config.

#### Parameters

| Name | Type |
| --- | --- |
| `config` | AssistantConfig |
| `ruleName` | *string* |

**Returns:** `*boolean*`{:.language-ts}

<h3 id="isRuleConfigValid">
  <a id="isruleconfigvalid" name="isruleconfigvalid"></a>isRuleConfigValid
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/assistant-config/index.ts#L41)</span>
</h3>

```typescript
isRuleConfigValid(config: AssistantConfig, rule: RuleDefinition): ``true`` | *ErrorObject*<string, Record<string, any\>, unknown\>[]
```

Validate a rule's options in a config object according to the schema defined
on the rule module.

#### Parameters

| Name | Type |
| --- | --- |
| `config` | AssistantConfig |
| `rule` | RuleDefinition |

**Returns:** ```true`` | *ErrorObject*<string, Record<string, any\>, unknown\>[]`{:.language-ts}

## files

<h3 id="filterPages">
  <a id="filterpages" name="filterpages"></a>filterPages
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/files/index.ts#L6)</span>
</h3>

```typescript
filterPages(file: SketchFile, excludedPageIds: *string*[]): SketchFile
```

Filter pages out of a SketchFile object based on page ids.

#### Parameters

| Name | Type |
| --- | --- |
| `file` | SketchFile |
| `excludedPageIds` | `*string*[]` |

**Returns:** `SketchFile`{:.language-ts}

## get-image-metadata

<h3 id="getImageMetadata">
  <a id="getimagemetadata" name="getimagemetadata"></a>getImageMetadata
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/get-image-metadata/index.ts#L11)</span>
</h3>

```typescript
getImageMetadata(ref: *string*, filepath: *string*): *Promise*<ImageMetadata\>
```

Efficiently access image metadata from a zipped Sketch document. Streams
the image from the zip, and returns as soon as the image dimensions are
parsed from the header chunks.

#### Parameters

| Name | Type |
| --- | --- |
| `ref` | *string* |
| `filepath` | *string* |

**Returns:** `*Promise*<ImageMetadata\>`{:.language-ts}

## object-utils

<h3 id="objectHash">
  <a id="objecthash" name="objecthash"></a>objectHash
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/object-utils/index.ts#L7)</span>
</h3>

```typescript
objectHash(obj: {}, excludeKeys?: *string*[]): *string*
```

Return the md5 hash of an object. Keys are deeply sorted for a stable hash.
Useful for comparing deep similarity of Sketch document objects.

#### Parameters

| Name | Type | Default value |
| --- | --- | --- |
| `obj` | object |   |
| `excludeKeys` | `*string*[]` | [] |

**Returns:** `*string*`{:.language-ts}

<h3 id="objectsEqual">
  <a id="objectsequal" name="objectsequal"></a>objectsEqual
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/object-utils/index.ts#L17)</span>
</h3>

```typescript
objectsEqual(o1: {}, o2: {}, excludeKeys?: *string*[]): *boolean*
```

Compares two objects for deep equality.

#### Parameters

| Name | Type | Default value |
| --- | --- | --- |
| `o1` | object |   |
| `o2` | object |   |
| `excludeKeys` | `*string*[]` | [] |

**Returns:** `*boolean*`{:.language-ts}

## pointer-utils

<h3 id="evalPointer">
  <a id="evalpointer" name="evalpointer"></a>evalPointer
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/pointer-utils/index.ts#L8)</span>
</h3>

```typescript
evalPointer(pointer: *string*, instance: *any*): *unknown*
```

Resolve a RFC6901 JSON Pointer to a value with a target object instance.

#### Parameters

| Name | Type |
| --- | --- |
| `pointer` | *string* |
| `instance` | *any* |

**Returns:** `*unknown*`{:.language-ts}

<h3 id="getParentPointer">
  <a id="getparentpointer" name="getparentpointer"></a>getParentPointer
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/pointer-utils/index.ts#L22)</span>
</h3>

```typescript
getParentPointer(pointer: *string*): *undefined* | *string*
```

Unwind a RFC6901 JSON Pointer string one level to find the JSON Pointer for its parent,
e.g. `/foo/bar/0/baz` => `foo/bar[0]`. If the JSON Pointer is invalid or the parent isn't
available (i.e. already at the root) then `undefined` is returned.

#### Parameters

| Name | Type |
| --- | --- |
| `pointer` | *string* |

**Returns:** `*undefined* | *string*`{:.language-ts}

## process

<h3 id="addObjectToCache">
  <a id="addobjecttocache" name="addobjecttocache"></a>addObjectToCache
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/process/index.ts#L36)</span>
</h3>

```typescript
addObjectToCache(object: AnyObject | {}, cache: ObjectCache): *void*
```

Add a file format object to an ObjectCache instance.

#### Parameters

| Name | Type |
| --- | --- |
| `object` | `AnyObject` | `{}` |
| `cache` | ObjectCache |

**Returns:** `*void*`{:.language-ts}

<h3 id="createEmptyObjectCache">
  <a id="createemptyobjectcache" name="createemptyobjectcache"></a>createEmptyObjectCache
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/process/index.ts#L23)</span>
</h3>

```typescript
createEmptyObjectCache(): ObjectCache
```

Create an empty ObjectCache object.

**Returns:** `ObjectCache`{:.language-ts}

<h3 id="process">
  <a id="process" name="process"></a>process
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/process/index.ts#L308)</span>
</h3>

```typescript
process(file: SketchFile, cancelToken: CancelToken): *Promise*<ProcessedSketchFile\>
```

Generate a ProcessedSketchFile object from a SketchFile object.

#### Parameters

| Name | Type |
| --- | --- |
| `file` | SketchFile |
| `cancelToken` | CancelToken |

**Returns:** `*Promise*<ProcessedSketchFile\>`{:.language-ts}

<h3 id="traverse">
  <a id="traverse" name="traverse"></a>traverse
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/process/index.ts#L242)</span>
</h3>

```typescript
traverse(__namedParameters: { `cancelToken`: CancelToken ; `foreignContext?`: *boolean* ; `foreignObjects`: ObjectCache ; `objectIds`: ObjectIdSet ; `objects`: ObjectCache ; `pointer?`: *string* ; `pointers`: PointerMap ; `target?`: *Record*<string, {}\>  }): *void*
```

Recursively traverse a Sketch file, while populating various caches and maps.

#### Parameters

| Name | Type |
| --- | --- |
| `__namedParameters` | object |
| `__namedParameters.cancelToken` | CancelToken |
| `__namedParameters.foreignContext?` | *boolean* |
| `__namedParameters.foreignObjects` | ObjectCache |
| `__namedParameters.objectIds` | ObjectIdSet |
| `__namedParameters.objects` | ObjectCache |
| `__namedParameters.pointer?` | *string* |
| `__namedParameters.pointers` | PointerMap |
| `__namedParameters.target?` | Record<`string`, {}\> |

**Returns:** `*void*`{:.language-ts}

## rule-option-schemas

<h3 id="buildRuleOptionSchema">
  <a id="buildruleoptionschema" name="buildruleoptionschema"></a>buildRuleOptionSchema
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-option-schemas/index.ts#L36)</span>
</h3>

```typescript
buildRuleOptionSchema(ops: JSONSchemaProps[]): JSONSchema7
```

Combine multiple rule option schemas into one. We treat _all_ custom options
as required.

#### Parameters

| Name | Type |
| --- | --- |
| `ops` | `JSONSchemaProps[]` |

**Returns:** `JSONSchema7`{:.language-ts}

<h3 id="helpers">
  <a id="helpers" name="helpers"></a>helpers
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-option-schemas/index.ts#L173)</span>
</h3>

## rule-utils

<h3 id="createIterable">
  <a id="createiterable" name="createiterable"></a>createIterable
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-utils/index.ts#L188)</span>
</h3>

```typescript
createIterable<T>(src: T[], cancelToken: CancelToken, timeoutToken: TimeoutToken, ignoredIds: *string*[]): *GeneratorIterable*<T\>
```

Returns a generator based iterable that can be cancelled by a RunOperation.

#### Type parameters

| Name |
| --- |
| `T` |

#### Parameters

| Name | Type |
| --- | --- |
| `src` | `T[]` |
| `cancelToken` | CancelToken |
| `timeoutToken` | TimeoutToken |
| `ignoredIds` | `*string*[]` |

**Returns:** `*GeneratorIterable*<T\>`{:.language-ts}

<h3 id="createIterableObjectCache">
  <a id="createiterableobjectcache" name="createiterableobjectcache"></a>createIterableObjectCache
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-utils/index.ts#L218)</span>
</h3>

```typescript
createIterableObjectCache(o: ObjectCache, r: CancelToken, t: TimeoutToken, i: *string*[]): IterableObjectCache
```

Returns an IterableObjectCache for any given ObjectCache. We want 100% type safety here so
when iterating objects we get the real object type back, and don't have to add any guards
or checks to rule logic. If there's a more concise way to do this and retain the correct
types I'm all ears.

#### Parameters

| Name | Type |
| --- | --- |
| `o` | ObjectCache |
| `r` | CancelToken |
| `t` | TimeoutToken |
| `i` | `*string*[]` |

**Returns:** `IterableObjectCache`{:.language-ts}

<h3 id="createRuleUtilsCreator">
  <a id="createruleutilscreator" name="createruleutilscreator"></a>createRuleUtilsCreator
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-utils/index.ts#L368)</span>
</h3>

```typescript
createRuleUtilsCreator(processedFile: ProcessedSketchFile, violations: Violation[], assistant: AssistantDefinition, cancelToken: CancelToken, getImageMetadata: GetImageMetadata, ignoreConfig: IgnoreConfig): RuleUtilsCreator
```

Returns a RuleUtilsCreator function, which can be used to build util objects
scoped to a specific rule.

#### Parameters

| Name | Type |
| --- | --- |
| `processedFile` | ProcessedSketchFile |
| `violations` | `Violation[]` |
| `assistant` | AssistantDefinition |
| `cancelToken` | CancelToken |
| `getImageMetadata` | GetImageMetadata |
| `ignoreConfig` | IgnoreConfig |

**Returns:** `RuleUtilsCreator`{:.language-ts}

<h3 id="styleEq">
  <a id="styleeq" name="styleeq"></a>styleEq
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-utils/index.ts#L61)</span>
</h3>

```typescript
styleEq(s1: *undefined* | Style, s2: *undefined* | Style): *boolean*
```

Returns a boolean from the equality comparison between two style objects. Useful when
comparing two layer styles.

#### Parameters

| Name | Type |
| --- | --- |
| `s1` | ``undefined`` | `Style` |
| `s2` | ``undefined`` | `Style` |

**Returns:** `*boolean*`{:.language-ts}

<h3 id="styleHash">
  <a id="stylehash" name="stylehash"></a>styleHash
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-utils/index.ts#L47)</span>
</h3>

```typescript
styleHash(style: *undefined* | *Partial*<Style\>): *string*
```

Helper function that creates a string hash from a set of attributes of a style
object.

#### Parameters

| Name | Type |
| --- | --- |
| `style` | ``undefined`` | `Partial<Style\>` |

**Returns:** `*string*`{:.language-ts}

<h3 id="textStyleEq">
  <a id="textstyleeq" name="textstyleeq"></a>textStyleEq
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-utils/index.ts#L83)</span>
</h3>

```typescript
textStyleEq(s1: *undefined* | Style, s2: *undefined* | Style): *boolean*
```

Returns a boolean from the equality comparison between two text style objects. Useful when
comparing two text layer styles.

#### Parameters

| Name | Type |
| --- | --- |
| `s1` | ``undefined`` | `Style` |
| `s2` | ``undefined`` | `Style` |

**Returns:** `*boolean*`{:.language-ts}

<h3 id="textStyleHash">
  <a id="textstylehash" name="textstylehash"></a>textStyleHash
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/rule-utils/index.ts#L68)</span>
</h3>

```typescript
textStyleHash(style: *undefined* | *Partial*<Style\>): *string*
```

Helper function that creates a string hash from a set of attributes of a text style
object.

#### Parameters

| Name | Type |
| --- | --- |
| `style` | ``undefined`` | `Partial<Style\>` |

**Returns:** `*string*`{:.language-ts}

## run

<h3 id="createRunRejection">
  <a id="createrunrejection" name="createrunrejection"></a>createRunRejection
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/run-multiple-assistants/index.ts#L26)</span>
</h3>

```typescript
createRunRejection(message: *string*, code?: ``"runError"`` | ``"cancelled"``, error?: *unknown*): RunRejection
```

Create a RunRejection object.

#### Parameters

| Name | Type | Default value |
| --- | --- | --- |
| `message` | *string* |   |
| `code` | ```"runError"``` | ```"cancelled"``` | 'runError' |
| `error?` | *unknown* |   |

**Returns:** `RunRejection`{:.language-ts}

<h3 id="getIgnoredObjectIdsForRule">
  <a id="getignoredobjectidsforrule" name="getignoredobjectidsforrule"></a>getIgnoredObjectIdsForRule
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/ignore/index.ts#L120)</span>
</h3>

```typescript
getIgnoredObjectIdsForRule(ignore: IgnoreConfig, assistantName: *string*, ruleName: *string*): *string*[]
```

Return the set of ignored objects for a rule.

#### Parameters

| Name | Type |
| --- | --- |
| `ignore` | IgnoreConfig |
| `assistantName` | *string* |
| `ruleName` | *string* |

**Returns:** `*string*[]`{:.language-ts}

<h3 id="isRuleFullIgnored">
  <a id="isrulefullignored" name="isrulefullignored"></a>isRuleFullIgnored
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/ignore/index.ts#L102)</span>
</h3>

```typescript
isRuleFullIgnored(ignore: IgnoreConfig, assistantName: *string*, ruleName: *string*): *boolean*
```

Determine whether a given rule is full ignored, according to a IgnoreConfig. Full ignored means
it both has an entry, and has been set to { allObjects: true }.

#### Parameters

| Name | Type |
| --- | --- |
| `ignore` | IgnoreConfig |
| `assistantName` | *string* |
| `ruleName` | *string* |

**Returns:** `*boolean*`{:.language-ts}

<h3 id="isRunRejection">
  <a id="isrunrejection" name="isrunrejection"></a>isRunRejection
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/run-multiple-assistants/index.ts#L16)</span>
</h3>

```typescript
isRunRejection(val: *unknown*): val is RunRejection
```

#### Parameters

| Name | Type |
| --- | --- |
| `val` | *unknown* |

**Returns:** `val is RunRejection`{:.language-ts}

<h3 id="makeProfile">
  <a id="makeprofile" name="makeprofile"></a>makeProfile
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/profile/index.ts#L12)</span>
</h3>

```typescript
makeProfile(output: RunOutput): RunOutputProfile
```

Create a profile data object for a given RunOutput. Profile data collates statistics that may
help provide insight into Assistant performance, including for example rules that may be taking
a long time to execute. One way to view profile data is to pass the `--profile` flag to the
Assistants CLI.

#### Parameters

| Name | Type |
| --- | --- |
| `output` | RunOutput |

**Returns:** `RunOutputProfile`{:.language-ts}

<h3 id="pruneAssistants">
  <a id="pruneassistants" name="pruneassistants"></a>pruneAssistants
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/ignore/index.ts#L25)</span>
</h3>

```typescript
pruneAssistants(ignore: IgnoreConfig, assistants: AssistantPackageMap): IgnoreConfig
```

Prune ignore directives that relate to Assistants not present in an AssistantPackageMap.

#### Parameters

| Name | Type |
| --- | --- |
| `ignore` | IgnoreConfig |
| `assistants` | AssistantPackageMap |

**Returns:** `IgnoreConfig`{:.language-ts}

<h3 id="pruneObjects">
  <a id="pruneobjects" name="pruneobjects"></a>pruneObjects
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/ignore/index.ts#L69)</span>
</h3>

```typescript
pruneObjects(ignore: IgnoreConfig, processedFile: ProcessedSketchFile): IgnoreConfig
```

Prune ignored objects not present in a ProcessedSketchFile.

#### Parameters

| Name | Type |
| --- | --- |
| `ignore` | IgnoreConfig |
| `processedFile` | ProcessedSketchFile |

**Returns:** `IgnoreConfig`{:.language-ts}

<h3 id="prunePages">
  <a id="prunepages" name="prunepages"></a>prunePages
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/ignore/index.ts#L14)</span>
</h3>

```typescript
prunePages(ignore: IgnoreConfig, file: SketchFile): IgnoreConfig
```

Prune ignored pages that are no longer present in a SketchFile.

#### Parameters

| Name | Type |
| --- | --- |
| `ignore` | IgnoreConfig |
| `file` | SketchFile |

**Returns:** `IgnoreConfig`{:.language-ts}

<h3 id="pruneRules">
  <a id="prunerules" name="prunerules"></a>pruneRules
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/ignore/index.ts#L44)</span>
</h3>

```typescript
pruneRules(ignore: IgnoreConfig, assistant: AssistantDefinition): IgnoreConfig
```

Prune ignored rules not present in an Assistant Definition.

#### Parameters

| Name | Type |
| --- | --- |
| `ignore` | IgnoreConfig |
| `assistant` | AssistantDefinition |

**Returns:** `IgnoreConfig`{:.language-ts}

<h3 id="runAssistant">
  <a id="runassistant" name="runassistant"></a>runAssistant
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/run-assistant/index.ts#L74)</span>
</h3>

```typescript
runAssistant(file: ProcessedSketchFile, assistant: AssistantDefinition, env: AssistantEnv, cancelToken: CancelToken, getImageMetadata: GetImageMetadata, ignoreConfig: IgnoreConfig, ruleTimeout: *number*): *Promise*<AssistantSuccessResult\>
```

Run a single assistant, catching and returning any errors encountered during rule invocation.

#### Parameters

| Name | Type |
| --- | --- |
| `file` | ProcessedSketchFile |
| `assistant` | AssistantDefinition |
| `env` | AssistantEnv |
| `cancelToken` | CancelToken |
| `getImageMetadata` | GetImageMetadata |
| `ignoreConfig` | IgnoreConfig |
| `ruleTimeout` | *number* |

**Returns:** `*Promise*<AssistantSuccessResult\>`{:.language-ts}

<h3 id="runMultipleAssistants">
  <a id="runmultipleassistants" name="runmultipleassistants"></a>runMultipleAssistants
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/run/run-multiple-assistants/index.ts#L154)</span>
</h3>

```typescript
runMultipleAssistants(input: RunInput): *Promise*<RunOutput\>
```

Run multiple assistants.

#### Parameters

| Name | Type |
| --- | --- |
| `input` | RunInput |

**Returns:** `*Promise*<RunOutput\>`{:.language-ts}

## test-helpers

<h3 id="createAssistant">
  <a id="createassistant" name="createassistant"></a>createAssistant
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L88)</span>
</h3>

```typescript
createAssistant(__namedParameters?: { `config?`: AssistantConfig ; `description?`: *string* ; `name?`: *string* ; `rules?`: RuleDefinition[] ; `title?`: *string*  }): Assistant
```

Create a dummy assistant function.

#### Parameters

| Name | Type | Default value |
| --- | --- | --- |
| `__namedParameters` | object | {} |
| `__namedParameters.config?` | AssistantConfig |   |
| `__namedParameters.description?` | *string* |   |
| `__namedParameters.name?` | *string* |   |
| `__namedParameters.rules?` | `RuleDefinition[]` |   |
| `__namedParameters.title?` | *string* |   |

**Returns:** `Assistant`{:.language-ts}

<h3 id="createAssistantConfig">
  <a id="createassistantconfig" name="createassistantconfig"></a>createAssistantConfig
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L55)</span>
</h3>

```typescript
createAssistantConfig(__namedParameters?: { `defaultSeverity?`: ViolationSeverity ; `rules?`: RuleConfigGroup  }): AssistantConfig
```

Create a dummy assistant configuration.

#### Parameters

| Name | Type | Default value |
| --- | --- | --- |
| `__namedParameters` | object | {} |
| `__namedParameters.defaultSeverity?` | ViolationSeverity |   |
| `__namedParameters.rules?` | RuleConfigGroup |   |

**Returns:** `AssistantConfig`{:.language-ts}

<h3 id="createAssistantDefinition">
  <a id="createassistantdefinition" name="createassistantdefinition"></a>createAssistantDefinition
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L69)</span>
</h3>

```typescript
createAssistantDefinition(__namedParameters?: { `config?`: AssistantConfig ; `description?`: *string* ; `name?`: *string* ; `rules?`: RuleDefinition[] ; `title?`: *string*  }): AssistantDefinition
```

Create a dummy assistant definition.

#### Parameters

| Name | Type | Default value |
| --- | --- | --- |
| `__namedParameters` | object | {} |
| `__namedParameters.config?` | AssistantConfig |   |
| `__namedParameters.description?` | *string* |   |
| `__namedParameters.name?` | *string* |   |
| `__namedParameters.rules?` | `RuleDefinition[]` |   |
| `__namedParameters.title?` | *string* |   |

**Returns:** `AssistantDefinition`{:.language-ts}

<h3 id="createDummyRect">
  <a id="createdummyrect" name="createdummyrect"></a>createDummyRect
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L105)</span>
</h3>

```typescript
createDummyRect(): Rect
```

**Returns:** `Rect`{:.language-ts}

<h3 id="createDummySwatch">
  <a id="createdummyswatch" name="createdummyswatch"></a>createDummySwatch
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L114)</span>
</h3>

```typescript
createDummySwatch(id?: *string*): Swatch
```

#### Parameters

| Name | Type | Default value |
| --- | --- | --- |
| `id` | *string* | '1' |

**Returns:** `Swatch`{:.language-ts}

<h3 id="createRule">
  <a id="createrule" name="createrule"></a>createRule
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L26)</span>
</h3>

```typescript
createRule(__namedParameters?: { `debug?`: *boolean* ; `description?`: *string* | (`ruleConfig`: RuleConfig) => *string* ; `getOptions?`: RuleOptionsCreator ; `name?`: *string* ; `rule?`: RuleFunction ; `runtime?`: AssistantRuntime ; `title?`: *string* | (`ruleConfig`: RuleConfig) => *string*  }): RuleDefinition
```

Create a dummy rule definition.

#### Parameters

| Name | Type | Default value |
| --- | --- | --- |
| `__namedParameters` | object | {} |
| `__namedParameters.debug?` | *boolean* |   |
| `__namedParameters.description?` | ``string`` | `(`ruleConfig`: RuleConfig) => *string*` |   |
| `__namedParameters.getOptions?` | RuleOptionsCreator |   |
| `__namedParameters.name?` | *string* |   |
| `__namedParameters.rule?` | RuleFunction |   |
| `__namedParameters.runtime?` | AssistantRuntime |   |
| `__namedParameters.title?` | ``string`` | `(`ruleConfig`: RuleConfig) => *string*` |   |

**Returns:** `RuleDefinition`{:.language-ts}

<h3 id="testAssistant">
  <a id="testassistant" name="testassistant"></a>testAssistant
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L132)</span>
</h3>

```typescript
testAssistant(filepath: *string*, assistant: AssistantPackage, env?: AssistantEnv): *Promise*<TestResult\>
```

Test an Assistant.

#### Parameters

| Name | Type |
| --- | --- |
| `filepath` | *string* |
| `assistant` | AssistantPackage |
| `env` | AssistantEnv |

**Returns:** `*Promise*<TestResult\>`{:.language-ts}

<h3 id="testRule">
  <a id="testrule" name="testrule"></a>testRule
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L159)</span>
</h3>

```typescript
testRule(filepath: *string*, rule: RuleDefinition, ruleConfig?: RuleConfig, env?: AssistantEnv): *Promise*<TestResult\>
```

Test a rule by running it against a custom config within the context of a
temporary Assistant.

#### Parameters

| Name | Type |
| --- | --- |
| `filepath` | *string* |
| `rule` | RuleDefinition |
| `ruleConfig` | RuleConfig |
| `env` | AssistantEnv |

**Returns:** `*Promise*<TestResult\>`{:.language-ts}

<h3 id="testRuleInAssistant">
  <a id="testruleinassistant" name="testruleinassistant"></a>testRuleInAssistant
  <span class="source-link" markdown="1">[ ](https://github.com/sketch-hq/sketch-assistants/blob/db0e303/packages/utils/src/test-helpers/index.ts#L197)</span>
</h3>

```typescript
testRuleInAssistant(filepath: *string*, assistant: AssistantPackage, ruleName: *string*, ruleConfig?: RuleConfig, env?: AssistantEnv): *Promise*<TestResult\>
```

Test a rule in isolation within the context of an Assistant. Only the rule under test is
activated, so violations or rule errors from other rules are ignored. A custom rule config can
be supplied, but if omitted the config currently configured in the Assistant is used.

#### Parameters

| Name | Type |
| --- | --- |
| `filepath` | *string* |
| `assistant` | AssistantPackage |
| `ruleName` | *string* |
| `ruleConfig?` | RuleConfig |
| `env` | AssistantEnv |

**Returns:** `*Promise*<TestResult\>`{:.language-ts}

</section>
