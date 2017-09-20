import React from 'react';
import {
    createNetworkInterface,
    ApolloProvider,
    ApolloClient
} from 'react-apollo';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Layout from './../server/src/Layout';


const networkInterface = createNetworkInterface({
    uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
    networkInterface,
    initialState: window.__APOLLO_STATE__
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('content'),
);
