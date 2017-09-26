import React from 'react'

function Html({content, state}) {
    return (
        <html>
        <body>
        <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
        <script dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }}/>
        <script src='/static/clientBundle.js'/>
        </body>
        </html>
    );
}

export default Html