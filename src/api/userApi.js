import apiConfig from './apiConfig';
import axiosClient from './axiosClient';

const request = axiosClient(apiConfig.baseURL);
export const userApi = {
    getListFavorites: () => {
        const url = 'user/favorite/list';
        return request.get(url);
    },
    addFavorite: (params) => {
        const url = 'user/favorite';
        return request.post(url, params);
    },
    addHistory: (params) => {
        const url = 'user/history';
        return request.post(url, params); 
    },
    getListHistory: () => {
        const url = 'user/history/list';
        return request.get(url);
    },
    deleteFavorite: (params) => {
        const url = 'user/favorite/destroy';
        return request.delete(url, { data: {
            ...params
        }});
    },
    deleteHistory: (params) => {
        const url = 'user/history/destroy';
        return request.delete(url, { data: {
            ...params
        }});
    },
    updateAvatar: (params) => {
        const url = 'user/avatar';
        return request.patch(url, params);
    },
    updateName: (params) => {
        const url = 'user/name';
        return request.patch(url, params);
    },
    updatePassword: (params) => {
        const url = 'user/password';
        return request.patch(url, params);
    },
};

export default userApi;
