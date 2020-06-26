# developer.sketch.com

This is the respository for the [developer.sketch.com](https://developer.sketch.com) website. This content was previously available in the [SketchAPI](https://github.com/sketch-hq/SketchAPI) repository.

We welcome contributions to this respository, so if there's something you want to change or fix feel free to open an issue or pull request.

## Development

This website is built using [Jekyll](https://jekyllrb.com).

### Deployment

Pull request and merge to the `main` branch to deploy to Netlify.

### Running locally

Avoid dealing with Ruby on your local operating system and interact with the site locally with [Docker](https://docs.docker.com/get-docker/).

#### Serve

Builds the site and serves it on `http://0.0.0.0:4000`.

```
./serve.sh
```

#### Build

Builds the site to the `_site` folder.

```
./build.sh
```