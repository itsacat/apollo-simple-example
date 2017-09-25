const typeDefs = `
  type Query {
    post(id: Int): Post
    users: [User]
    films: [Film]
  }
  
  
  type User {
    id: ID!,
    name: String,
    films: [Film]
  }
  
  type Film {
    id: ID!,
    name: String,
    usersCount: Int,
    users: [User]
  }
  
  type Post {
    id: Int
    description: String
    nextId: Int
  }
`;

export {typeDefs};
