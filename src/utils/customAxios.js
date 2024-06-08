import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
});

const STORAGE_KEY = 'accessToken';

customAxios.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem(STORAGE_KEY);
        if (accessToken) {
            config.headers.Authorization = `Basic ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            (error.response && error.response.status === 401) ||
            (error.response && error.response.status === 403)
        ) {
            console.error('Unauthorized error:', error);

            sessionStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem('userInfo');
        } else {
            console.error('Response error:', error);
        }
        return Promise.reject(error);
    }
);
export default customAxios;