import axios from "axios";

export const authApi = axios.create({
    baseURL: 'https://api.mybebe.net/api/v1/auth'
})

export const loggedApi = axios.create({
    baseURL:'https://api.mybebe.net/api/v1/diary',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})


loggedApi.interceptors.request.use(
    function(config) {
        const accessToken = localStorage.getItem('accessToken')
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
    function(error) {
        return Promise.reject(error);
    }
)

loggedApi.interceptors.response.use(
    function(response){
        return response
    },
    function(error){
        if(error.response === 404){
            window.location.replace('/notfound')
        }
        return Promise.reject(error);
    }
)