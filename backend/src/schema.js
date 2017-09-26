const typeDefs = `
  type Query {
    users: [User]
    films: [Film]
    film(id: Int): Film
    user(id: Int): User
  }
  
  
  type User {
    id: ID!,
    name: String,
    films: [Film]
  }
  
  type Film {
    id: ID!,
    name: String,
    description: String,
    usersCount: Int,
    users: [User]
  }
`;

export {typeDefs};
