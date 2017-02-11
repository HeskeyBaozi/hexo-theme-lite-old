"use strict";

import React from "react";
import {Router} from "dva/router";
import App from "./routes/App/App";


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

    function requireArchivesPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'posts/initializeArchivesPage',
            onComplete: callback
        });
    }

    const routes = [
        {
            path: '/',
            component: App,
            onEnter: requireGlobalMetaPrepared,
            getIndexRoute: function (nextState, callback) {
                require.ensure([], require => {
                    const Home = require('./routes/HomePage/Home');
                    callback(null, {
                        name: 'home',
                        component: Home,
                        onEnter: requirePostsListPrepared
                    });
                });
            },
            childRoutes: [
                {
                    path: 'posts/:post_id',
                    name: 'post-detail',
                    onEnter: requirePostPagePrepared,
                    getComponent: function (nextState, callback) {
                        require.ensure([], require => {
                            const PostPage = require('./routes/PostPage/PostPage');
                            callback(null, PostPage);
                        });
                    }
                },
                {
                    path: 'archives',
                    name: 'archives',
                    onEnter: requireArchivesPrepared,
                    getComponent: function (nextState, callback) {
                        require.ensure([], require => {
                            const Archives = require('./routes/ArchivesPage/Archives');
                            callback(null, Archives);
                        })
                    }
                }
            ]
        }
    ];

    return <Router history={history} routes={routes}/>;
}

export default RouterConfig;
