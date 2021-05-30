import axios from 'axios'

const baseURL = 'http://localhost:3001/api'
const axiosInstance = axios.create({
    baseURL,
})

export const uploadFiles = (data, config) => {
    return axiosInstance.post('/convert', data, config)
}
