import { createStore, combineReducers, applyMiddleware, compose } from 'redux';


function createAndConfigureStore(client, initialState = {}) {
    const authorizationReducerInitialState = {
        authorizedUserId: 111111111111
    };

    function authorizationReducer(state = initialState, authorizationReducerInitialState) {
        return state;
    }


    const devTools =
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ?
            window.__REDUX_DEVTOOLS_EXTENSION__() :
            f => f;


    return createStore(
        combineReducers({
            authorization: authorizationReducer,
            apollo: client.reducer(),
        }),
        initialState,
        compose(
            applyMiddleware(client.middleware()),
            devTools
        )
    );
}

export {createAndConfigureStore};
