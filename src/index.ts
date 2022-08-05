export type That<T> = {
  "~>": CallThis<T>;
  "|>": Pipe<T>;
  "?~>": MaybeCallThis<T>;
  "?|>": MaybePipe<T>;
  ";":  T;
};

export function that<T>(x: T): That<T> {
  return {
    "~>": callThis,
    "|>": pipe,
    "?~>": maybeCallThis,
    "?|>": maybePipe,
    ";": x,
  };

  function callThis<Fn extends FnThis<T>>(
    fn: Fn,
    ...args: Parameters<Fn>
  ) {
    return that(fn.apply(x, args));
  }

  function pipe<Fn extends (x: T, ...args: any[]) => any>(
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

type CallThis<T> = <Fn extends FnThis<T>>(
  fn: Fn,
  ...args: Parameters<Fn>
) => That<ReturnType<Fn>>;

type Pipe<T> = <Fn extends Func<T>>(
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