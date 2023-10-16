import axios from "axios";
import { TOKENS } from "../../utils/constant";


const BASEURL = "http://localhost:4000/api/v1"

const api = axios.create({
    baseURL: BASEURL,
    timeout: 10000
})

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem(TOKENS.login)
    if (token) {
        config.headers["x-access-token"] = token
    }
    return config
})

export default api