import React from 'react'
import {UsersPageWithData} from './components/UsersPage'
import {FilmsPageWithData} from './components/FilmsPage'

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
];
export default routes;
