import React from 'react';
import {Router, Route} from 'dva/router';
import MainLayout from './components/Layout/Layout';

function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Route path="/" component={MainLayout}>

            </Route>
        </Router>
    );
}

export default RouterConfig;
