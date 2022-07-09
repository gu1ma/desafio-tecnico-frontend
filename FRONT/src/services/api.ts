import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
    const token = localStorage.getItem('@userLoggedToken');
    return {
        ...config, headers: {
            'Authorization': token ? `Bearer ${atob(token)}` : ''
        }
    }
})

api.interceptors.response.use(function (response: AxiosResponse) {
    return response;
}, function (error) {
    const { response: { status } } = error;
    if(status === 401) {
        localStorage.removeItem('@userLoggedToken');
    }
})

export default api;