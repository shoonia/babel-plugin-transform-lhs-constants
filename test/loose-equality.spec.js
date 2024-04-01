import { describe, it } from 'node:test';
import { expect } from './expect.js';

describe('loose equality', () => {
  it('should be transform string', async () => {
    await expect('typeof foo == "string"').toBeTransform('"string" == typeof foo;');
  });

  it('should be transform undefined', async () => {
    await expect('foo == undefined').toBeTransform('undefined == foo;');
  });
});
