// let fetchPolicy = 'network-only';
let fetchPolicy = 'cache-and-network';
// let fetchPolicy = 'cache-first';
let gqlOptions = {options: {fetchPolicy: fetchPolicy}}; // TODO: кажется ssr true тут надо поставить?

export {gqlOptions, fetchPolicy};
