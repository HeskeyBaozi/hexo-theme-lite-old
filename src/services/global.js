import request from '../utils/request';

export async function fetchGlobalConfig() {
    return request('/api/config/global.json');
}
