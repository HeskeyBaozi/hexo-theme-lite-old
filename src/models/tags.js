import {fetchTagsEntities, fetchTagsList} from "../services/tags";
import NProgress from "nprogress";

export default {
    namespace: 'tags',
    state: {
        tagsList: [],
        tagsEntities: {}
    },
    reducers: {
        saveTagsEntities: function (state, {payload}) {
            const {tagsEntities} = payload;
            return {
                ...state,
                tagsEntities
            };
        },
        saveTagsList: function (state, {payload}) {
            const {tagsList} = payload;
            return {
                ...state,
                tagsList
            };
        }
    },
    effects: {
        initializeTags: function*({payload}, {put, call}) {
            const [
                {data:tagsEntities},
                {data:tagsList}
            ] = yield [
                call(fetchTagsEntities),
                call(fetchTagsList)
            ];
            yield [
                put({
                    type: 'saveTagsEntities',
                    payload: {tagsEntities}
                }),
                put({
                    type: 'saveTagsList',
                    payload: {tagsList}
                })
            ];
        },
        initializeTagsPage: function*({payload, onComplete}, {put, select, take}) {
            NProgress.start();

            // check tags
            const isTagsPrepared = yield select(({tags}) => tags.tagsList.length);
            if (!isTagsPrepared) {
                yield put({type: 'initializeTags'});
                yield take('tags/saveTagsEntities');
            }
            onComplete();
            NProgress.done();
        },
        initializeTagDetail: function*({payload, onComplete}, {put, select, take}) {
            NProgress.start();
            const {tag_id} = payload;
            const tagEntity = yield select(({tags}) => tags.tagsEntities[tag_id]);
            const postsEntities = yield select(({posts}) => posts.entities);

            // check post entity
            const allPostsMetaPrepared = tagEntity.posts.every(post_id => postsEntities[post_id]);
            if (!allPostsMetaPrepared) {
                yield put({
                    type: 'posts/initializePostsMeta',
                    onComplete,
                    payload: {
                        initializeList: tagEntity.posts
                    }
                });
                yield take('initializePostsMetaComplete');
            } else {
                onComplete();
            }
            NProgress.done();
        }
    },
    subscriptions: {},
}
