import React from 'react'
import {gql, graphql} from 'react-apollo'
import {gqlOptions} from './../gqlOptions'
import {Link} from "react-router-dom";

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: ''
        };
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
                        return this.createUserTemplate(user, index);
                    })}
                </div>

                <div>
                    <br/>
                    <br/>
                    <input
                        value={this.state.userName}
                        onChange={(e) => this.setState({userName: e.target.value})}
                        type='text'
                        placeholder='User name'
                    />

                    <button
                        onClick={() => this.createUser()}
                    >
                        Create user
                    </button>
                </div>
            </div>
        );
    }

    createUserTemplate(user, index) {
        return (
            <div key={index}>
                <span>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                </span>
                <span> films: </span>
                {user.films ? this.createUserFilms(user.films) : ''}
            </div>
        );
    }

    createUserFilms(films) {
        return (
            <span>
                {films.map((film, index) => {
                    return (
                        <span key={index}>{film.name}, </span>
                    );
                })}
            </span>
        );
    }

    async createUser() {
        let userName = this.state.userName;

        await this.props.createLinkMutation({
            variables: {
                name: userName
            },
            optimisticResponse: {
                createUser: {
                    id: -1, // Fake id
                    name: userName,
                    films: [],
                    __typename: 'User'
                },
            },
            update: (store, {data: {createUser}}) => {
                console.log('UPDATE');
                const data = store.readQuery({query: getUsers});

                // Добавление films - это грязный хак. Без него всё рушится. Надо понять почему.
                createUser.films = [];

                data.users.push(createUser);
                store.writeQuery({query: getUsers, data});
            },
        });

        // Альтернативный способ обновления стора.
        // this.props.data.refetch();
    }
}

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

let UsersPageWithData = graphql(createUser, { name: 'createLinkMutation' })(UsersPage);
UsersPageWithData = graphql(getUsers, gqlOptions)(UsersPageWithData);

export {UsersPageWithData};
