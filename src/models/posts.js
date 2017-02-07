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
        initializePostsList: function*({payload, onComplete}, {put, call}) {
            const {data} = yield call(fetchPostsList);
            if (data) {
                yield put({
                    type: 'savePostsList',
                    payload: {list: data}
                });
                yield put({type: 'initializePostsMeta', onComplete});
            }
        },
        initializePostsMeta: function*({payload, onComplete}, {put, select, call}) {
            const list = yield select(({posts}) => posts.list);
            const entities = yield select(({posts}) => posts.entities);
            const [
                {data:tagsEntities},
                {data:categoriesEntities},
                ...fetchPostsEntitiesResult
            ] = yield [
                call(fetchTagsEntities),
                call(fetchCategoriesEntities),
                ...list.map(post_id => {
                    "use strict";
                    const isExists = entities[post_id];
                    if (!isExists) {
                        return call(fetchPostMeta, {post_id});
                    }
                }).filter(call => call)
            ];

            yield [
                put({type: 'saveTags', payload: {tagsEntities}}),
                put({type: 'saveCategories', payload: {categoriesEntities}}),
                ...fetchPostsEntitiesResult.map(({data:postMeta}) => put({
                    type: 'savePostMeta',
                    payload: {postMeta}
                }))
            ];
            onComplete();
        }
    },
    subscriptions: {},
}
