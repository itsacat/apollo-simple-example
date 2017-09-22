import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress} from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import lodash from 'lodash';
import cors from 'cors';

import {typeDefs} from './schema';
import {resolvers} from './resolvers';


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
