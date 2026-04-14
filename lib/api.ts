import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notesapi-production-b324.up.railway.app/api',
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token) {
        // axios v1 safe way
        config.headers?.set?.('Authorization', `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined') {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);