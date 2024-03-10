import { declare as declarePlugin } from '@babel/helper-plugin-utils';

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

  return {
    name: 'transform-remove-polyfill',
    visitor: {},
  };
});

export { plugin as default };
