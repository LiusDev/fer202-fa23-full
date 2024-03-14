import axios from "axios"

const PORT = 9999

export const instance = axios.create({
    baseURL: `http://localhost:${PORT}`,
})
