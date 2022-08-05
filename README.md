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
    ['~>'](add, 9)[';'];
// => 23

// Hack pipe
that('Hello, world!')
    ['|>'](($) => $.split(" "))
    ['|>'](($) => $.length)
    ['|>'](($) => Math.pow(3, $))[';'];
// => 9

// Optional chain
that([1, 2, 3, 4])
    ['|>'](($) => $.find((x) => x < 0))
    ['?|>'](($) => $ + 2)[';'];
// => undefined
```

# Installation
`that` is not published yet.