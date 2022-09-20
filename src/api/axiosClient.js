import axios from "axios";
import queryString from 'query-string';
import { LOCAL_STORAGE_TOKEN_NAME } from "~/utils/constants";

import apiConfig from "./apiConfig";

const axiosClient = (baseURL) => {
    const request = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
        paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey})
    })
    
    request.interceptors.request.use(async (config) => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config
    });
    
    request.interceptors.response.use((response) => {
        if(response && response.data) {
            return response.data;
        }
    
        return response;
    }, (error) => {
        throw error;
    })
    return request;
} 
export default axiosClient;