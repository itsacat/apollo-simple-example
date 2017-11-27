let actions = {
    login: (userId) => {
        return {
            type: 'LOGIN',
            payload: {userId}
        }
    },
    logout: () => {
        return {
            type: 'LOGOUT'
        }
    }
};

export {actions};
