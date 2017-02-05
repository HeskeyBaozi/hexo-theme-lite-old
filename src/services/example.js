import request from '../utils/request';

export async function query() {
    return request('/api/meta/global.json');
}
