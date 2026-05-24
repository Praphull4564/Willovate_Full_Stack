import axios from 'axios';
import { ENV } from '../config/env';
import { API_CONFIG } from '../config/api.config';
import { APP_ROUTES } from '../config/routes.config';
import { tokenManager } from '../utils/tokenManager';

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenManager.clearStorage();
      window.location.href = APP_ROUTES.PUBLIC.LOGIN;
    }
    return Promise.reject(error);
  }
);
