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

// call-this
that(8)
    .call(increment)
    .call(add, 5)
    .call(add, 9)
    .unwrap();
// => 23

// method and property
that("Hello, world")
    .call$(($) => $.split(" ")) // that(["Hello,", "world"])
    .call$(($) => $.length) // that(2)
    .call(increment) // that(3)
    .unwrap()
// => 3

// Hack pipe
that(3)
    .call$(($) => Math.pow($, 2))
    .unwrap()
// => 9
```

# Installation
`that` is not published yet.