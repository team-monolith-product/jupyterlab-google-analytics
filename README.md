# jupyterlab_google_analytics

[![Github Actions Status](https://github.com/team-monolith-product/jupyterlab-google-analytics/workflows/Build/badge.svg)](https://github.com/team-monolith-product/jupyterlab-google-analytics/actions/workflows/build.yml)
A JupyterLab extension.

## Requirements

- JupyterLab >= 3.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_google_analytics
```

## GA Tracking ID

We are using [jupyter lab extension settings](https://github.com/jupyterlab/extension-examples/tree/master/settings) for GA Tracking ID.
After installation, you can find that `jupyterlab-google-analytics` settings are available in advanced settings.
However, this setting is only applied to the user who set this value manually.
In most cases, you might want all your users to be reported to GA.
![image](https://user-images.githubusercontent.com/4434752/227094000-269122b5-76ea-41b4-b86a-59c7c0f12212.png)

We are using [overrides.json](https://jupyterlab.readthedocs.io/en/stable/user/directories.html#overrides-json). This file can be installed to your node or docker image to change users' default settings.

`/<project>/Dockerfile`
``` 
# Choose version whatever you want
FROM jupyter/base-notebook:lab-3.2.9 as base

COPY overrides.json ${CONDA_DIR}/share/jupyter/lab/settings/overrides.json

# ...
```

`/<project>/overrides.json`
```
{
  "jupyterlab-google-analytics:plugin": {
    "trackingId": "G-SOMETRACKINGID"
  }
}
```



## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_google_analytics
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_google_analytics directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_google_analytics
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-google-analytics` within that folder.

### Testing the extension

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro/) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
