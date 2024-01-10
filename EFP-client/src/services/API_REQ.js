import axios from 'axios';

class ApiRequest {
    constructor(baseURL) {
        this.instance = axios.create({
            baseURL,
        })
    }

    async get(url, params) {
        try {
            const res = await this.instance.get(url, { params });
            return res.data
        } catch (error) {
            console.log("GET request error:", error);
            throw error;
        }
    }


    async post(url, data) {
        try {
            const res = await this.instance.post(url, data);
            return res.data;

        } catch (error) {
            console.log("POST request error:", error);
            throw error;
        }
    }

    async patch(url, data) {
        try {
            const response = await this.instance.patch(url, data);
            return response.data;
        } catch (error) {
            console.error('PATCH request error:', error);
            throw error;
        }
    }


    async put(url, data) {
        try {
            const response = await this.instance.put(url, data);
            return response.data;
        } catch (error) {
            console.error('PUT request error:', error);
            throw error;
        }
    }

    async delete(url) {
        try {
            const response = await this.instance.delete(url);
            return response.data;
        } catch (error) {
            console.error('DELETE request error:', error);
            throw error;
        }
    }
}
const BASE_URL = import.meta.env.VITE_BASE_URL_API;
const api = new ApiRequest(BASE_URL);
export default api;

