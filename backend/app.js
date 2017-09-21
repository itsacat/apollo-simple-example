import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress} from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import lodash from 'lodash';
import cors from 'cors';

const typeDefs = `
  type Post {
    id: Int
    description: String
    nextId: Int
  }
  
  type Query {
    post(id: Int): Post
  }
`;


const posts = [
    {id: 0, description: 'One', nextId: 1},
    {id: 1, description: 'Two', nextId: 'rnd'},
    {id: 2, description: 'Three'},
    {id: 3, description: 'Four'},
    {id: 4, description: 'Five'},
];

const resolvers = {
    Query: {
        post: (obj, args, context, info) => {
            console.log('Request', args.id);

            return new Promise((resolve) => {
                setTimeout(() => {
                    let post = posts[args.id];
                    if (post.nextId === 'rnd') {
                        resolve({
                            id: post.id,
                            description: post.description,
                            nextId: lodash.random(2, 3)
                        });
                    } else {
                        resolve(post);
                    }
                }, 0);
            });
        }
    }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 3001;

const app = express().use('*', cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({schema: schema}));

app.listen(PORT, () => console.log(
    `App Server is now running on http://localhost:3001`
));
