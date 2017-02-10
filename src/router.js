import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
import App from './routes/App/App';
import Home from './routes/Home/Home';
import PostPage from './routes/PostPage/PostPage';


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

    function requirePostPagePrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'post_detail/initializePostPage',
            payload: {post_id: nextState.params.post_id},
            onComplete: callback
        });
    }

    return (
        <Router history={history}>
            <Route path="/" component={App} onEnter={requireGlobalMetaPrepared}>
                <IndexRoute component={Home} onEnter={requirePostsListPrepared}/>
                <Route path="/posts/:post_id" component={PostPage} onEnter={requirePostPagePrepared}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
