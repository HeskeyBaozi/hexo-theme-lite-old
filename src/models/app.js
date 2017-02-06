import {fetchGlobalConfig} from '../services/global';

export default {
    namespace: 'app',
    state: {
        title: '',
        subtitle: '',
        author: ''
    },
    reducers: {
        saveAppMeta: function (state, {payload}) {
            const {title, subtitle, author} = payload;
            return {
                ...state,
                title,
                subtitle,
                author
            };
        }
    },
    effects: {
        initializeAppMeta: function*({payload}, {put, call}) {
            const {data} = yield call(fetchGlobalConfig);
            if (data) {
                const {title, subtitle, author} = data;
                yield put({
                    type: 'saveAppMeta',
                    payload: {title, subtitle, author}
                });
            }
        }
    },
    subscriptions: {
        initialize: function ({history, dispatch}) {
            history.listen(location => {
                if (location.pathname.includes('/')) {
                    dispatch({type: 'initializeAppMeta'});
                }
            });
        }
    },
}
