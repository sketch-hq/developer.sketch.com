---
title: Publishing
section: assistants
permalink: /assistants/publishing
chapter: Guides
order: 105
excerpt: Publishing Sketch Assistants.
---

Publish your Assistant to allow Sketch to automatically fetch it for users when they open a document with it added.

Published Assistants can also be listed on the Sketch website. We recommend publishing to [npm](https://www.npmjs.com), but self-hosting is also an option.

Once you've created an Assistant package, perhaps after following our [Getting started](/assistants/getting-started) and [Writing a rule](/assistants/writing-a-rule) guides, you're ready to publish.

## Publishing to npm

Below is a list of steps to publish your Assistant to npm. For more information on publishing JavaScript packages see the [documentation](https://docs.npmjs.com/packages-and-modules).

> **Note:** You'll need a free npm account to publish to the npm registry.

1. Ensure you are logged-in to npm on the command line via `npm login`.
1. Update your Assistant code as needed, implement any rules you want to and ensure any tests are passing.
1. Ensure the `name` field in package.json has been set to a valid, unique npm package name.
1. Ensure the `version` field in package.json is updated to reflect the version you want to publish.
1. Run the build process for your Assistant.
1. Run `npm publish`.
Your Assistant package should now be live 🎉

To confirm the package has been published successfully, request the metadata running the following command:

```sh
npm info <your-package-name>
```

Add your npm Assistant to a Sketch document by copy and pasting the `tarball` value from the above output and adding it to a Sketch document via the ⚙️ › _Add from URL…_ option within the _Manage Assistants…_ sheet for your document.

A Sketch document configured with a published Assistant is truly portable - other users will be prompted to install the exact same Assistant package when they open the document.

## Self-hosting

There is no hard requirement that your Assistant is published to npm. As long as your Assistant package is hosted somewhere on the web, accessible to your intended audience, it can be added to Sketch documents and shared.

Running the following command in an Assistant generated with our [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) repository will yield a tarball file in the current working directory.

```
npm run package-tarball
```

Once the resulting `.tgz` archive is uploaded, add the Assistant to a Sketch document via the ⚙️ › _Add from URL…_ option within the _Manage Assistants…_ sheet for your document.

## Updating published Assistants

Sketch does not check if there are newer versions of your published Assistant, so it won't automatically prompt users to update Assistants added to documents.

If there's a newer version of an Assistant available, and you want to update a document to take advantage of it you'll need to re-add the Assistant to that document. Either via the ⚙️ › _Add from Archive…_ option within the _Manage Assistants…_ sheet for your document, or add the Assistant again from [sketch.com](https://www.sketch.com).

## Listing on [sketch.com](https://www.sketch.com)

Once published to npm you can opt-in to having your Assistant listed on [sketch.com](https://www.sketch.com). The benefits of doing this are:

- A publicly hosted homepage for your Assistant on [sketch.com](https://www.sketch.com), automatically generated from your Assistant's README and `package.json` data.
- Your Assistant will become discoverable to a wider audience.
- The homepage will include a "Add to Sketch" button that will open Sketch and add the latest version of your Assistant to the current document. Read more about this in the [One-click add button](/assistants/one-click-add) documentation.

### Requirements

The following requirements must be met to get your Assistant listed.
1. Published publicly to npm
1. Assistant's `package.json` must contain:
    1. Version number, must be `1.0.0` or greater
    1. [Keywords](https://docs.npmjs.com/files/package.json#keywords) `sketch assistant` and `public`
    1. Metadata object `sketch-assistant`, with `title`, `description` and (optionally) `icon`
    1. `sketch` string property pointing to a built, single-file bundle of your Assistant

> 💡 Assistants created via our [Getting started](/assistants/getting-started) guide are already fully set up.

### Best practices

- Don't include the `title` and `description` used in `package.json` as the first items on your README file.
- Document your rule and configuration choices in the README - find out more about this via the [Documenting Assistants](/assistants/documenting) page.
- Consider assigning your Assistant one or more category [keywords](https://docs.npmjs.com/files/package.json#keywords) to take advantage of future improvements to Assistant discoverability:
  - `guidelines`
  - `organization`
  - `accessibility`
  - `ios`
  - `mac`
  - `windows`
  - `web`
  - `android`
