import request from '../utils/request';

export async function fetchPostsList() {
    return request('/api/posts/index.json');
}

export async function fetchPostMeta({post_id}) {
    return request(`/api/posts/${post_id}/index.json`)
}

export async function fetchPostFieldValue({post_id, fieldName}) {
    return request(`/api/posts/${post_id}/${fieldName}.json`);
}
