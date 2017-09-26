import React from 'react'
import {UsersPageWithData} from './components/UsersPage'
import {FilmsPageWithData} from './components/FilmsPage'
import {FilmPageWithData} from './components/FilmPage'
import {UserPageWithData} from './components/UserPage'

const routes = [
    {
        path: '/',
        name: 'main',
        exact: true,
        component: UsersPageWithData,
    },
    {
        path: '/films',
        name: 'films',
        component: FilmsPageWithData,
    },
    {
        path: '/film/:id',
        name: 'film',
        component: FilmPageWithData,
    },
    {
        path: '/user/:id',
        name: 'user',
        component: UserPageWithData,
    },
];
export default routes;
