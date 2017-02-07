export default {
    namespace: 'post_detail',
    state: {
        currentPost: {
            title: null,
            date: null,
            updated: null,
            photos: null,
            post_id: null,
            content: null,
            tags: [],
            categories: []
        }
    },
    reducers: {},
    effects: {
        initializePostDetail: function*({payload, onComplete}, {put, call, select}) {

        }
    },
    subscriptions: {},
}
