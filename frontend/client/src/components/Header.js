import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {CurrentUser} from './CurrentUser';
import {Link} from 'react-router-dom';


const Header = (props) => {
    return (
        <div>
            <CurrentUser authorizedUserId={props.authorizedUserId}/>
            <hr/>
            <div>Pages</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Users</Link>
                    </li>
                    <li>
                        <Link to="/films">Films</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};


function mapStateToProps(state) {
    return {
        authorizedUserId: state.authorization.authorizedUserId
    }
}

const HeaderContainer = compose(
    connect(mapStateToProps)
)(Header);


export {HeaderContainer as Header};
