export type That<T> = {
  "~>": Call<T>;
  "|>": Call$<T>;
  unwrap: () => T;
};

type Call<T> = <Fn extends (this: T, ...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
) => That<ReturnType<Fn>>;

type Call$<T> = <Fn extends (x: T, ...args: any[]) => any>(
  fn: Fn,
  ...args: Tail<Parameters<Fn>>
) => That<ReturnType<Fn>>;

export function that<T>(x: T): That<T> {
  return {
    "~>": call,
    "|>": call$,
    unwrap,
  };

  function call<Fn extends (this: T, ...args: any[]) => any>(
    fn: Fn,
    ...args: Parameters<Fn>
  ) {
    return that(fn.apply(x, args));
  }

  function call$<Fn extends (x: T, ...args: any[]) => any>(
    fn: Fn,
    ...args: Tail<Parameters<Fn>>
  ) {
    return that(fn(x, ...args));
  }

  function unwrap(): T {
    return x;
  }
}

type Tail<A extends any[]> = A extends [infer _, ...infer Xs] ? Xs : never;
