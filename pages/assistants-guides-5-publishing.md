---
title: Publishing
section: assistants
permalink: /assistants/publishing
chapter: Guides
order: 105
excerpt: Publishing Sketch Assistants.
---

Sketch Assistants are ordinary JavaScript packages and as such can be published to [Npm](https://www.npmjs.com), the JavaScript package manager, in a few simple steps.

In practice, publishing means hosting your Assistant's package on a publically accessible URL. Npm isn't the only way to publically host your Assistant package but it is fast, easy and free so forms the basis of this guide.

Once published in this way your Assistant becomes fully shareable - this means that other Sketch users will be automatically prompted to download it when they open a Sketch document that has your Assistant added. Additionally, published Assistants will be automatically installed when processing documents with the [CLI](/assistants/cli).

## Publishing to Npm

Once you've created an Assistant package, for example by generating an Assistant from our [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) repository or following the [Writing a rule](/assistants/writing-a-rule) guide, you're ready to publish it to Npm.

1. Review the Npm [documentation](https://docs.npmjs.com/packages-and-modules) to familiarize yourself about publishing packages, but read on for a quick guide.
1. Ensure you have an npm account and are logged-in to Npm on the command line via `npm login`.
1. Update your Assistant code as needed, implement any rules you want to and ensure any tests are passing.
1. Ensure the `name` field in package.json has been set to a valid, unique npm package name.
1. Ensure the `version` field in package.json is updated to reflect the version you want to publish.
1. If your Assistant has a build process ensure you ran it recently.
1. Run `npm publish`.

If all went well, your Assistant package should now be live 🎉

You can confirm this by running the below command, which should return metadata about your Assistant:

```sh
npm info <your-package-name>
```

Add your Npm Assistant to a Sketch document by copy and pasting the `tarball` value from the above output and adding it to a Sketch document via the _Assistants > Add from URL_ menu option.

A Sketch document configured with an Npm Assistant is truly portable - other users will be prompted to install the exact same Assistant package when they open the document.

## Listing on [sketch.com](https://www.sketch.com)

Once published to Npm you can opt-in to having your Assistant listed on [sketch.com](https://www.sketch.com). The benefits of doing this include:

- A publically hosted homepage for your Assistant on [sketch.com](https://www.sketch.com).
- Your Assistant will become discoverable to a wider audience.
- The homepage will include a "Add to Sketch" button that will open Sketch and add the latest version of your Assistant to the current document. Read more about this in the [One-click add button](/assistants/one-click-add) documentation.

### Criteria

In order for your Assistant to be listed ensure your Assistant meets the following criteria:

1. It's published publically to Npm
1. It is at version `1.0.0` or greater
1. It has the [keywords](https://docs.npmjs.com/files/package.json#keywords) `sketch assistant` and `public` defined in its `package.json`
1. It has a `sketch-assistant` object property set in its `package.json`, with `title`, `description` and (optionally) `icon` string properties
1. It has a `sketch` string property set in its `package.json` pointing to a built, single-file bundle of your Assistant

> ℹ️ If you originally generated your Assistant from our [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) then everything should already be properly setup

### README recommendations

- Do not repeat your Assistant `title` and `description` at the top of your README file, since these will be rendered separately on [sketch.com](https://www.sketch.com)
- Your README file is a great place to document your Assistant rules and configuration options and explain your rationale
- Consider leaving out any developer-focussed information from your main README page, since the primary readers will likely be designers

### Categorization

In order to benefit from future improvements around Assistant discoverability and searching on [sketch.com](https://www.sketch.com) consider optionally adding one or more of the following [keywords](https://docs.npmjs.com/files/package.json#keywords) to your `package.json`.

```
guidelines
organization
accessibility
ios
mac
windows
web
android
```

## Updating Published Assistants

Sketch does not check if there are newer versions of your published Assistant on Npm, so it won't automatically prompt users to update Assistants added to documents.

If there's a newer version of an Assistant available, and you want to update a document to take advantage of it you'll need to re-add the Assistant to the document. Either via the _Assistants > Add from URL_ menu option, or add the Assistant again from [sketch.com](https://www.sketch.com).

## Self-hosting your Assistant

There is no hard requirement that your Assistant is hosted on Npm. As long as your Assistant package is hosted somewhere on the web, accessible to your intended audience, then it can added to Sketch documents and shared.

Reasons for self-hosting could include hosting a private Assistant within a company intranet, VPN or simply on an unguessable URL.

Running the following command in an Assistant generated with our [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) repository will yield a tarball file in the current working directory.

```
npm run package-tarball
```

Once this tarball is hosted somewhere of your choosing, then add the Assistant to a Sketch document via the _Assistants > Add from URL_ option.