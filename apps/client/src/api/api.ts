import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_CORE_SERVICE_HOST}:${process.env.NEXT_PUBLIC_CORE_SERVICE_PORT}/api`,
  timeout: 5000,
});

api.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error: ', error.response);
    return Promise.reject(error);
  }
);

export default api;