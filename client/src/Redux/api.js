import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    // baseURL: "/api",
});

export default api;


export const host = "http://localhost:8000";
// export const host = "/";