import axios from "axios";

const api = axios.create({
  baseURL: "https://bookpsy.netlify.app",
  headers: { "Content-Type": "application/json" },
});

export default api;
