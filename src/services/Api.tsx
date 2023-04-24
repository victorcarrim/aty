import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "https://localhost:7121",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user")
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("user")
    }
    return Promise.reject(error);
  }
);

export default api;