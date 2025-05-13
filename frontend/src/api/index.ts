import axios from "axios"

const api = axios.create({
    baseURL: String(import.meta.env.VITE_API_BASEURL) ?? "http://localhost:3500"
});

// Global response interceptor to redirect to login page on 401
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             window.location.href = "/terminbuch/termine?error=unauthorized";
//         }
//         return Promise.reject(error);
//     }
// );

export default api