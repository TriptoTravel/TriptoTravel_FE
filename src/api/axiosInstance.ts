import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
console.log("✅ API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

export default axiosInstance;
