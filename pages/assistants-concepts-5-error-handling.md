---
title: Error handling
section: assistants
permalink: /assistants/error-handling
chapter: Concepts
order: 205
excerpt: Handling Sketch Assistant errors.
---

Errors generated by your Assistants are generally caught and surfaced in the Sketch application. By surfacing errors in the user interface failures become more visible and fixable. This guide covers the scenarios you are likely to encounter them, and reasons why you might want to throw errors yourself.

> 💡 While Sketch doesn't hide errors away, you may find it easy to debug and fix problems in NodeJS instead - read our [Running and testing](/assistants/run-and-test) guide for a how-to.

An Assistant can fail with two types of errors, _rule errors_ that can exist alongside Assistant results and _general errors_ when no result can be generated.

## Rule errors

Rule errors are caught during the invocation of your rule functions. We don't treat these errors as critical failures, and we display them alongside Assistant results.

Reasons for encountering a rule error could include,

- You've deliberately thrown an error yourself from a rule, for [example](/assistants/write-a-rule#making-a-configurable-rule) when an option isn't of the correct data type.
- Your rule has taken too long to run and has timed out.
- Some other unexpected error was thrown within your rule logic.

Upon encountering a rule error Sketch will display a _Could not check entire document_ message beneath the rule in the results sheet. You can click the small icon to the right of the message to copy error details to the clipboard.

<p align="center">
  <img src="/images/developer/assistant-rule-errors.png"
    alt="Assistant showing a rule error"
    width="446" />
</p>

## General errors

General errors are potentially more serious, and could mean your Assistant fails to produce any results at all. Like rule errors, these are also surfaced in the Sketch app for visibility.

One reason for encountering a general error could be that your Assistant wasn't built properly in the format expected by Sketch. If you originally followed our [Getting started](/assistants/getting-started) guide then you should have a working build process based on the [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template), so it's worth comparing your project against the template repository to see if your setup has diverged or needs updating.

Sketch will replace your Assistant results with an error display if a general error has occurred.

<p align="center">
  <img src="/images/developer/assistant-general-error.png"
    alt="Assistant showing a rule error"
    width="446" />
</p>

> 😵 If you're experiencing other errors you don't understand, or you suspect something isn't working right then raise an issue in the [sketch-assistants](https://github.com/sketch-hq/sketch-assistants/issues) repository - we'd be happy to help!
