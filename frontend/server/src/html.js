import React from 'react'

function Html({content, initialApolloState, initialReduxState}) {
    const apolloState = JSON.stringify(initialApolloState).replace(/</g, '\\u003c');
    const reduxState = JSON.stringify(initialReduxState).replace(/</g, '\\u003c');

    return (
        <html>
        <body>
        <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
        <script dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${apolloState};`,
        }}/>
        <script dangerouslySetInnerHTML={{
            __html: `window.__REDUX_STATE__=${reduxState};`,
        }}/>
        <script src='/static/clientBundle.js'/>
        </body>
        </html>
    );
}

export default Html;
