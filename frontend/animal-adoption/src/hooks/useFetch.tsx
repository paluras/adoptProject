import { useState, useEffect } from 'react';
import axios from 'axios';
import { handleAxiosError } from '../utils/handleAxiosError';

const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);


                setData(response.data.body);
                setLoading(false);

            } catch (err) {

                setError(handleAxiosError(err));
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
