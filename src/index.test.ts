import { that } from ".";

describe("that", () => {
  it("~>", () => {
    function f(this: string): boolean {
      return this.startsWith("a");
    }

    expect(that("abcde")["~>"](f).unwrap()).toBe(true);
    expect(that("fghij")["~>"](f).unwrap()).toBe(false);
  });

  describe("call with parameters", () => {
    it("1 parameter", () => {
      function f(this: string, l: number): boolean {
        return this.length === l;
      }

      expect(that("this")["~>"](f, 4).unwrap()).toBe(true);
      expect(that("this")["~>"](f, 5).unwrap()).toBe(false);
    });

    it("two parameters", () => {
      function f(this: number, op: string, another: number): number {
        if (op === "+") return this + another;
        if (op === "-") return this - another;
        throw new Error();
      }

      expect(that(5)["~>"](f, "+", 3).unwrap()).toBe(8);
      expect(that(7)["~>"](f, "-", 2).unwrap()).toBe(5);
    });
  });

  describe("|>", () => {
    it("just this", () => {
      expect(
        that("that")
          ["|>"](($) => $.replace("at", "is"))
          .unwrap()
      ).toBe("this");
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
          ["|>"](($) => Math.pow($, 2))
          .unwrap()
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
