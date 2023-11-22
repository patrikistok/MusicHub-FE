import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // TODO: Add auhorization

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
