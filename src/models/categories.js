import {fetchCategoriesEntities, fetchCategoriesList} from "../services/catagories";
import NProgress from "nprogress";

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
        },
        initializeCategoriesPage: function*({payload, onComplete}, {put, take, select}) {
            NProgress.start();

            // check categories
            const isCategoriesPrepared = yield select(({categories}) => categories.categoriesList.length);
            if (!isCategoriesPrepared) {
                yield put({type: 'initializeCategories'});
                yield take('categories/saveCategoriesEntities');
            }

            onComplete();
            NProgress.done();
        },
        initializeCategoryDetail: function*({payload, onComplete}, {put, select, take}) {
            NProgress.start();
            const {category_id} = payload;
            const item = yield select(({categories}) => categories.categoriesEntities[category_id]);
            const postsEntities = yield select(({posts}) => posts.entities);

            // check post entity
            const allPostsMetaPrepared = item.posts.every(post_id => postsEntities[post_id]);
            if (!allPostsMetaPrepared) {
                yield put({
                    type: 'posts/initializePostsMeta',
                    onComplete,
                    payload: {
                        initializeList: item.posts
                    }
                });
                yield take('initializePostsMetaComplete');
            } else {

            }
            onComplete();
            NProgress.done();
        }
    },
    subscriptions: {},
}
