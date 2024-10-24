/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
    message: string;
    code?: string;
}

export const handleAxiosError = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            console.error('Error status:', axiosError.response.status);
            return axiosError.response.data.message;
        } else if (axiosError.request) {
            console.error('No response received:', axiosError.request);
            return 'No response received. Please try again.';
        } else {
            console.error('Error message:', axiosError.message);
            return axiosError.message;
        }
    } else {
        console.error('Non-Axios error:', err);
        return 'An error occurred. Please try again.';
    }
};
