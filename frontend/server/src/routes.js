import React from 'react'
import MainPageWithData from './components/MainPage'
import AnotherPageWithData from './components/AnotherPage'

const routes = [
    {
        path: '/',
        name: 'main',
        exact: true,
        component: MainPageWithData,
    },
    {
        path: '/another',
        name: 'another',
        component: AnotherPageWithData,
    },
];
export default routes;
