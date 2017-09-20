import React from 'react'
import {gql, graphql} from 'react-apollo'
import Post3 from '../components/Post3'
import Post4 from '../components/Post4'

class Post2 extends React.Component {



    render() {
        console.log('Component Post2: render');

        if (this.props.data.loading) {
            return (<div>Loading</div>)
        }

        let post = null;

        if (this.props.data.post.id === 2) {
            post =
                <Post3
                    key={this.props.data.post.id}
                    post={this.props.data.post}
                />;
        }

        if (this.props.data.post.id === 3) {
            post =
                <Post4
                    key={this.props.data.post.id}
                    post={this.props.data.post}
                />;
        }

        return (
            <div>
                <div>
                    Two - {this.props.post.description}
                </div>

                {post}
            </div>
        )
    }
}

const FirstQuery = gql`
    query getPost($id: Int) {
        post(id: $id) {
            id
            description
        }
    }
`;

const data = {
    options: (props) => {
        return {
            variables: {
                id: props.post.nextId
            }
        }
    }
};

const PostWithMutation = graphql(FirstQuery, data)(Post2);

export default PostWithMutation
