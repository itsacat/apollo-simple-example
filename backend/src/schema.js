const typeDefs = `
  type Query {
    post(id: Int): Post
    users: [User]
  }
  
  
  type User {
    id: ID!,
    name: String,
    films: [Film]
  }
  
  type Film {
    id: ID!,
    name: String,
    users: [User]
  }
  
  type Post {
    id: Int
    description: String
    nextId: Int
  }
`;

export {typeDefs};
