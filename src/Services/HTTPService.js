import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
export const http = {
    get: axios.get ,
    post:axios.post ,
    put:axios.put ,
    delete:axios.delete ,
}