---
title: Publish Assistants
section: assistants
permalink: /assistants/publish
chapter: Guides
order: 105
excerpt: Publishing Sketch Assistants.
---

Publish your Assistant so it can be downloaded automatically whenever a document using it is opened with Sketch. Opt in to be included on the [Sketch Assistant directory](https://sketch.com/extensions/assistants).

We recommend publishing to [npm](https://www.npmjs.com) as this makes your Assistant package easily accessible to others and requires only some addition metadata to get listed on the Assistant directly. However, self-hosting your Assistant is also an option.

## Publish to npm

Below is a list of steps to publish your Assistant to npm. For more information on publishing JavaScript packages see the [documentation](https://docs.npmjs.com/packages-and-modules).

> **Note:** You'll need a free npm account to publish to the npm registry.

1. Ensure you are logged-in to npm on the command line via `npm login`.
1. Update your Assistant code as needed, implement any rules you want to and ensure any tests are passing.
1. Ensure the `name` field in package.json has been set to a valid, unique npm package name.
1. Ensure the `version` field in package.json is updated to reflect the version you want to publish.
1. Run the build process for your Assistant.
1. Run `npm publish`. Your Assistant package should now be live 🎉

To confirm the package has been published successfully, request the metadata running the following command:

```sh
npm info <your-package-name>
```

Add your npm Assistant to a Sketch document by copy and pasting the `tarball` value from the above output and adding it to a Sketch document via the ⚙️ › _Add from URL…_ option within the _Manage Assistants…_ sheet for your document.

A Sketch document configured with a published Assistant is truly portable - other users will be prompted to install the exact same Assistant package when they open the document.

## Self-hosting

There is no strict requirement that your Assistant is published to npm. As long as your Assistant package is hosted somewhere on the web, accessible to your intended audience, it can be added to Sketch documents and shared.

Running the following command in an Assistant generated with our [Sketch Assistant Template](https://github.com/sketch-hq/sketch-assistant-template) repository creates a `.tgz` archive in the current working directory.

```
npm run package-tarball
```

Once the resulting `.tgz` archive is uploaded, add the Assistant to a Sketch document via the ⚙️ › _Add from URL…_ option within the _Manage Assistants…_ sheet for your document.

## Update published Assistants

Sketch does not check if there are newer versions of your published Assistant, so it won't automatically prompt users to update Assistants added to documents.

If there's a newer version of an Assistant available, and you want to update a document to take advantage of it you'll need to re-add the Assistant to that document. Either via the ⚙️ › _Add from Archive…_ option within the _Manage Assistants…_ sheet for your document, or add the Assistant again from [sketch.com](https://www.sketch.com).

## Sketch Assistant directory

Including your Assistant in the directory makes it more discoverable for Sketch users and is directly accessible through the _Find Assistants…_ menu item in Sketch.

1. **One-click [_Add to Sketch_](/assistants/one-click-add) button to add an Assistant to the current document**
1. **Assistants are organised by pre-defined categories**
1. **Detail page generated from the Assistant's `README.md` documentation**

### Checklist

Use the following checklist to get your Assistant included in the Sketch Assistant directory.

<!-- prettier-ignore -->
> #### Include correct metadata in `package.json`
>
> - Version number, must be `1.0.0` or greater
> - Relative path pointing to a built, single-file bundle of your Assistant, e.g. `dist/sketch.js`
> - Values for display title, description and icon in `sketch-assistant`.
>   
>   ```
>   "sketch-assistant": {
>     "title": "Naming Conventions",
>     "description": "Naming conventions used by the Sketch design team",
>     "icon": "https://user-images.githubusercontent.com/1078571/81808046-0a6e2b00-9517-11ea-9b6c-1c6fa9a377ba.png"
>   }
>   ```
> - Link to the Assistant documentation in [homepage](https://docs.npmjs.com/files/package.json#homepage).
>   This can be your own website or the Assistants directory detail using the following URL format:
>
>   ```
>   https://sketch.com/extensions/assistants/{assistant-package-name}`
>   ```
>   See [_Tidy_](https://sketch.com/extensions/assistants/@sketch-hq/sketch-tidy-assistant/) for reference
> - [Author](https://docs.npmjs.com/files/package.json#people-fields-author-contributors) object, containing at least a `name` string. It is recommended to include an email address for support.
> - [Keywords](https://docs.npmjs.com/files/package.json#keywords) `sketch assistant` and `public` to opt in to be indexed by the Assistant directory, see [full list](#pre-defined-categories)
>
> #### Prepare documentation in `README.md`
>
> - Do not include _Add to Sketch_ links or buttons
> - Document rule and configuration choices
>
> #### Publish to npm
>
> - Publish to npm as described above
> - Confirm the Assistant appears in the search results for the [`sketch-assistant` and `public` keywords](https://www.npmjs.com/search?q=keywords%3Asketch%20assistant%2Cpublic). Please note, it can take a while until it is included in the results.
{: class="assistants-checklist"}

### `README.md` best practices

The `README.md` Markdown contents are used to generate the Assistant's directory detail page.

- Do not start with the title or description used in `package.json`, start with a summary of the rules the Assistant contains and why.
- Do not include the Assistant icon.
- Document what each rule does.
- Provide examples of do's and don'ts, with images if helpful.
- Use HTML fragment identifiers for each rule following the `{assistant-package-name}/{rule-name}` convention. This is used by Sketch to link to detailed rule documentation, e.g. any Assistant using the [`groups-max-layers`](https://github.com/sketch-hq/sketch-assistants/tree/main/assistants/core/src/rules/groups-max-layers) rule.

  ```
  <h1 id="@sketch-hq/sketch-core-assistant/groups-max-layers">Groups should contain no more than 10 layers</h1>
  ```

### Pre-defined categories

To make it easier to find the right Assistant, the directory uses a set of predefined categories. Consider assigning your Assistant one or more of the below category [keywords](https://docs.npmjs.com/files/package.json#keywords). The first of these keywords specified in the array will be used as your Assistant's primary category.

- `guidelines`
- `organization`
- `accessibility`
- `ios`
- `mac`
- `windows`
- `web`
- `android`
