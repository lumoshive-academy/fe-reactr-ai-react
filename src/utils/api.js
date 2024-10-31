import axios from "axios";

const API_URL = "https://lumoshive-academy-ai-api.vercel.app"; // Isi dengan URL backend Anda

const api = axios.create({
  baseURL: API_URL,
  headers: { "x-api-key": "RJS1-202401" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data);
export const logout = () => api.post("/logout");
export const queryAI = (data) => api.post("/query", data);

export default api;
