import React from 'react';
import {gql, graphql} from 'react-apollo';
import {fetchPolicy} from './../gqlOptions';


class UserPage extends React.Component {
    createUser(film, index) {
        return (
            <div key={index}>
                <span>{film.name}</span>
            </div>
        );
    }

    render() {
        console.log('Component UserPage: render');

        let user = this.props.data.user;

        if (!user) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Liked films ({user.films.length})</h2>
                <div>
                    {user.films.map((film, index) => {
                        return this.createUser(film, index);
                    })}
                </div>
            </div>
        );
    }
}

const UserQuery = gql`
    query getUser($id: Int) {
        user(id: $id) {
            id
            name
            films {
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

const UserPageWithData = graphql(UserQuery, gqlOptions)(UserPage);


export {UserPageWithData};
