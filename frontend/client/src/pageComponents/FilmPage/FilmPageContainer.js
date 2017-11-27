import React from 'react';
import {graphql} from 'react-apollo';
import {fetchPolicy} from '../../gqlOptions';
import {FilmPageView} from './FilmPageView';
import gql from 'graphql-tag';


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

let withFilmData = graphql(FilmQuery, gqlOptions);


const FilmPageContainer = withFilmData(FilmPageView);


export {FilmPageContainer};
