import { strictEqual, fail } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

import plugin from '../src/index.ts';

export const expect = <T>(source: T) => ({
  async toBeTransform(expected: T) {
    if (typeof source !== 'string') {
      return fail();
    }

    const result = await transformAsync(source, {
      plugins: [plugin],
      ast: false,
      babelrc: false,
      configFile: false,
      sourceMaps: false,
      comments: false,
    });

    return strictEqual(result?.code, expected);
  },
});
