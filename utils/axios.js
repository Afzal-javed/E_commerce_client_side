import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://ecommerce-backend-coral-seven.vercel.app/api',

    baseURL: 'http://localhost:9000/api',
   
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

const callAxios = async (method, url, body = null, includeCookies = true) => {
    try {
        const config = {
            withCredentials: includeCookies,
            headers: {
                'Accept': 'application/json'
            }
        };
        switch (method.toLowerCase()) {
            case 'get':
                return (await axiosInstance.get(url, config)).data;
            case 'post':
                return (await axiosInstance.post(url, body, config)).data;
            case 'put':
                return (await axiosInstance.put(url, body, config)).data;
            case 'delete':
                return (await axiosInstance.delete(url, { ...config, data: body })).data;
            default:
                throw new Error(`Invalid HTTP method: ${method}`);
        }
    } catch (error) {
        console.error('Error making Axios request:', error);
        throw error;
    }
};

export default callAxios;