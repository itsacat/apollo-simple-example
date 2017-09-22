import React from 'react'
import {gql, graphql} from 'react-apollo'
import Post2 from '../components/Post2'
import {fetchPolicy} from './../gqlOptions'


class Post1 extends React.Component {
    render() {
        console.log('Component Post1: render');

        if (this.props.data.loading) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <div>
                    One - {this.props.post.description}
                </div>

                <Post2
                    key={this.props.data.post.id}
                    post={this.props.data.post}
                />
            </div>
        )
    }
}

const FirstQuery = gql`
    query getPost($id: Int) {
        post(id: $id) {
            id
            description,
            nextId
        }
    }
`;

const data = {
    options: (props) => ({
        variables: {
            id: props.post.nextId
        },
        fetchPolicy: fetchPolicy
    })
};

const PostWithMutation = graphql(FirstQuery, data)(Post1);


export default PostWithMutation
