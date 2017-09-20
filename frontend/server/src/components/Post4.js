import React from 'react'

class Post4 extends React.Component {

    render() {
        return (
            <div>
                <div>
                    Four - {this.props.post.description}
                </div>
            </div>
        )
    }
}

export default Post4
