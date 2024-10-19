import axios from "axios";
import { API_URL, TOKEN } from "./useEnv";
export const useAxios = () => axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type":"application/json"
    }
})