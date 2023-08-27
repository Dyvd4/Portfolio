import axios from "axios";

const request = axios.create({
    baseURL: process.env.BASE_URL!
});

export default request;