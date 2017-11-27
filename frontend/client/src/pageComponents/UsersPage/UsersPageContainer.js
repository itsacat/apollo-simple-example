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

                // Добавление films - это грязный хак. Без него всё рушится. Надо понять почему.
                createUser.films = [];

                data.users.push(createUser);
                store.writeQuery({query: getUsers, data});
            },
        }
    }
);


// const withCreateUser = graphql(createUser, {
//     props: ({ownProps, mutate}) => ({
//         submit({name}) {
//             return mutate({
//                 variables: {name},
//                 optimisticResponse: {
//                     __typename: 'Mutation',
//                     createUser: {
// //                     id: -1, // Fake id
// //                     name: 'TEST',//userName,
// //                     films: [],
// //                     __typename: 'User'
//
//
//                         id: -1, // Fake id
//                         name: 'TEST',//userName,
//                         films: [],
//                         __typename: 'User'
//                     },
//                 },
//             });
//         },
//     }),
// });



// let withCreateUser = graphql(
//     createUser,
//     {
//         name: 'createUser',
//
//
//         props: ({ownProps, mutate}) => ({
//
//             submit: ({name}) => mutate({
//
//                 optimisticResponse: {
//                     createUser: {
//                         id: -1, // Fake id
//                         name: 'TEST',//userName,
//                         films: [],
//                         __typename: 'User'
//                     },
//                 },
//                 update: (store, {data: {createUser}}) => {
//                     const data = store.readQuery({query: getUsers});
//
//                     // Добавление films - это грязный хак. Без него всё рушится. Надо понять почему.
//                     createUser.films = [];
//
//                     data.users.push(createUser);
//                     store.writeQuery({query: getUsers, data});
//                 },
//
//             }),
//         }),
//
//
//         // options: {
//         // }
//     }
// );

/*
const CommentPageWithData = graphql(
    submitComment,
    {
        props: ({ownProps, mutate}) => ({
            submit: ({repoFullName, commentContent}) => mutate({
                variables: {repoFullName, commentContent},
                optimisticResponse: {
                    __typename: 'Mutation',
                    submitComment: {
                        __typename: 'Comment',
                        postedBy: ownProps.currentUser,
                        createdAt: +new Date,
                        content: commentContent,
                    },
                },
            }),
        }),
    }
)(CommentPage);
*/








// let withCreateUser = graphql(
//     createUser,
//     {
//         props: ({ ownProps, mutate }) => ({
//             submit({ name }) {
//                 return mutate({
//                     // name: 'createUser',
//                     // options: {
//                         optimisticResponse: {
//                             createUser: {
//                                 id: -1, // Fake id
//                                 name: 'TEST',//userName,
//                                 films: [],
//                                 __typename: 'User'
//                             },
//                         },
//                         update: (store, {data: {createUser}}) => {
//                             const data = store.readQuery({query: getUsers});
//
//                             // Добавление films - это грязный хак. Без него всё рушится. Надо понять почему.
//                             createUser.films = [];
//
//                             data.users.push(createUser);
//                             store.writeQuery({query: getUsers, data});
//                         },
//                     // }
//                 });
//
//             },
//         }),
//     }
// );

// const CommentPageWithData = graphql(updateComment, {
//   props: ({ ownProps, mutate }) => ({
//     submit({ commentId, commentContent }) {
//       return mutate({
//         variables: { commentId, commentContent },
//         optimisticResponse: {
//           __typename: 'Mutation',
//           updateComment: {
//             id: commentId,
//             __typename: 'Comment',
//             content: commentContent,
//           },
//         },
//       });
//     },
//   }),
// })(CommentPage);


const UsersPageContainer = compose(
    withUsersData,
    withCreateUser,
)(UsersPageView);


export {UsersPageContainer};
