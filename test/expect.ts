import { strictEqual } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

import plugin from '../src/index.js';

export const expect = (source: string) => ({
  async toBeTransform(expected: string) {
    const result = await transformAsync(source, {
      plugins: [plugin],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    return strictEqual(result?.code, expected);
  },
});
