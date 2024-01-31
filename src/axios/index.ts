import axios, { AxiosInstance, InternalAxiosRequestConfig,  AxiosResponse } from "axios";

export const authApi: AxiosInstance = axios.create({
    baseURL: 'https://api.tae2seat.com/api/v1/auth'
})

export const loggedApi: AxiosInstance = axios.create({
    baseURL:'https://api.tae2seat.com/api/v1/diary',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})


loggedApi.interceptors.request.use(
    function(config: InternalAxiosRequestConfig) {
        const accessToken = localStorage.getItem('accessToken')
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
    function(error) {
        return Promise.reject(error);
    }
)

loggedApi.interceptors.response.use(
    function(response: AxiosResponse){
        return response
    },
    function(error){
        if(error.response?.status === 404){
            window.location.replace('/notfound')
        }
        return Promise.reject(error);
    }
)