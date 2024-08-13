import axiosInstance from '@/lib/axios-instance';

const fetcher = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
};

export default fetcher;
