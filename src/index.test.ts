import {  that } from ".";

describe("that", () => {
  it("call", () => {
    function f(this: string): boolean {
      return this.startsWith("a");
    }

    expect(that("abcde").call(f).unwrap()).toBe(true);
    expect(that("fghij").call(f).unwrap()).toBe(false);
  });

  describe("call with parameters", () => {
    it("1 parameter", () => {
      function f(this: string, l: number): boolean {
        return this.length === l;
      }

      expect(that("this").call(f, 4).unwrap()).toBe(true);
      expect(that("this").call(f, 5).unwrap()).toBe(false);
    });

    it("two parameters", () => {
      function f(this: number, op: string, another: number): number {
        if (op === "+") return this + another;
        if (op === "-") return this - another;
        throw new Error();
      }

      expect(that(5).call(f, "+", 3).unwrap()).toBe(8);
      expect(that(7).call(f, "-", 2).unwrap()).toBe(5);
    });
  });

  describe("call$", () => {
    it("just this", () => {
      expect(
        that("that")
          .call$(($) => $.replace("at", "is"))
          .unwrap()
      ).toBe("this");
    });
  });

  it.skip("types", () => {
    function f(this: string) {
      return null;
    }
    // @ts-expect-error
    that(1).call(f).unwrap();

    function g(this: string, another: number) {
      return null;
    }
    // @ts-expect-error
    that("that").call(g).unwrap();
  });
});
