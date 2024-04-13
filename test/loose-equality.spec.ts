import { describe, it } from 'node:test';
import { expect } from './expect.js';

describe('loose equality', () => {
  it('should be transform string', async () => {
    await expect('typeof foo == "string"').toBeTransform('"string" == typeof foo;');
  });

  it('should be transform undefined', async () => {
    await expect('foo == undefined').toBeTransform('undefined == foo;');
  });

  it('should be transform void 0', async () => {
    await expect('foo == void 0').toBeTransform('void 0 == foo;');
  });

  it('should be transform number', async () => {
    await expect('foo == 1').toBeTransform('1 == foo;');
  });

  it('should be transform big int', async () => {
    await expect('foo == 4n').toBeTransform('4n == foo;');
  });

  it('should be transform null', async () => {
    await expect('foo == null').toBeTransform('null == foo;');
  });

  it('should be transform boolean', async () => {
    await expect('foo == true').toBeTransform('true == foo;');
  });
});
