import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
