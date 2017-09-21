import React from 'react'
import Post4 from '../components/Post4'
import {gql, graphql} from 'react-apollo'

class AnotherPage extends React.Component {
    render() {
        console.log('Component AnotherPage: render');

        if (this.props.data.loading) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <h1>MainPage</h1>
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

const AnotherPageWithData = graphql(FirstQuery)(AnotherPage);

export default AnotherPageWithData;
