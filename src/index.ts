export type That<T> = {
  call: <Fn extends (this: T, ...args: any[]) => any>(
    fn: Fn,
    ...args: Parameters<Fn>
  ) => That<ReturnType<Fn>>;
  unwrap: () => T;
};

export function that<T>(x: T): That<T> {
  return {
    call,
    unwrap,
  };

  function call<Fn extends (this: T, ...args: any[]) => any>(
    fn: Fn,
    ...args: Parameters<Fn>
  ) {
    return that(fn.apply(x, args));
  }

  function unwrap(): T {
    return x;
  }
}
