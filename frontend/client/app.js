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
    opts: {
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
    }
});


networkInterface.use([{
    applyMiddleware(req, next) {
        // console.log('');
        // console.log('===COMPONENT===');
        // console.log('Middleware. request:');
        // console.log(req);
        // console.log('');
        next();
    }
}]);

networkInterface.useAfter([{
    applyAfterware(response, next) {
        // console.log('Afterware. response:');
        // console.log(response.response.json);
        // console.log('');
        next();
    }
}]);

const client = new ApolloClient({
    networkInterface,
    ssrMode: true,
    initialState: window.__APOLLO_STATE__,
    // ssrForceFetchDelay: 100,
    connectToDevTools: true
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('content'),
);
