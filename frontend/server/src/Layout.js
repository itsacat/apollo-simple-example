import React from 'react';
import routes from './routes';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

const Layout = () =>
    <div>
        <nav>
            <ul>
                <li>
                    <Link to="/">MainPage</Link>
                </li>
                <li>
                    <Link to="/another">AnotherPage</Link>
                </li>
            </ul>
        </nav>

        {renderRoutes(routes)}
    </div>;
export default Layout;
