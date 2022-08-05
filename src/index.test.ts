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

  describe("?~>", () => {
    function oddIsNull(this: number) {
      if (this % 2 === 1) return null;
      return this;
    }
    function add(this: number, another: number) {
      return this + another;
    }

    it("exists", () => {
      expect(that(4)["~>"](oddIsNull)["?~>"](add, 3)["?~>"](add, 1)[";"]).toBe(
        8
      );
    });

    it("null", () => {
      expect(that(1)["~>"](oddIsNull)["?~>"](add, 3)["?~>"](add, 1)[";"]).toBe(
        null
      );
    });

    it("undefined", () => {
      expect(that<number | undefined>(undefined)["?~>"](add, 3)[";"]).toBe(
        undefined
      );
    });
  });

  describe("?|>", () => {
    it("exists", () => {
      expect(
        that([0, 1, 2, 3, 4])
          ["|>"](($) => $.find((x) => x % 3 === 2))
          ["?|>"](($) => $ * 4)[";"]
      ).toBe(8);
    });

    it("undefined", () => {
      expect(
        that([0, 1, 3, 4])
          ["|>"](($) => $.find((x) => x % 3 === 2))
          ["?|>"](($) => $ * 4)[";"]
      ).toBe(undefined);
    });

    it("null", () => {
      expect(that<string | null>(null)["?|>"](($) => $.length)[";"]).toBe(null);
    });
  });

  it.skip("types", () => {
    function f(this: string) {
      return null;
    }
    // @ts-expect-error
    that(1)["~>"](f)[";"];

    function g(this: string, another: number) {
      return null;
    }
    // @ts-expect-error
    that("that")["~>"](g)[";"];
  });
});
