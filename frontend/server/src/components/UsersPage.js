import React from 'react'
import {gql, graphql} from 'react-apollo'
import {gqlOptions} from './../gqlOptions'
import {Link} from "react-router-dom";

class UsersPage extends React.Component {
    createUser(user, index) {
        return (
            <div key={index}>
                <span>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                </span>
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


const UsersQuery = gql`
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

const UsersPageWithData = graphql(UsersQuery, gqlOptions)(UsersPage);

export {UsersPageWithData};



