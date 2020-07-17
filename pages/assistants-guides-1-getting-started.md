---
title: Getting started
section: assistants
permalink: /assistants/getting-started
chapter: Guides
order: 100
excerpt: Getting started with authoring Sketch Assistants.
---

Every Sketch Assistant is a small JavaScript project, so you'll need a [NodeJS](https://nodejs.org) development environment on your system in order to get started making your own.

## Requirements

### Skills

- You'll need some command line skills
- Some familiarity with Git and GitHub
- JavaScript knowledge (and ideally some exposure to TypeScript, although this isn't essential)

### NodeJS

You'll need a recent version of [NodeJS](https://nodejs.org) installed on your system, at least version 12 or greater.

You may already have NodeJS installed on your system, to check enter the following in your a terminal,

```sh
node --version
```

If that reports `12.x.x` or greater you're good to go. If not, you have a few options:

- Download and install the latest version from the [official site](https://nodejs.org/en/download/) (recommended)
- Install NodeJS with [Homebrew](https://brew.sh)
- If you need to manage multiple versions of NodeJS on your system try [nvm](https://github.com/nvm-sh/nvm)

### Editor

You'll also need an editor that handles JavaScript projects nicely. We recommend [Visual Studio Code](https://visualstudio.microsoft.com/downloads/).

## Create your first Assistant

We've created the [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) repository to help you get going as quickly as possible. This is a minimal Sketch Assistant project with everything properly configured and ready-to-go.

Follow the steps below to create your first Assistant project, build it locally and add it to a Sketch document

1. Click [here](https://github.com/sketch-hq/sketch-assistant-template/generate) to generate your own Assistant repository on GitHub based on our template
1. Follow the [instructions](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) on GitHub to clone your new repository to your machine
1. Once cloned, `cd` into your new repository folder in your terminal and run,
   ```
   npm install
   ```
1. Still in the repository folder, build and package the Assistant locally with,
   ```
   npm run package-tarball
   ```
   This will build a file called `sketch-assistant-template-1.0.0.tgz` to the current folder - this is your Assistant packaged as a tarball, ready to be used in Sketch!
1. Open or create a document in Sketch, and add this file to it via the ⚙️ › _Add from Archive…_ option within the _Manage Assistants…_ sheet for your document. You should see a result from a _Hello World_ rule in the Assistants panel 🎉

Try opening your Assistant project in Visual Studio Code, and exploring the project folder. Both the Assistant and its _Hello World_ rule are defined in the `src/index.ts` file.

Experiment with making minor changes to the rule, for example adjusting its `title` value to a new string. Each time you make a change re-run `npm run package-tarball` to see your changes in Sketch.

At this point you may wish to name your Assistant properly, and add some descriptive metadata.

1. Find and replace all instances of the `sketch-assistant-template` string with the name of your new Assistant project. Name your Assistant as you would an npm package, i.e. all lower case, no spaces.
1. Update the `title` and `description` values in the `sketch-assistant` object property in `package.json`.
1. Update the `homepage` value in `package.json` - this is likely just the GitHub repository page for now. Sketch will direct users to this page to find out more about your Assistant.

> 👉 Continue on to [Writing a rule](/assistants/writing-a-rule) if you're ready to learn more.
