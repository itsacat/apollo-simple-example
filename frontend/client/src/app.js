import React from 'react';
import {ApolloProvider} from 'react-apollo';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from './components/Layout';
import {createAndConfigureReduxStore} from './store/createAndConfigureReduxStore';
import {HttpLink} from 'apollo-link-http';
import {
    InMemoryCache,
} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {Provider} from 'react-redux';


const link = new HttpLink({
    uri: 'http://localhost:3001/graphql',
    credentials: 'same-origin',
    // headers: {'Content-Type': 'application/json'},
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link,
    ssrMode: true,
    cache: cache.restore(window.__APOLLO_STATE__),
    // ssrForceFetchDelay: 100,
    connectToDevTools: true
});

const devTools =
    (window && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ?
        window.__REDUX_DEVTOOLS_EXTENSION__() :
        f => f;

const store = createAndConfigureReduxStore(
    window.__REDUX_STATE__, devTools
);

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('content'),
);
