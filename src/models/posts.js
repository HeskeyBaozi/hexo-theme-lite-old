import {
    fetchPostFieldValue,
    fetchPostMeta,
    fetchPostsList
} from '../services/posts';


export default {
    namespace: 'posts',
    state: {
        list: [],
        entities: {}
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
            yield list.map(post_id => put({
                type: 'initializePostEntity',
                payload: {post_id}
            }));
        },
        initializePostEntity: function*({payload}, {put, call}) {
            const {post_id} = payload;
            const {data} = yield call(fetchPostMeta, {post_id});
            if (data) {
                yield put({
                    type: 'savePostMeta',
                    payload: {postMeta: data}
                });
            }
        }
    },
    subscriptions: {
        initialize: function ({history, dispatch}) {
            history.listen(location => {
                if (location.pathname.includes('/posts')) {
                    dispatch({type: 'initializePostsList'});
                }
            });
        }
    },
}
