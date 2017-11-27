import React from 'react';
import {graphql} from 'react-apollo';
import {gqlOptions} from '../../gqlOptions';
import {FilmsPageView} from './FilmsPageView';
import gql from 'graphql-tag';


const FilmsQuery = gql`
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

let withFilmsData = graphql(FilmsQuery, gqlOptions);


const FilmsPageContainer = withFilmsData(FilmsPageView);


export {FilmsPageContainer};
