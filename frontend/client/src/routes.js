import React from 'react';
import {UsersPage} from './pageComponents/UsersPage';
import {FilmsPage} from './pageComponents/FilmsPage';
import {FilmPage} from './pageComponents/FilmPage';
import {UserPage} from './pageComponents/UserPage';


const routes = [
    {
        path: '/',
        name: 'main',
        exact: true,
        component: UsersPage,
    },
    {
        path: '/films',
        name: 'films',
        component: FilmsPage,
    },
    {
        path: '/film/:id',
        name: 'film',
        component: FilmPage,
    },
    {
        path: '/user/:id',
        name: 'user',
        component: UserPage,
    },
];


export default routes;
