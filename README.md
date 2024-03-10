# babel-plugin-transform-lhs-constants

[![CI](https://github.com/shoonia/babel-plugin-transform-lhs-constants/actions/workflows/ci.yml/badge.svg)](https://github.com/shoonia/babel-plugin-transform-lhs-constants/actions/workflows/ci.yml)

The [Babel](https://babeljs.io/) plugin to move constant values to the left-hand side of binary nodes.

```diff
- typeof foo === 'string'
+ 'string' === typeof foo
```

## Install

```bash
npm i babel-plugin-transform-lhs-constants -D
# or
yarn add babel-plugin-transform-lhs-constants -D
```

## License
[MIT](./LICENSE)
