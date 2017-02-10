import {
    fetchPostMeta,
    fetchPostFieldValue
} from '../services/posts';
import NProgress from 'nprogress';

export default {
    namespace: 'post_detail',
    state: {
        currentPost: {}
    },
    reducers: {
        savePostMeta: function (state, {payload}) {
            const {postMeta} = payload;
            return {
                ...state,
                currentPost: {
                    ...state.currentPost,
                    ...postMeta
                }
            };
        },
        savePostContent: function (state, {payload}) {
            const {contentObject} = payload;
            const {content} = contentObject;
            return {
                ...state,
                currentPost: {
                    ...state.currentPost,
                    content
                }
            };
        }
    },
    effects: {
        initializePostPage: function*({payload, onComplete}, {put, select, take}) {
            NProgress.start();
            const {post_id} = payload;

            // check post meta
            const postEntity = yield select(({posts}) => posts.entities[post_id]);
            if (!postEntity) {
                yield put({
                    type: 'initializePostMeta',
                    payload: {post_id}
                });
                yield take('post_detail/savePostMeta');
            } else {
                yield put({
                    type: 'savePostMeta',
                    payload: {postMeta: postEntity}
                });
            }
            NProgress.inc();

            // check tags
            const isTagsPrepared = yield select(({tags}) => tags.tagsList.length);
            if (!isTagsPrepared) {
                yield put({type: 'tags/initializeTags'});
            }
            NProgress.inc();

            // check categories
            const isCategoriesPrepared = yield select(({categories}) => categories.categoriesList.length);
            if (!isCategoriesPrepared) {
                yield put({type: 'categories/initializeCategories'});
            }
            NProgress.inc();

            onComplete();

            // check post content
            const hasContent = yield select(({post_detail}) => post_detail.currentPost.content);
            if (!hasContent) {
                yield put({
                    type: 'initializePostContent',
                    payload: {post_id}
                });
            }
            NProgress.done();
        },
        initializePostMeta: function*({payload}, {put, call}) {
            const {post_id} = payload;
            const {data} = yield call(fetchPostMeta, {post_id});
            if (data) {
                yield put({
                    type: 'savePostMeta',
                    payload: {postMeta: data}
                });
            }
        },
        initializePostContent: function*({payload}, {put, call}) {
            const {post_id} = payload;
            const {data} = yield call(fetchPostFieldValue, {post_id, fieldName: 'content'});
            if (data) {
                yield put({
                    type: 'savePostContent',
                    payload: {contentObject: data}
                });
            }
        }
    },
    subscriptions: {},
}
