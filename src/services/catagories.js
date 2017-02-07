import request from '../utils/request';

export async function fetchCategoriesEntities() {
    return request('/api/categories/entities.json');
}

export async function fetchCategoriesList() {
    return request('/api/categories/index.json');
}