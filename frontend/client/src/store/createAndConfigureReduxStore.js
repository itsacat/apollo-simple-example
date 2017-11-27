import {createStore, combineReducers, compose} from 'redux';
import {authorizationReducer} from './reducers';

function createAndConfigureReduxStore(initialState = {}, devTools = f => f) {
    return createStore(
        combineReducers({
            authorization: authorizationReducer,
        }),
        initialState,
        compose(
            devTools
        )
    );
}

export {createAndConfigureReduxStore};
