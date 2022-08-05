export type That<T> = {
  "~>": Call<T>;
  "|>": Call$<T>;
  "?~>": MaybeCallThis<T>;
  "?|>": MaybePipe<T>;
  ";":  T;
};

export function that<T>(x: T): That<T> {
  return {
    "~>": call,
    "|>": call$,
    "?~>": maybeCallThis,
    "?|>": maybePipe,
    ";": x,
  };

  function call<Fn extends FnThis<T>>(
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

  function maybeCallThis<Fn extends FnThis<Must<T>>>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): That<Maybe<ReturnType<Fn>>> {
    if (x === null) return that(null);
    if (x === undefined) return that(undefined);
    return that<ReturnType<Fn>>(fn.apply(x as Must<T>, args));
  }

  function maybePipe<Fn extends Func<Must<T>>>(
    fn: Fn,
    ...args: Tail<Parameters<Fn>>
  ): That<Maybe<ReturnType<Fn>>> {
    if (x===null) return that(null);
    if (x ===undefined) return that(undefined);
    return that<ReturnType<Fn>>(fn(x as Must<T>, ...args));
  }
}

type Call<T> = <Fn extends FnThis<T>>(
  fn: Fn,
  ...args: Parameters<Fn>
) => That<ReturnType<Fn>>;

type Call$<T> = <Fn extends Func<T>>(
  fn: Fn,
  ...args: Tail<Parameters<Fn>>
) => That<ReturnType<Fn>>;

type MaybeCallThis<T> = <Fn extends FnThis<Must<T>>>(
    fn: Fn,
    ...args: Parameters<Fn>
) => That<Maybe<ReturnType<Fn>>>;

type MaybePipe<T> = <Fn extends Func<Must<T>>>(
    fn: Fn,
    ...args: Tail<Parameters<Fn>>
) => That<Maybe<ReturnType<Fn>>>

type Tail<A extends any[]> = A extends [infer _, ...infer Xs] ? Xs : never;

type Must<T> = Exclude<T, Empty>
type Maybe<T> = T | Empty;
type Empty = null | undefined;

type FnThis<in T> = (this: T, ...args: any[]) => any;
type Func<in T> = (x: T, ...args: any[]) => any;