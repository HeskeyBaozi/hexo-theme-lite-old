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

    function requireTagsPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'tags/initializeTagsPage',
            onComplete: callback
        });
    }

    function requireTagDetailPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'tags/initializeTagDetail',
            onComplete: callback,
            payload: {tag_id: nextState.params.tag_id}
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
                        menuKey: 'home',
                        onEnter: requirePostsListPrepared
                    });
                });
            },
            childRoutes: [
                {
                    path: 'posts/:post_id',
                    name: 'post-detail',
                    menuKey: 'home',
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
                    menuKey: 'archives',
                    onEnter: requireArchivesPrepared,
                    getComponent: function (nextState, callback) {
                        require.ensure([], require => {
                            const Archives = require('./routes/ArchivesPage/Archives');
                            callback(null, Archives);
                        });
                    }
                },
                {
                    path: 'tags',
                    name: 'tags',
                    menuKey: 'tags',
                    onEnter: requireTagsPrepared,
                    getComponent: function (nextState, callback) {
                        require.ensure([], require => {
                            const Tags = require('./routes/TagsPage/TagsPage');
                            callback(null, Tags);
                        });
                    },
                    indexRoute: {
                        name: 'tag-detail',
                        menuKey: 'tags',
                        component: () => <div>Index</div>
                    },
                    childRoutes: [
                        {
                            path: ':tag_id',
                            name: 'tag-detail',
                            menuKey: 'tags',
                            onEnter: requireTagDetailPrepared,
                            getComponent: function (nextState, callback) {
                                require.ensure([], require => {
                                    const TagDetail = require('./routes/TagDetail/TagDetail');
                                    callback(null, TagDetail);
                                });
                            }
                        }
                    ]
                },
                {
                    path: 'categories',
                    name: 'categories',
                    menuKey: 'categories',
                    //onEnter: requireTagsPrepared,
                    getComponent: function (nextState, callback) {
                        require.ensure([], require => {
                            const Categories = require('./routes/CategoriesPage/CategoriesPage');
                            callback(null, Categories);
                        });
                    },
                }
            ]
        }
    ];

    return <Router history={history} routes={routes}/>;
}

export default RouterConfig;
