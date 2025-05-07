import axios from "axios";

export const instance = axios.create({
  baseURL: "http://hzeuoicgfl.us14.qoddiapp.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
