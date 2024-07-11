// Create an Axios instance
import axios from 'axios'
import { API_ROOT } from '~/utils/constant.js'

const axiosInstance = axios.create({
  baseURL: API_ROOT, // Replace with your API base URL
});


// Function to set the Authorization header
export const setAuthToken = token => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('accessToken', token);
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('accessToken');
  }
};

// Function to handle token refresh
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://localhost:8080/api/oauth/v1/auth/refresh-token', {
      refreshToken
    });

    const { accessToken, newRefreshToken } = response.data;
    setAuthToken(accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('Error refreshing token', error);
    return null;
  }
};

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
