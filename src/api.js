import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

/* Interceptor: will detect each request we do and replace the headers to save us time writing it over and over again.
In this case, it will detect if, in each request, we have an access token and the creds, then it will add the tocken automatically */

/* If we want an environment variable loaded inside our React code, it needs to start with VITE */

const isDevelopment = import.meta.env.MODE === 'development'
const api = axios.create({
    //baseURL: import.meta.env.VITE_API_BASE_URL_LOCAL /* allows us to import anything specified inside of an environmen variable file */
    myBaseURL: isDevelopment 
        ?  import.meta.env.VITE_API_BASE_URL_LOCAL 
        : import.meta.env.VITE_API_BASE_URL_DEPLOY
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;