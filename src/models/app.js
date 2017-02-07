import {
    fetchGlobalConfig
} from '../services/global';

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
        initializeAppMeta: function*({payload, onComplete}, {put, call}) {
            const {data} = yield call(fetchGlobalConfig);
            if (data) {
                const {title, subtitle, author, per_page, date_format, time_format} = data;
                yield [
                    put({
                        type: 'saveAppMeta',
                        payload: {title, subtitle, author}
                    }),
                    put({
                        type: 'posts/savePerPage',
                        payload: {perPage: per_page}
                    }),
                    put({
                        type: 'posts/saveMomentFormat',
                        payload: {date_format, time_format}
                    })
                ];
                onComplete();
            }
        }
    },
    subscriptions: {},
}
