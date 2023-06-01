import axios from "axios";

export const authApi = axios.create({
    baseURL: 'https://api.mybebe.net/api/v1/auth'
})


