import React from 'react';


class UserPageView extends React.Component {
    render() {
        console.log('Component UserPage: render');

        if (!this.props.data) {
            return (<div>Loading</div>)
        }

        let user = this.props.data.user;

        if (!user) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <h1>User: {user.name}</h1>
                <div>
                    {this.createLogin()}
                    {this.createLogout()}
                </div>
                <h2>Liked films ({user.films.length})</h2>
                <div>
                    {user.films.map((film, index) => {
                        return this.createFilm(film, index);
                    })}
                </div>
            </div>
        );
    }

    createFilm(film, index) {
        return (
            <div key={index}>
                <span>{film.name}</span>
            </div>
        );
    }

    createLogin() {
        return (
            <button onClick={this.onLoginClick.bind(this)}>Login</button>
        );
    }

    createLogout() {
        return (
            <button onClick={this.onLogoutClick.bind(this)}>Logout</button>
        );
    }

    onLoginClick() {
        this.props.actions.login(this.props.data.user.id);
    }

    onLogoutClick() {
        this.props.actions.logout();
    }
}

export {UserPageView};
