import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:3000/',
});

export default Axios;