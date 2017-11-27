const initialState = {
    authorizedUserId: null
};

function authorizationReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {...state, authorizedUserId: action.payload.userId};
        case 'LOGOUT':
            return {...state, authorizedUserId: null};
        default:
            return state;
    }
}

export {authorizationReducer};
