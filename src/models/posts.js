import {
    fetchPostFieldValue,
    fetchPostMeta,
    fetchPostsList
} from '../services/posts';

import {
    fetchTagsEntities
} from '../services/tags';

import {
    fetchCategoriesEntities
} from '../services/catagories';


export default {
    namespace: 'posts',
    state: {
        list: [],
        entities: {},
        tagsEntities: {},
        categoriesEntities: {}
    },
    reducers: {
        savePostsList: function (state, {payload}) {
            const {list} = payload;
            return {
                ...state,
                list
            };
        },
        savePostMeta: function (state, {payload}) {
            const {postMeta} = payload;
            const {post_id} = postMeta;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [post_id]: postMeta
                }
            };
        },
        saveTags: function (state, {payload}) {
            const {tagsEntities} = payload;
            return {
                ...state,
                tagsEntities
            };
        },
        saveCategories: function (state, {payload}) {
            const {categoriesEntities} = payload;
            return {
                ...state,
                categoriesEntities
            };
        }
    },
    effects: {
        initializePostsList: function*({payload}, {put, call}) {
            yield put({type: 'app/initializeAppMeta'});
            const {data} = yield call(fetchPostsList);
            if (data) {
                yield put({
                    type: 'savePostsList',
                    payload: {list: data}
                });

                yield put({type: 'initializePostsMeta'});
            }
        },
        initializePostsMeta: function*({payload}, {put, select}) {
            const list = yield select(({posts}) => posts.list);
            yield [
                ...list.map(post_id => put({
                    type: 'initializePostEntity',
                    payload: {post_id}
                })),
                put({type: 'initializeTags'}),
                put({type: 'initializeCategories'})
            ];
        },
        initializePostEntity: function*({payload}, {put, call, select}) {
            const {post_id} = payload;
            const isExists = yield select(({posts}) => posts.entities[post_id]);
            if (!isExists) {
                const {data} = yield call(fetchPostMeta, {post_id});
                if (data) {
                    yield put({
                        type: 'savePostMeta',
                        payload: {postMeta: data}
                    });
                }
            }
        },
        initializeTags: function*({payload}, {put, call}) {
            const {data} = yield call(fetchTagsEntities);
            if (data) {
                yield put({type: 'saveTags', payload: {tagsEntities: data}})
            }
        },
        initializeCategories: function*({payload}, {put, call}) {
            const {data} = yield call(fetchCategoriesEntities);
            if (data) {
                yield put({type: 'saveCategories', payload: {categoriesEntities: data}})
            }
        }
    },
    subscriptions: {
        initialize: function ({history, dispatch}) {
            history.listen(location => {
                if (location.pathname.includes('/')) {
                    dispatch({type: 'initializePostsList'});
                }
            });
        }
    },
}
