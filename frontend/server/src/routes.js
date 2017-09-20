import React from 'react'
import TestPageWithData from './components/TestPage'

class AnotherPage extends React.Component {
    render() {
        return (
            <div>AnotherPage</div>
        )
    }
}

const routes = [
    {
        path: '/',
        name: 'home',
        exact: true,
        component: TestPageWithData,
    },
    {
        path: '/another',
        name: 'another',
        component: AnotherPage,
    },
];
export default routes;
