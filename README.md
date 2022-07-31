# That
`that` is user-space implementation for `call-this`, inspired by [Call-this operator for JavaScript](https://github.com/tc39/proposal-call-this) proposal.

# Examples
```ts
function increment(this: number): number {
    return this + 1;
}

function add(this: number, another: number): number {
    return this + another;
}

that(8)
    .call(increment)
    .call(add, 5)
    .call(add, 9)
    .unwrap();
// => 23
```

# Installation
`that` is not published yet.