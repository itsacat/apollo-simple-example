import React from 'react'

class Post3 extends React.Component {

    render() {
        return (
            <div>
                <div>
                    Three - {this.props.post.description}
                </div>
            </div>
        )
    }
}

export default Post3
