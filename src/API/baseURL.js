import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://alzaheimer-backend-production.up.railway.app",
});

export default baseURL;
