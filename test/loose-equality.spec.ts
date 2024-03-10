describe('loose equality', () => {
  it('should be transform string', async () => {
    expect.hasAssertions();

    await expect('typeof foo == "string"').toBeTransform('"string" == typeof foo;');
  });

  it('should be transform undefined', async () => {
    expect.hasAssertions();

    await expect('foo == undefined').toBeTransform('undefined == foo;');
  });
});
