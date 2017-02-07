import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
import App from './routes/App/App';
import Home from './routes/Home/Home';


function RouterConfig({history, app}) {
    function requireGlobalMetaPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'app/initializeAppMeta',
            payload: {},
            onComplete: callback
        });
    }

    function requirePostsListPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'posts/initializePostsList',
            onComplete: callback
        });
    }

    return (
        <Router history={history}>
            <Route path="/" component={App} onEnter={requireGlobalMetaPrepared}>
                <IndexRoute component={Home} onEnter={requirePostsListPrepared}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
