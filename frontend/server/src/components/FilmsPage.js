import React from 'react'
import {gql, graphql} from 'react-apollo'
import {gqlOptions} from './../gqlOptions'

class FilmsPage extends React.Component {
    createFilm(film, index) {
        return (
            <div key={index}>
                <span>{film.name}</span>
                <span> (likes: {film.usersCount})</span>
            </div>
        );
    }

    render() {
        console.log('Component FilmsPage: render');

        let films = this.props.data.films;

        if (films === undefined) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <h1>Films</h1>

                <div>
                    {films.map((film, index) => {
                        return this.createFilm(film, index);
                    })}
                </div>
            </div>
        );
    }
}


const FirstQuery = gql`
    query getFilms {
        films {
            id
            name
            usersCount,
            users {
                id,
                name
            }
        }
    }
`;

const FilmsPageWithData = graphql(FirstQuery, gqlOptions)(FilmsPage);

export {FilmsPageWithData};
