import React from 'react';
import {fetchPolicy} from "../gqlOptions";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


class CurrentUser extends React.Component {
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.authorizedUserId !== null) {
    //         this.props.client.query({
    //             query: UserQuery,
    //             variables: {id: nextProps.authorizedUserId},
    //         });
    //     }
    // }

    render() {
        if (!this.props.authorizedUserId || !this.props.data.user) {
            return (
                <div>User is not logged in</div>
            );
        }

        return (
            <div>Current user: {this.props.data.user.name}</div>
        );
    }
}


const UserQuery = gql`
    query getUser($id: Int) {
        user(id: $id) {
            id
            name
        }
    }
`;

const gqlOptions = {
    options: (props) => ({
        variables: {
            id: props.authorizedUserId
        },
        fetchPolicy: fetchPolicy
    })
};

let withUserData = graphql(UserQuery, gqlOptions);


const CurrentUserContainer = withUserData(CurrentUser);

// В начале пробовал получать authorizedUserId через mapStateToProps
// в этом компоненте, но тогда компонент не пересоздаётся
// и не вызывается запрос getUser

export {CurrentUserContainer as CurrentUser};
