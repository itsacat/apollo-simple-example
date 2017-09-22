// let fetchPolicy = 'network-only';
let fetchPolicy = 'cache-and-network';
// let fetchPolicy = 'cache-first';
let gqlOptions = {options: {fetchPolicy: fetchPolicy}};

export {gqlOptions, fetchPolicy};
