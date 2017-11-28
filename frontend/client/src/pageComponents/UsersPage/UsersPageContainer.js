import React from 'react';
import {graphql, compose} from 'react-apollo';
import {gqlOptions} from '../../gqlOptions';
import {UsersPageView} from './UsersPageView';
import gql from 'graphql-tag';


const getUsers = gql`
    query getUsers {
        users {
            id
            name
            films {
                id
                name
            }
        }
    }
`;

let withUsersData = graphql(getUsers, gqlOptions);

const createUser = gql`
    mutation createUser($name: String!) {
        createUser(
            name: $name,
        ) {
            id
            name
            films {
                id
                name
            }
        }
    }
`;

let withCreateUser = graphql(
    createUser,
    {
        name: 'createUser',
        options: {
            optimisticResponse: {
                createUser: {
                    id: -1, // Fake id
                    name: 'TEST',//userName,
                    films: [],
                    __typename: 'User'
                },
            },
            update: (store, {data: {createUser}}) => {
                const data = store.readQuery({query: getUsers});

                data.users.push(createUser);
                store.writeQuery({query: getUsers, data});
            },
        }
    }
);

const UsersPageContainer = compose(
    withUsersData,
    withCreateUser,
)(UsersPageView);


export {UsersPageContainer};
