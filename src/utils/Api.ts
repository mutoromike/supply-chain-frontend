// create axios instance, picking token generated from login

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}
);

export default api;