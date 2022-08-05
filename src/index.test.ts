import { that } from ".";

describe("that", () => {
  it("~>", () => {
    function f(this: string): boolean {
      return this.startsWith("a");
    }

    expect(that("abcde")["~>"](f)[";"]).toBe(true);
    expect(that("fghij")["~>"](f)[";"]).toBe(false);
  });

  describe("call with parameters", () => {
    it("1 parameter", () => {
      function f(this: string, l: number): boolean {
        return this.length === l;
      }

      expect(that("this")["~>"](f, 4)[";"]).toBe(true);
      expect(that("this")["~>"](f, 5)[";"]).toBe(false);
    });

    it("two parameters", () => {
      function f(this: number, op: string, another: number): number {
        if (op === "+") return this + another;
        if (op === "-") return this - another;
        throw new Error();
      }

      expect(that(5)["~>"](f, "+", 3)[";"]).toBe(8);
      expect(that(7)["~>"](f, "-", 2)[";"]).toBe(5);
    });
  });

  describe("|>", () => {
    it("just this", () => {
      expect(that("that")["|>"](($) => $.replace("at", "is"))[";"]).toBe(
        "this"
      );
    });

    it("place holder", () => {
      expect(
        that({
          a: "a",
          b: 1,
          c: null,
        })
          ["|>"](Object.keys)
          ["|>"](($) => $.length)
          ["|>"](($) => Math.pow($, 2))[";"]
      ).toBe(9);
    });
  });

  it.skip("types", () => {
    function f(this: string) {
      return null;
    }
    // @ts-expect-error
    that(1)["~>"](f).unwrap();

    function g(this: string, another: number) {
      return null;
    }
    // @ts-expect-error
    that("that")["~>"](g).unwrap();
  });
});
