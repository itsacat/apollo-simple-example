import React from 'react';
import {Link} from "react-router-dom";


class UsersPageView extends React.Component {
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

        this.props.createUser({variables: {name: userName}});

        // Альтернативный способ обновления стора.
        // this.props.data.refetch();
    }
}


export {UsersPageView};
