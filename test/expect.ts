import { strictEqual, fail } from 'node:assert/strict';
import { transformAsync } from '@babel/core';

// @ts-expect-error
import plugin from '../dist/index.cjs';

export const expect = <T>(source: T) => ({
  async toBeTransform(expected: T) {
    if (typeof source !== 'string') {
      return fail();
    }

    const result = await transformAsync(source, {
      plugins: [plugin],
      ast: false,
      babelrc: false,
      sourceMaps: false,
    });

    return strictEqual(result?.code, expected);
  },
});
