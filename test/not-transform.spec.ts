import { describe, it } from 'node:test';
import { expect } from './expect.ts';

describe('no transfrom', () => {
  const list = [
    'one == two;',
    'one() == two();',
    'undefined != null;',
    'true == null;',
    '"hello" == 1n;',
    'null != void 0;'
  ];

  list.forEach((code) => {
    it(code, async () => {
      await expect(code).toBeTransform(code);
    });
  })
});
