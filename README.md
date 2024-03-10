# babel-plugin-transform-lhs-constants

[![CI](https://github.com/shoonia/babel-plugin-transform-lhs-constants/actions/workflows/ci.yml/badge.svg)](https://github.com/shoonia/babel-plugin-transform-lhs-constants/actions/workflows/ci.yml)

The [Babel](https://babeljs.io/) plugin to move constant values to the left-hand side of binary nodes.

## Example

```diff
- typeof foo === "string"
+ "string" === typeof foo
```

## Install

Using npm:

```bash
npm i -D babel-plugin-transform-lhs-constants
```
or using yarn:

```bash
yarn add babel-plugin-transform-lhs-constants -D
```

## Usage

With a configuration file [`babel.config.json`](https://babel.dev/docs/config-files#project-wide-configuration)

```json
{
  "plugins": ["babel-plugin-transform-lhs-constants"]
}
```

## License
[MIT](./LICENSE)
