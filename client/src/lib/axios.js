import axios from 'axios';

const axios_instance = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request interceptor (attach token)
axios_instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      // @ts-ignore
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axios_instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // token expired / unauthorized protected route
    if (status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  },
);

export default axios_instance;
