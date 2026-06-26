import axios from "axios";

export const api = axios.create({ baseURL: "https://api.dulivi.com.br/api" });
