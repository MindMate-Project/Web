import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://alzaheimer-backend.onrender.com/",
});

export default baseURL;
