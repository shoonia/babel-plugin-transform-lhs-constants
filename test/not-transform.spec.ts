import { describe, it } from 'node:test';
import { expect } from './expect.js';

describe('no transfrom', () => {
  const list = [
    'one == two;',
    'one() == two();',
    'undefined != null;',
    'true == null;',
    '"hello" == 1n;',
  ];

  list.forEach((code) => {
    it(code, async () => {
      await expect(code).toBeTransform(code);
    });
  })
});
