import React from 'react';


class FilmPageView extends React.Component {
    createUser(user, index) {
        return (
            <div key={index}>
                <span>{user.name}</span>
            </div>
        );
    }

    render() {
        console.log('Component FilmPage: render');

        let film = this.props.data.film;

        if (!film) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <h1>Film: {film.name}</h1>
                <h2>Description</h2>
                <div>{film.description}</div>
                <h2>Users liked this film ({film.usersCount})</h2>
                <div>
                    {film.users.map((user, index) => {
                        return this.createUser(user, index);
                    })}
                </div>
            </div>
        );
    }
}

export {FilmPageView};
