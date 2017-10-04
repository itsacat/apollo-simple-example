import lodash from 'lodash';

import {User, Film} from './connectors';


const resolvers = {
    Query: {
        users: queryUsers,
        films: queryFilms,
        film: queryFilm,
        user: queryUser
    },
    Mutation: {
        createUser: createUser
    },
    User: getUser(),
    Film: getFilm()
};

function queryUsers(obj, args, context, info) {
    return User.findAll();
}

function queryFilms(obj, args, context, info) {
    return Film.findAll();
}

function queryFilm(obj, args, context, info) {
    return Film.findById(args.id);
}

function queryUser(obj, args, context, info) {
    return User.findById(args.id);
}

function getUser() {
    return {
        films(user){
            return user.getFilms();
        }
    };
}

function getFilm() {
    // Если запросить users и usersCount, то film.getUsers() вызовится 2 раза.
    // Так, что надо аккуратно писать эти штуки.
    return {
        users(film) {
            return film.getUsers();
        },
        async usersCount(film) {
            let users = await film.getUsers();
            return users.length;
        }
    };
}

function createUser(root, args) {
    return User.create(args);
}


export {resolvers};
