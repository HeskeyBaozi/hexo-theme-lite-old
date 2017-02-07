import request from '../utils/request';

export async function fetchTagsEntities() {
    return request('/api/tags/entities.json');
}

export async function fetchTagsList() {
    return request('/api/tags/index.json');
}