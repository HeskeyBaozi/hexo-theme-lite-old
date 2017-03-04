import {fetchPostFieldValue, fetchPostMeta, fetchPostsList} from "../services/posts";
import NProgress from "nprogress";

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
        initializePostsList: function*({payload, onComplete}, {put, call, select}) {
            // check list
            const isEmptyList = yield select(({posts}) => !posts.list.length);
            if (isEmptyList) {
                const {data} = yield call(fetchPostsList);
                yield put({
                    type: 'savePostsList',
                    payload: {list: data}
                });
            }
            NProgress.inc();
            yield put({
                type: 'initializePostsMeta',
                onComplete,
                payload: {
                    initializeList: yield select(({posts}) =>
                        posts.list.reduce((accumulation, right) => accumulation.concat([...right])))
                }
            });
        },
        initializePostsMeta: function*({payload, onComplete}, {put, select, call, take}) {
            NProgress.start();
            const {initializeList} = payload;
            const entities = yield select(({posts}) => posts.entities);

            // check tags
            const isTagsPrepared = yield select(({tags}) => tags.tagsList.length);
            if (!isTagsPrepared) {
                yield put({type: 'tags/initializeTags'});
                yield take('tags/saveTagsEntities');
            }
            NProgress.inc();
            // check categories
            const isCategoriesPrepared = yield select(({categories}) => categories.categoriesList.length);
            if (!isCategoriesPrepared) {
                yield put({type: 'categories/initializeCategories'});
                yield take('categories/saveCategoriesEntities');
            }
            NProgress.inc();

            const [
                ...fetchPostsEntitiesResult
            ] = yield [
                ...initializeList.map(post_id => {
                    "use strict";
                    const isExists = entities[post_id];
                    if (!isExists) {
                        return call(fetchPostMeta, {post_id});
                    }
                }).filter(call => call)
            ];
            NProgress.inc();

            yield [
                ...fetchPostsEntitiesResult.map(({data}) => put({
                    type: 'savePostMeta',
                    payload: {postMeta: data}
                }))
            ];
            NProgress.inc();
            yield put({type: 'initializePostsMetaComplete'});
            onComplete();
            NProgress.done();
        },
        initializePostsContent: function*({payload}, {put, call, select}) {
            const {postIdArray} = payload;
            const [
                ...fetchPostsContentResult
            ] = yield [
                ...postIdArray.map(post_id => call(fetchPostFieldValue, {post_id, fieldName: 'content'}))
            ];
            NProgress.inc();

            yield [
                ...fetchPostsContentResult.map(({data}) => put({
                    type: 'savePostContent',
                    payload: {contentObject: data}
                }))
            ];
            NProgress.done();
        },
        initializeArchivesPage: function*({payload, onComplete}, {put, take}) {
            yield put({type: 'initializePostsList', onComplete});
            yield take('initializePostsMetaComplete');
            NProgress.done();
        }
    },
    subscriptions: {},
}
