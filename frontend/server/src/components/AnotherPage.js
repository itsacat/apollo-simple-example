import React from 'react'
import Post4 from '../components/Post4'
import {gql, graphql} from 'react-apollo'
import {gqlOptions} from './../gqlOptions'

class AnotherPage extends React.Component {
    render() {
        console.log('Component AnotherPage: render');

        if (this.props.data.loading) {
            // console.log('Loading');
            return (<div>Loading</div>)
        }

        return (
            <div>
                <h1>AnotherPage</h1>
                <div>
                    <Post4
                        key={this.props.data.post.id}
                        post={this.props.data.post}
                    />
                </div>
            </div>
        )
    }
}

const FirstQuery = gql`
    query getPost {
        post(id: 4) {
            id
            description
        }
    }
`;

const AnotherPageWithData = graphql(FirstQuery, gqlOptions)(AnotherPage);

export default AnotherPageWithData;
