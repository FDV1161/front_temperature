import axios from 'axios'

const instance = axios.create({
    // baseURL: "http://10.8.0.42:8000/",
    baseURL: "http://192.168.0.135:5000",
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
    }   
})

export default instance