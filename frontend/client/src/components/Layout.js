import React from 'react';
import routes from '../routes';
import {renderRoutes} from 'react-router-config';
import {Header} from './Header';


const Layout = (props) => (
    <div>
        <Header/>
        <hr/>
        {renderRoutes(routes)}
    </div>
);


export {Layout};
