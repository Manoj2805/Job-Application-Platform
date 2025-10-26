import axios from 'axios';

// Create a central Axios instance pointing to your API Gateway.
// No authentication headers are needed in this version.
const apiClient = axios.create({
  baseURL: 'http://localhost:8089', // Your API Gateway URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;