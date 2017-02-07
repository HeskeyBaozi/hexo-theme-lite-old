import {
    fetchTagsEntities,
    fetchTagsList
} from '../services/tags';

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
        }
    },
    subscriptions: {},
}
