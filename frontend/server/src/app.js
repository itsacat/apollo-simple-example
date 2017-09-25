import ReactDOMServer from 'react-dom/server'
import {getDataFromTree} from "react-apollo"
import {
    ApolloClient,
    createNetworkInterface,
    ApolloProvider
} from 'react-apollo';
import Express from 'express';
import {StaticRouter} from 'react-router';
import Layout from './Layout';
import Html from './html';
import React from 'react'
import fetch from 'node-fetch'

global.fetch = fetch;

const serverApp = new Express();

serverApp.get('/', main);
serverApp.get('/films', main);

function main(req, res) {
    console.log('');
    console.log('');
    console.log('=======================================');
    console.log('Frontick request');

    const networkInterface = createAndConfigureNetworkInterface(req);
    const apolloClient = createAndConfigureApollo(networkInterface);
    const clientApp = createAndConfigureClientApp(req, apolloClient);

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

        const initialState = {'apollo': apolloClient.getInitialState()};
        const html = <Html content={content} state={initialState}/>;
        res.status(200);
        res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
        res.end();
    });
}

serverApp.use('/static', Express.static('public'));

function createAndConfigureNetworkInterface(req) {
    let networkInterface = createNetworkInterface({
        uri: 'http://localhost:3001/graphql',
        opts: {
            credentials: 'same-origin',
            headers: {
                cookie: req.header('Cookie'),
            },
        },
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

    return networkInterface;
}

function createAndConfigureApollo(networkInterface) {
    return new ApolloClient({
        ssrMode: true,
        networkInterface: networkInterface
    });
}

function createAndConfigureClientApp(req, apolloClient) {
    const context = {};

    return (
        <ApolloProvider client={apolloClient}>
            <StaticRouter location={req.url} context={context}>
                <Layout/>
            </StaticRouter>
        </ApolloProvider>
    );
}

serverApp.listen(3000, () => console.log(
    `App Server is now running on http://localhost:3000`
));
