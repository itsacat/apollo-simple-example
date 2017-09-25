import React from 'react'
import Post1 from '../components/Post1'
import {gql, graphql} from 'react-apollo'
import {gqlOptions} from './../gqlOptions'

class UsersPage extends React.Component {
    createUser(user, index) {
        return (
            <div key={index}>
                <span><a>{user.name}</a></span>
                <span> films: </span>
                <span>
                    {user.films.map((film, index) => {
                        return (
                            <span key={index}>{film.name}, </span>
                        );
                    })}
                </span>
            </div>
        );
    }

    render() {
        console.log('Component UsersPage: render');

        let users = this.props.data.users;

        if (users === undefined) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <h1>Users</h1>

                <div>
                    {users.map((user, index) => {
                        return this.createUser(user, index);
                    })}
                </div>
            </div>
        );
    }
}


const FirstQuery = gql`
    query getPost {
        post(id: 0) {
            id
            description
            nextId
        },
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

const UsersPageWithData = graphql(FirstQuery, gqlOptions)(UsersPage);

export {UsersPageWithData};



