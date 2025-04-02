import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {getToken} from "../lib/auth/token-provider.ts";
import {security} from "../constants/security.ts";
import {locations} from "../constants/locations.ts";
import {useNavigate} from "react-router";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = security.BEARER + token;
        }
        return config;
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const navigate = useNavigate();
        if (error.status === 403 && !window.location.pathname.includes(locations.AUTH)) {
            navigate(locations.LOGIN)
        }
        throw error;
    }
)

class AxiosClient {

    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async get<T>(url: string): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.get<T>(url);
    }

    async post<T, D>(url: string, data: D): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.post<T>(url, data);
    }

    async put<T, D>(url: string, data: D): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.put<T>(url, data);
    }

    async delete<T>(url: string): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.delete<T>(url);
    }
}

export const Client = new AxiosClient(axiosInstance);