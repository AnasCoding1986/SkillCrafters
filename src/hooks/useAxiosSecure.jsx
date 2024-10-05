import axios from 'axios';

const axiosSecure = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {

    // interceptors

    return axiosSecure
};

export default useAxiosSecure;