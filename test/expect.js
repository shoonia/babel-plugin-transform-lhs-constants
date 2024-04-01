import { strictEqual } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

import plugin from '../dist/index.cjs';

export const expect = (source) => ({
  async toBeTransform(expected) {
    const result = await transformAsync(source, {
      plugins: [plugin],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    return strictEqual(result?.code, expected);
  },
});
