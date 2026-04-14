import axios from "axios";

export const api = axios.create({
  baseURL: "https://notesapi-production-b324.up.railway.app/api",
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
