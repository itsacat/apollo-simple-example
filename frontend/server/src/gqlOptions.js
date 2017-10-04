// let fetchPolicy = 'cache-first';
let fetchPolicy = 'cache-and-network';
// let fetchPolicy = 'network-only';

let gqlOptions = {options: {fetchPolicy: fetchPolicy}}; // TODO: кажется ssr true тут надо поставить?

export {gqlOptions, fetchPolicy};
