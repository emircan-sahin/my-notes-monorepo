import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor
instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    return config;
}, error => Promise.reject(error));

// Add a response interceptor
instance.interceptors.response.use(response => {
    if (response.data?.message) {
        toast.success(response.data.message);
    }
    return response.data;
}, error => {
    const response = error.response;
    const data = response.data;
    // Detect ZodError and display the error message
    if (response.status === 400 && data?.name === 'ZodError') {
        toast.error(`${data.issues[0].message} in ${data.issues[0].path[1]}`);
    } else if (data?.message) {
        toast.error(data?.message);
    } else {
        toast.error('Something went wrong');
    }
    Promise.reject(error)
});

export default instance;