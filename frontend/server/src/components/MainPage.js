import React from 'react'
import Post1 from '../components/Post1'
import {gql, graphql} from 'react-apollo'

class MainPage extends React.Component {
    render() {
        console.log('Component MainPage: render');

        if (this.props.data.loading) {
            return (<div>Loading</div>)
        }

        // let rows = [];
        // for (let i = 0; i < 10000; i++) {
        //     rows.push(<div key={i}>TEST</div>);
        // }

        return (
            <div>
                <h1>MainPage</h1>
                <div>
                    <Post1
                        key={this.props.data.post.id}
                        post={this.props.data.post}
                    />
                </div>

                {/*{rows}*/}
            </div>
        )
    }
}


const FirstQuery = gql`
    query getPost {
        post(id: 0) {
            id
            description,
            nextId
        }
    }
`;

const MainPageWithData = graphql(FirstQuery)(MainPage);

export default MainPageWithData;
