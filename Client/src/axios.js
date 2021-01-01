import axios from 'axios';
const instance = axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'http://192.168.0.3:5000/',
});

export default instance;
