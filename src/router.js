import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
import App from './routes/App/App';
import Home from './routes/Home/Home';
import PostPage from './routes/PostPage/PostPage';
import NProgress from 'nprogress';


function RouterConfig({history, app}) {
    function requireGlobalMetaPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'app/initializeAppMeta',
            payload: {},
            onComplete: callback
        });
    }

    function requirePostsListPrepared(nextState, replace, callback) {
        NProgress.start();
        app._store.dispatch({
            type: 'posts/initializePostsList',
            onComplete: function () {
                callback();
                NProgress.done();
            }
        });
    }

    function requirePostPagePrepared(nextState, replace, callback) {
        NProgress.start();
        app._store.dispatch({
            type: 'post_detail/initializePostPage',
            payload: {post_id: nextState.params.post_id},
            onComplete: function () {
                callback();
                NProgress.done();
            }
        });
    }

    return (
        <Router history={history}>
            <Route path="/"
                   component={App}
                   onEnter={requireGlobalMetaPrepared}
            >
                <IndexRoute
                    name="home"
                    component={Home}
                    onEnter={requirePostsListPrepared}
                />
                <Route
                    path="/posts/:post_id"
                    name="post-detail"
                    component={PostPage}
                    onEnter={requirePostPagePrepared}
                />
            </Route>
        </Router>
    );
}

export default RouterConfig;
