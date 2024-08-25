globalThis.wt = (function () {
  const tests = [];

  function isEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a === "object" && a !== null && b !== null) {
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!isEqual(a[i], b[i])) return false;
        }
        return true;
      } else {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        for (let key of keysA) {
          if (!isEqual(a[key], b[key])) return false;
        }
        return true;
      }
    }
    return false;
  }

  function expect(received) {
    return {
      toEqual(expected) {
        console.assert(isEqual(received, expected), 'Expect: %o, received: %o', expected, received);
        if (!isEqual(received, expected)) {
          throw new Error();
        }
      },
    };
  }

  function test(name, fn) {
    tests.push({ name, fn });
  }

  function reset() {
    tests.splice(0);
  }

  function runTests() {
    let passed = 0;
    let failed = 0;
    tests.forEach((t) => {
      try {
        t.fn();
        console.log(`%c${t.name}: Passed`, "color: green;");
        passed++;
      } catch (e) {
        console.error(`%c${t.name}: Failed`, "color: red;");
        failed++;
      }
    });
    console.log(`Total: ${tests.length}, Passed: ${passed}, Failed: ${failed}`);
  }

  return {
    test,
    reset,
    expect,
    runTests,
  };
})();
