# office-addin

Development tools for creating Office Add-ins on Windows and Mac.
`office-addin` aims to reduce a few particular pain points related to Office Add-in development:

1. Setup manifest for sideloading during development
2. Generating an Add-in manifest
3. Validating an Add-in manifest
4. Logging and error handling in Add-ins

## Installation

Install `office-addin` as a development dependency for your project.

```bash
npm install --save-dev office-addin
```

The most straight-forward way to call the `office-addin` command-line tools is from package.json scripts.
The following is an example `scripts` section of a project's package.json.

```json
{
  "scripts": {
    "setup": "office-addin setup",
    "generate": "office-addin generate",
    "validate": "office-addin validate"
  }
}
```

## Setup

Initial setup for an Office Add-in can be extensive,
`office-addin setup` aims to make it a straightforward, simple process.

```bash
# Windows: Run as administrator
npm run setup

# Mac
sudo npm run setup
```

Setup performs the following steps:

1. (Windows-only) Create `.addin-catalog` folder in User directory
2. (Windows-only) Share `.addin-catalog` for access from Office
3. Create symlink to Add-in manifest in catalog directory
4. Generate development https certificates and register as trusted CA
5. Instructions for loading add-in based on system type

Note: If manifest is generated after `setup` has been run initially,
`setup` will need to be run again to create symlink of manifest.

## Generate

`office-addin generate` is used to get you started with a valid Add-in manifest with required information completed. 
Additionally, it can be used to create matching manifests that handle differences between development and production.

## Validate

`office-addin validate` checks the project's manifest against Microsoft's Add-in schema
and verifies that the Add-in can be submitted to the Office Add-in Store.

## Logging

`office-addin` can be used to output `console.log` and `onerror` to the command line.
For logging, first install office-addin as a development dependency, `npm install --save-dev office-addin`
and use one of the following approaches:

Attach the logging server to an existing node https server (use this if you have access to the development server):

```js
const server = ...http/https.Server (e.g. connect, express, webpack dev server)

if (process.env.NODE_ENV !== 'production') {
  require('office-addin/server').attach(server);
}
```

If you don't have access to the development server, include `log.js` in your application and run logging server for development:

```html
<head>
  <!-- Include log.js before your js to catch compilation errors -->
  <script src="https://unpkg.com/office-addin"></script>
</head>
```

```json
{
  "scripts": {
    "start": "office-addin start"
  }
}
```

## Examples

For details on usage with Webpack, Gulp, create-react-app, and other environments, see the examples.
