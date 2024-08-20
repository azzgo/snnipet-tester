require("./tester");

wt.test("1+1 is 2", () => {
  wt.expect(1 + 1).toEqual(3);
});

wt.test("a + b is ab", () => {
  wt.expect('a' + 'b').toEqual('abc');
});

wt.test("array compare", () => {
  wt.expect([1,2,3]).toEqual([1,4,3])
});
wt.test("object compare", () => {
  wt.expect({
    user: 'alice'
  }).toEqual({
    user: 'bob'
  })
});

wt.runTests();
