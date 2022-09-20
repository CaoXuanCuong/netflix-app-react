import apiConfig from './apiConfig';
import axiosClient from './axiosClient';

const request = axiosClient(apiConfig.baseURL);
export const authApi = {
    getUser: () => {
        const url = 'auth';
        return request.get(url);
    },
    login: (params) => {
        const url = 'auth/login';
        return request.post(url, params);
    },
    register: (params) => {
        const url = 'auth/register';
        return request.post(url, params);
    }
};

export default authApi;
