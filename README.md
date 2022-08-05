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

// call-this operator
that(8)
    ['~>'](increment)
    ['~>'](add, 5)
    ['~>'](add, 9)
    .unwrap();
// => 23

// Hack pipe
that(3)
    ['|>'](($) => Math.pow($, 2))
    .unwrap()
// => 9
```

# Installation
`that` is not published yet.