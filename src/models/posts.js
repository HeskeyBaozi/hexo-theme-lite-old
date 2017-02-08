import {
    fetchPostFieldValue,
    fetchPostMeta,
    fetchPostsList
} from '../services/posts';


export default {
    namespace: 'posts',
    state: {
        list: [],
        entities: {},
        perPage: null,
        momentFormat: {
            time_format: null,
            date_format: null
        }
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
        savePerPage: function (state, {payload}) {
            const {perPage} = payload;
            return {
                ...state,
                perPage
            };
        },
        saveMomentFormat: function (state, {payload}) {
            const {time_format, date_format} = payload;
            return {
                ...state,
                momentFormat: {
                    ...state.momentFormat,
                    time_format,
                    date_format
                }
            };
        },
        savePostContent: function (state, {payload}) {
            const {contentObject} = payload;
            const {content, post_id} = contentObject;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [post_id]: {
                        ...state.entities[post_id],
                        content
                    }
                }
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

            // check tags
            const isTagsPrepared = yield select(({tags}) => tags.tagsList.length);
            if (!isTagsPrepared) {
                yield put({type: 'tags/initializeTags'});
            }

            // check categories
            const isCategoriesPrepared = yield select(({categories}) => categories.categoriesList.length);
            if (!isCategoriesPrepared) {
                yield put({type: 'categories/initializeCategories'});
            }

            const [
                ...fetchPostsEntitiesResult
            ] = yield [
                ...list.map(chunk => chunk.map(post_id => {
                    "use strict";
                    const isExists = entities[post_id];
                    if (!isExists) {
                        return call(fetchPostMeta, {post_id});
                    }
                }).filter(call => call))
            ];

            yield [
                ...fetchPostsEntitiesResult.map(chunk => chunk.map(({data}) => put({
                    type: 'savePostMeta',
                    payload: {postMeta: data}
                })))
            ];
            onComplete();
        },
        initializePostsContent: function*({payload}, {put, call, select}) {
            const {postIdArray} = payload;
            const [
                ...fetchPostsContentResult
            ] = yield [
                ...postIdArray.map(post_id => call(fetchPostFieldValue, {post_id, fieldName: 'content'}))
            ];

            yield [
                ...fetchPostsContentResult.map(({data}) => put({
                    type: 'savePostContent',
                    payload: {contentObject: data}
                }))
            ];
        }
    },
    subscriptions: {},
}
