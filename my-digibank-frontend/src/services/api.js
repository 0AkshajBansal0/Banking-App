// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Add interceptor to append lang param or property automatically
api.interceptors.request.use((config) => {
  const lang = localStorage.getItem("lang") || "en";

  if (config.method === "get" || config.method === "delete") {
    config.params = { ...config.params, lang };
  } else if (config.method === "post" || config.method === "put") {
    if (config.data && typeof config.data === "object") {
      config.data.lang = lang;
    }
  }

  return config;
});

export default api;