describe('strict equality', () => {
  it('should be transform #1', async () => {
    expect.hasAssertions();

    await expect('typeof foo === "string"').toBeTransform('"string" === typeof foo;')
  })
});
