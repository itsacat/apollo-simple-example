import React from 'react';
import {graphql, compose} from 'react-apollo';
import {fetchPolicy} from '../../gqlOptions';
import {connect} from 'react-redux';
import {UserPageView} from './UserPageView';
import {bindActionCreators} from "redux";
import {actions} from "../../store/actions";
import gql from 'graphql-tag';


function mapStateToProps(state) {
    return {
        authorizedUserId: state.authorization.authorizedUserId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

let withDataFromStore = connect(mapStateToProps, mapDispatchToProps);


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
    options: (props) => ({
        variables: {
            id: props.match.params.id
        },
        fetchPolicy: fetchPolicy
    })
};

let withUserData = graphql(UserQuery, gqlOptions);


const UserPageContainer = compose(
    withUserData,
    withDataFromStore
)(UserPageView);


export {UserPageContainer};
