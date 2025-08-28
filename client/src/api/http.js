import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper to set or clear auth token on the instance
export const setAuthToken = (token) => {
  if (token) {
    http.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete http.defaults.headers.common['x-auth-token'];
  }
};

export default http;
