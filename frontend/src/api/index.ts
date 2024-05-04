import axios from "axios"

export default axios.create({
    baseURL: String(import.meta.env.VITE_API_BASEURL) ?? "http://localhost:3500"
});