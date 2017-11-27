import 'babel-polyfill';
import ReactDOMServer from 'react-dom/server'
import {getDataFromTree} from "react-apollo"
import {ApolloProvider} from 'react-apollo';
import Express from 'express';
import {StaticRouter} from 'react-router';
import {Layout} from '../../client/src/components/Layout';
import Html from './html';
import React from 'react'
import fetch from 'node-fetch'
import {createAndConfigureReduxStore}
    from "../../client/src/store/createAndConfigureReduxStore";

import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Provider} from 'react-redux';


global.fetch = fetch;

const serverApp = new Express();

serverApp.get('/', main);
serverApp.get('/films', main);
serverApp.get('/film/:id', main);
serverApp.get('/user/:id', main);

function main(req, res) {
    console.log('');
    console.log('');
    console.log('=======================================');
    console.log('Frontick request');

    // const networkInterface = createAndConfigureNetworkInterface(req);
    const apolloClient = createAndConfigureApollo(req);
    const reduxStore = createAndConfigureReduxStore();
    const clientApp = createAndConfigureClientApp(req, apolloClient, reduxStore);

    console.log('getDataFromTree start');
    // console.time('getDataFromTree');
    getDataFromTree(clientApp).then(() => {
        console.log('getDataFromTree finish');
        // console.timeEnd('getDataFromTree');

        console.log('renderToString start');
        // console.time('renderToString');
        const content = ReactDOMServer.renderToString(clientApp);
        console.log('renderToString finish');
        // console.timeEnd('renderToString');

        const initialApolloState = apolloClient.cache.extract();
        const initialReduxState = reduxStore.getState();

        const html = <Html content={content}
                           initialApolloState={initialApolloState}
                           initialReduxState={initialReduxState}/>;
        res.status(200);
        res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
        res.end();
    });
}

serverApp.use('/static', Express.static('public'));


function createAndConfigureApollo(req) {
    const link = new HttpLink({
        uri: 'http://localhost:3001/graphql',
        credentials: 'same-origin',
        headers: {
            cookie: req.header('Cookie'),
        },
    });

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
        ssrMode: true
    });
}

function createAndConfigureClientApp(req, apolloClient, reduxStore) {
    const context = {};


    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={reduxStore}>
                <StaticRouter location={req.url} context={context}>
                    <Layout/>
                </StaticRouter>
            </Provider>
        </ApolloProvider>
    );
}

serverApp.listen(3000, () => console.log(
    `App Server is now running on http://localhost:3000`
));
