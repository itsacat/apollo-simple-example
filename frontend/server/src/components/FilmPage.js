import React from 'react';
import {gql, graphql} from 'react-apollo';
import {fetchPolicy} from './../gqlOptions';


class FilmPage extends React.Component {
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
                <h1>{film.name}</h1>
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

const FilmQuery = gql`
    query getFilm($id: Int) {
        film(id: $id) {
            id
            name
            description
            usersCount,
            users {
                id,
                name
            }
        }
    }
`;

const gqlOptions = {
    options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            },
            fetchPolicy: fetchPolicy
        }
    }
};

const FilmPageWithData = graphql(FilmQuery, gqlOptions)(FilmPage);


export {FilmPageWithData};
