import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:9876/',
    timeout: 1000,
    headers: { 
      'Content-Type': 'application/json'
    },
  });

export default api;