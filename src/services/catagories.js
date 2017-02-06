import request from '../utils/request';

export async function fetchCategoriesEntities() {
    return request('/api/categories/entities.json');
}