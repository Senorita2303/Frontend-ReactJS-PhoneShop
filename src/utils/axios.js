import axios from 'axios';

// BASE_URL => http://localhost:3001
import {BASE_URL} from "../config";

const axiosInstance = axios.create({baseURL: BASE_URL});

axios.interceptors.response.use(
    (response) => response, 
    (error) => 
        Promise.reject(
            (error.response && error.response.data) || "Something went wrong."
        )
);

export default axiosInstance;