import axios from "axios";

export const BASE_URL = "https://api.api-ninjas.com/v1";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
  },
});
