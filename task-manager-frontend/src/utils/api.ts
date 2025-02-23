import axios from 'axios';

// Get the backend URL from the environment variable
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // Fallback to default if not set in .env

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: apiUrl, // Use the backend URL from environment variables
});

// Add request interceptor to include Authorization header if a token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach JWT token to the request headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
