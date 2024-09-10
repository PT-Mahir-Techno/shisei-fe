import axios from "axios"
import { baseUrl } from "./variable"
import Cookies from 'js-cookie';

const token = Cookies.get("_auth")

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

//  with credentials

// set token if exist in cookies
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

// set loading to true before request
api.interceptors.request.use((config) => {
  return config
})

// handle request and return success or error 
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response.data)
  }
)


export default api