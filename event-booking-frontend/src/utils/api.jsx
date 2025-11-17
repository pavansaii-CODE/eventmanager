import axios from 'axios';

// --- Configuration ---
// IMPORTANT: Replace the URL with the actual address and port where your Node.js backend is running.
// If your frontend runs on 3000 and your backend on 5000, this is correct.
const API_BASE_URL = 'http://localhost:5000/api'; 

// --- Create Axios Instance ---
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  Axios Interceptor: 
  This runs BEFORE every request. It checks localStorage for the JWT token 
  and adds it to the request header (x-auth-token) if found.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // If a token exists, add it to the headers for backend authentication
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
  Axios Interceptor: 
  This runs AFTER every response. It can be used to centrally handle errors, 
  like automatic logout on a 401 Unauthorized status.
*/
api.interceptors.response.use(
  (response) => {
    // If response is good, just pass it through
    return response;
  },
  (error) => {
    // Check if the error is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized response (401). Logging out user.');
      // Optional: Force logout if token is invalid or expired
      localStorage.removeItem('token');
      // Note: You would typically use a global state/context to trigger a redirect here.
    }
    return Promise.reject(error);
  }
);

export default api;