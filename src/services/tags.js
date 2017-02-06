import request from '../utils/request';

export async function fetchTagsEntities() {
    return request('/api/tags/entities.json');
}