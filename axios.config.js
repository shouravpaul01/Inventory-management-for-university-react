import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://inventory-management-server-ten.vercel.app'
    // baseURL: 'http://localhost:3000'
  });

export default axiosInstance