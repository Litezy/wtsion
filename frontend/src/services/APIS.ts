import axios, { type AxiosResponse } from "axios";

export let URL: string;

if (window.location.origin.includes("wtsion.com")) {
    URL = import.meta.env.VITE_LIVE_BASE_URL || "https://api.wtsion.com";
} else {
    URL = import.meta.env.VITE_BASE_URL || "http://localhost:5003";
}

const user = "api/users";

export const non_auth_urls = {
    submit_data: `${user}/submit`,
    subscribe_newsletter: `${user}/subscribe`,
    contact_us: `${user}/contact`
};

export const Apis = {
    non_auth: non_auth_urls,
};

// Generic GET API
export const ClientGetApi = async <T = any>(endpoint: string): Promise<T> => {
    const response: AxiosResponse<T> = await axios.get(`${URL}/${endpoint}`);
    return response.data;
};

// Generic POST API
export const ClientPostApi = async <T = any>(
    endpoint: string,
    data: any
): Promise<T> => {
    const response: AxiosResponse<T> = await axios.post(`${URL}/${endpoint}`, data);
    return response.data;
};

// POST API for FormData (files)
export const ClientPostFormData = async <T = any>(
    endpoint: string,
    formData: FormData
): Promise<T> => {
    const response: AxiosResponse<T> = await axios.post(`${URL}/${endpoint}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// Example for authenticated GET
// export const GetApi = async <T = any>(endpoint: string, token: string): Promise<T> => {
//   const response: AxiosResponse<T> = await axios.get(`${URL}/${endpoint}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// Example for authenticated POST
// export const PostApi = async <T = any>(endpoint: string, data: any, token: string): Promise<T> => {
//   const response: AxiosResponse<T> = await axios.post(`${URL}/${endpoint}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };
