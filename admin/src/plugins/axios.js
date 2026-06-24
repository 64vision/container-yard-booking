
// Lib imports
import { md5 } from 'js-md5';
import axios from 'axios'
import moment from "moment";
//var SERVER = "http://"+window.location.hostname+":8100"
const SERVER ="https://******"

const api = axios.create({
  baseURL: SERVER + '/',
  headers: { 
    "Content-Type": "application/json",
    "access-token":  md5(moment().format('YYYY-DD-MM'))  // replace with your actual access token. This token is used for authentication.
   },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    console.log("Request Sent:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;