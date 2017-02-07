import {
    fetchCategoriesEntities,
    fetchCategoriesList
} from '../services/catagories';


export default {
    namespace: 'categories',
    state: {
        categoriesList: [],
        categoriesEntities: {}
    },
    reducers: {
        saveCategoriesEntities: function (state, {payload}) {
            const {categoriesEntities} = payload;
            return {
                ...state,
                categoriesEntities
            };
        },
        saveCategoriesList: function (state, {payload}) {
            const {categoriesList} = payload;
            return {
                ...state,
                categoriesList
            };
        },
    },
    effects: {
        initializeCategories: function*({payload}, {put, call}) {
            const [
                {data:categoriesEntities},
                {data:categoriesList}
            ] = yield [
                call(fetchCategoriesEntities),
                call(fetchCategoriesList)
            ];
            yield [
                put({
                    type: 'saveCategoriesEntities',
                    payload: {categoriesEntities}
                }),
                put({
                    type: 'saveCategoriesList',
                    payload: {categoriesList}
                })
            ];
        }
    },
    subscriptions: {},
}
