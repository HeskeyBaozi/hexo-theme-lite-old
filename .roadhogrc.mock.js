export default {
    'GET /api/config/global.json': require('./mock/config/global.json'),

    'GET /api/posts/:post_id/index.json': function (request, response) {
        const {post_id} = request.params;
        response.json(require(`./mock/posts/${post_id}/index.json`))
    },
    'GET /api/posts/:post_id/:field_name.json': function (request, response) {
        const {post_id, field_name} = request.params;
        response.json(require(`./mock/posts/${post_id}/${field_name}.json`));
    },
    'GET /api/posts/index.json': require('./mock/posts/index.json'),

    // categories
    'GET /api/categories/entities.json': require('./mock/categories/entities.json'),
    'GET /api/categories/index.json': require('./mock/categories/index.json'),

    // tags
    'GET /api/tags/entities.json': require('./mock/tags/entities.json'),
    'GET /api/tags/index.json': require('./mock/tags/index.json')
};