import axios from 'axios';
// import fetchAdapter from '@vespaiach/axios-fetch-adapter';
export const API_DOMAIN = process.env.NODE_ENV !== "production" ? `http://localhost:4000` : `https://api.jeffstore.com`;

export default function httpBase(URL: string, contentType = "application/json") {
    return axios.create({
        baseURL: URL,
        withCredentials: true,
        headers: {
            "content-type": contentType
        },
        timeout: 7000
        // adapter: fetchAdapter 
    });
}

export function httpBaseWithCredentials(URL: string, contentType = "application/json") {
    return axios.create({
        baseURL: URL,
        withCredentials: true,
        headers: {
            "content-type": contentType
        },
        timeout: 7000
        // adapter: fetchAdapter 
    });
}

export const backendAPI = httpBase(`${API_DOMAIN}/api/v1`);
export const backendAPIWithCredentials = httpBaseWithCredentials(`${API_DOMAIN}/api/v1`);