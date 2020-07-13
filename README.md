# volto-venue

An addon for [Volto](https://github.com/plone/volto) as a frontend for collective.venue 

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.

## Setup with voltocli

```bash
voltocli
```

and insert `volto-venue` as addon name and `git@github.com:collective/volto-venue.git` as addon URL.

## Manual setup

In your Volto project:

```bash
yarn add mrs-developer collective/volto-venue
```

and in `package.json`:

```json
  "scripts": {
    "develop:npx": "npx -p mrs-developer missdev --config=jsconfig.json --output=addons",
    "develop": "missdev --config=jsconfig.json --output=addons",
    "preinstall": "if [ -f $(pwd)/node_modules/.bin/missdev ]; then yarn develop; else yarn develop:npx; fi",
    "postinstall": "yarn omelette",
    ...
  }
```

Create a `mrs.developer.json` file:

```json
{
  "volto-venue": {
    "url": "git@github.com:collective/volto-venue.git"
  }
}
```

In `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "volto-venue": ["addons/volto-venue"]
    },
    "baseUrl": "src"
  }
}
```

Fix tests, in `package.json`:

```json
"jest": {
    ...
    "moduleNameMapper": {
      "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
      "@package/(.*)$": "<rootDir>/src/$1",
      "volto-venue/(.*)$": "<rootDir>/src/addons/volto-venue/src/$1",
      "~/(.*)$": "<rootDir>/src/$1"
    },
    "testMatch": [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)",
      "!**/src/addons/volto/**/*"
    ],
    ...
```

Add `src/addons` in `.gitignore`:

```
# .gitignore
src/addons
```

Then, run `yarn` and install dependencies:

```bash
yarn
```

## Usage

`Document your addon here`
